"use client";

import detectModule from "@/app/actions/detectModule";

import { mockMedications } from "@/mocks/mockData";
import type { Medication, WizardStep } from "@/types/tipos";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  Loader2,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Label } from "../UI/Label";

import getMedications from "@/app/actions/getMedications";
import updateModule from "@/app/actions/updateModule";
import { useMedicationForm } from "@/hooks/useMedicationForm";
import { AddMedicationWizardProps } from "@/types/tipos";
import { Modal } from "../UI/Modal";

export function AddMedicationWizard({
  onSaveSuccess,
  currentCount: currentCount,
  initialData, 
  onClose, 
}: AddMedicationWizardProps & {
  initialData?: Medication | null;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<WizardStep>("insert");
  const [isDetecting, setIsDetecting] = useState(false);

  const [detectedServoId, setDetectedServoId] = useState<string | null>(null);

  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    time: "08:00",
    notes: "",
    daily_qty: "1",
  });

  const nextSlot = mockMedications ? mockMedications.length + 1 : 1;

  // Estado para controlar el modal
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
    onAccept: () => {}, 
  });

  // Función para cerrar el modal 
  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, isOpen: false }));

  // calling the custom hook to manage the form state and side effects related to editing an existing medication
  useMedicationForm({
    initialdata: initialData || null,
    actions: {
      setFormData,
      setDetectedServoId,
      setStep,
      setIsOpen,
    },
  });

  //  1: Polling del Hardware (Paso 1  )
  const handleStartDetection = async () => {
    setIsDetecting(true);

    try {
      // llamo al endpoint de deteccion del modulo
      const result = await detectModule("PENDING");

      if (result.success) {
        setDetectedServoId(result.data.servo_id.toString()); // Guardamos el ID detectado

        setStep("detected");
      } else {
        setModalConfig({
          isOpen: true,
          title: "Detection Failed",
          message: result.error || "Could not detect the module.",
          isError: true,
          onAccept: closeModal,
        });
      }
    } catch {
      setModalConfig({
        isOpen: true,
        title: "Detection Failed",
        message: "Could not detect the module.",
        isError: true,
        onAccept: closeModal,
      });
    } finally {
      setIsDetecting(false);
    }
  };

  //  ENDPOINT DE UPDATE PARA GUARDAR LA MEDICACION EN LA BASE DE DATOS, ASOCIADA AL ID DEL MÓDULO DETECTADO
  const handleSave = async () => {
    // 1. validation of servo_id
    if (!detectedServoId) {
      setModalConfig({
        isOpen: true,
        title: "No Module Detected",
        message: "No module detected. Please go back.",
        isError: true,
        onAccept: closeModal,
      });
      setStep("insert");
      return;
    }
    setIsPending(true);

    // prepare the data to be send
    const payload = {
      pill_name: formData.name,
      dosage: formData.dosage,
      dose_times: [formData.time],
      daily_qty: parseInt(formData.daily_qty) || 1, //
      notes: formData.notes,
      status: "TAKEN",
    };

    // 3. Llamamos a la acción pasándole el servo_id   y el payload
    const result = await updateModule(parseInt(detectedServoId), payload);

    setIsPending(false);

    if (result.success) {
      const updateMeds = await getMedications();
      onSaveSuccess(updateMeds);

      setModalConfig({
        isOpen: true,
        title: "Save Successful",
        message: "Medication saved successfully.",
        isError: false,
        onAccept: closeModal,
      });
      handleClose();
    } else {
      setModalConfig({
        isOpen: true,
        title: "Save Failed",
        message: result.error || "Failed to save medication. Please try again.",
        isError: true,
        onAccept: closeModal,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep("insert");
    setFormData({
      name: "",
      dosage: "",
      time: "08:00",
      notes: "",
      daily_qty: "1",
    });
    onClose();
  };

  const steps: { key: WizardStep; label: string }[] = [
    { key: "insert", label: "Insert" },
    { key: "detected", label: "Detected" },
    { key: "details", label: "Details" },
    { key: "save", label: "Confirm" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-card text-black hover:bg-primary/90"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Medication
      </Button>
    );
  }

  return (
    <>
      <div className="rounded-xl bg-card p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                      index < currentStepIndex
                        ? "border-primary bg-primary text-primary-foreground"
                        : index === currentStepIndex
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted-foreground/30 bg-background text-muted-foreground"
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      index <= currentStepIndex
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 w-12 sm:w-16 md:w-24 ${
                      index < currentStepIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[200px]">
          {step === "insert" && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                <CircleDot className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                Insert Medication Module
              </h3>
              <p className="mb-6 max-w-md text-muted-foreground">
                Insert a new medication module
              </p>
              <Button
                onClick={handleStartDetection}
                disabled={isDetecting}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isDetecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Module Inserted
                  </>
                )}
              </Button>
            </div>
          )}

          {step === "detected" && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                Module Detected: {detectedServoId}
              </h3>

              <p className="mb-6 text-sm text-muted-foreground">
                Module ID: {detectedServoId}
              </p>
              <Button
                onClick={() => setStep("details")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue to Details
              </Button>
            </div>
          )}

          {step === "details" && (
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="med-name" className="text-card-foreground">
                    Medication Name
                  </Label>
                  <Input
                    id="med-name"
                    placeholder="e.g., Aspirin"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="border-border bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="med-dosage" className="text-card-foreground">
                    Dosage
                  </Label>
                  <Input
                    id="med-dosage"
                    placeholder="e.g., 100mg"
                    value={formData.dosage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dosage: e.target.value,
                      }))
                    }
                    className="border-border bg-background"
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="med-time" className="text-card-foreground">
                    Scheduled Time
                  </Label>
                  <Input
                    id="med-time"
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="border-border bg-background"
                  />
                </div>
                {/* daily quantity */}
                <div className="space-y-2">
                  <Label htmlFor="med-time" className="text-card-foreground">
                    Daily Quantity
                  </Label>
                  <Input
                    id="med-time"
                    type="text"
                    value={formData.daily_qty}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        daily_qty: e.target.value,
                      }))
                    }
                    className="border-border bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="med-notes" className="text-card-foreground">
                    Notes (Optional)
                  </Label>
                  <Input
                    id="med-notes"
                    placeholder="e.g., Take with food"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    className="border-border bg-background"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setStep("save")}
                  disabled={!formData.name || !formData.dosage}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Review &amp; Save
                </Button>
              </div>
            </div>
          )}

          {step === "save" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Confirm Medication Details
              </h3>
              <div className="rounded-xl bg-secondary/50 p-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Medication
                    </dt>
                    <dd className="mt-1 text-card-foreground">
                      {formData.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Dosage
                    </dt>
                    <dd className="mt-1 text-card-foreground">
                      {formData.dosage}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Time
                    </dt>
                    <dd className="mt-1 text-card-foreground">
                      {formData.time}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Module Slot
                    </dt>
                    <dd className="mt-1 text-card-foreground">
                      Slot {nextSlot}
                    </dd>
                  </div>
                  {formData.notes && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Notes
                      </dt>
                      <dd className="mt-1 text-card-foreground">
                        {formData.notes}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep("details")}
                  className="border-border"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isPending}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Save Medication
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Cancel Button */}
        <div className="mt-6 border-t border-border pt-4">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
        </div>
      </div>
      <Modal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        isError={modalConfig.isError}
        onAccept={modalConfig.onAccept}
      />
    </>
  );
}
