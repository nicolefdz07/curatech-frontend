import { Medication, WizardStep } from "@/types/tipos";
import { useEffect } from "react";

type MedicationFormData = {
  name: string;
  dosage: string;
  time: string;
  notes: string;
  daily_qty: string;
};

export function useMedicationForm({
  initialdata,
  actions: { setFormData, setDetectedServoId, setStep, setIsOpen },
}: {
  initialdata: Medication | null;
  actions: {
    setFormData: (data: MedicationFormData) => void;
    setDetectedServoId: (id: string) => void;
    setStep: (step: WizardStep) => void;
    setIsOpen: (open: boolean) => void;
  };
}): void {
  useEffect(() => {
    
    if (initialdata) {
      setFormData({
        name: initialdata.pill_name,
        dosage: initialdata.dosage,
        time: Array.isArray(initialdata.dose_times)
          ? (initialdata.dose_times[0] ?? "08:00")
          : initialdata.dose_times,
        notes: initialdata.notes || "",
        daily_qty: String(initialdata.daily_qty),
      });
      setDetectedServoId(String(initialdata.servo_id));
      setStep("details");
      setIsOpen(true);
    }
  }, [initialdata, setFormData, setDetectedServoId, setStep, setIsOpen]);
}
