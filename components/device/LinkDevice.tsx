"use client";

import addDevice from "@/app/actions/addDevice";
import { useState } from "react";
import { Button } from "../UI/Button";
import { Modal } from "../UI/Modal";

export default function LinkDevice(
  { onSuccess }: { onSuccess: () => void }
) {
  const [serialNumber, setSerialNumber] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    if (!serialNumber.trim()) {
      setModalConfig({
        isOpen: true,
        title: "Missing Serial Number",
        message: "Please enter a valid serial number.",
        isError: true,
        onAccept: closeModal,
      });
      return;
    }

    setIsPending(true);
    const result = await addDevice(serialNumber);
    setIsPending(false);

    if (result.success) {
      setModalConfig({
        isOpen: true,
        title: "Device Linked",
        message: "Your dispenser was linked successfully.",
        isError: false,
        onAccept: closeModal,
      });

      setSerialNumber("");
    } else {
      setModalConfig({
        isOpen: true,
        title: "Failed to Link Device",
        message: `Failed to link device: ${result.error}`,
        isError: true,
        onAccept: () => {
          closeModal();
          onSuccess();
        },
      });
       
    }
  };

  
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
    onAccept: () => {}, 
  });


  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, isOpen: false }));

  return (
    <>
      <div className="p-6 bg-card rounded-xl  shadow-sm max-w-md w-full mx-auto">
        <div className="mb-5">
          <h2 className="text-xl font-semibold tracking-tight mb-1.5 text-card-foreground">
            Link New Dispenser
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter the serial number printed on the label underneath your
            CuraTech device.
          </p>
        </div>

      
        <div className="flex flex-col sm:flex-row gap-3 justify-content">
          <input
            type="text"
            placeholder="e.g., CURA-9988"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
        
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />

          <Button
            onClick={handleSubmit}
            disabled={isPending || !serialNumber}
        
            className="w-full sm:w-auto cursor-pointer"
          >
            {isPending ? "Linking..." : "Link Device"}
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
