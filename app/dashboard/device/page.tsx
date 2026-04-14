"use client";
import EmptyState from "@/components/device/EmptyState";
import LinkDevice from "@/components/device/LinkDevice";
import { Button } from "@/components/UI/Button";
import useGetDeviceId from "@/hooks/useGetDeviceId";

import { useState } from "react";

 

export default function DevicePage() {
  const [showForm, setShowForm] = useState(false);

  const { deviceId, refreshDevice, isLoading } = useGetDeviceId();

  
if (isLoading) {
  return <div>Loading device data...</div>;
}

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Device Management</h1>


      {deviceId ? (
        
        <EmptyState
          type="device-linked"
          title="Device Linked Successfully"
          description={`Your CuraTech dispenser (ID: ${deviceId}) is connected and ready to use.`}
        />
      ) : showForm ? (
        
        <div className="flex flex-col items-start gap-4">
          <LinkDevice
            onSuccess={() => {
              setShowForm(false);
              refreshDevice(); 
            }}
          />
          <Button
            variant="ghost"
            onClick={() => setShowForm(false)}
            className="cursor-pointer bg-card text-black hover:text-foreground"
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
