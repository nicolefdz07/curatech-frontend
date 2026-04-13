"use client";
import EmptyState from "@/components/device/EmptyState";
import LinkDevice from "@/components/device/LinkDevice";
import { Button } from "@/components/UI/Button";
import { useState } from "react";

export default function DevicePage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <h1 className="text-3xl font-bold">Device Management</h1>
      
      {showForm ? (
       
        <div className="flex flex-col items-start gap-4">
          <LinkDevice />

        
          <Button
            variant="ghost"
            onClick={() => setShowForm(false)}
            className="text-black cursor-pointer hover:text-foreground bg-card"
          >
            Cancel
          </Button>
        </div>
      ) : (
       
        <EmptyState
          type="no-device"
          title="No Device Linked"
          description="You haven't linked a CuraTech dispenser yet. Link one to start managing medications."
          onActionClick={() => setShowForm(true)}
        />
      )}
    </div>
  );
}
