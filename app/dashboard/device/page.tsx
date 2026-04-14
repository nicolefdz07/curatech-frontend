"use client";
import EmptyState from "@/components/device/EmptyState";
import LinkDevice from "@/components/device/LinkDevice";
import { Button } from "@/components/UI/Button";
import useGetDeviceId from "@/hooks/useGetDeviceId";
import { useState } from "react";

export default function DevicePage() {
  const [showForm, setShowForm] = useState(false);

  const { deviceId, refreshDevice } = useGetDeviceId();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Device Management</h1>

      {/* {showForm ? (
       
        <div className="flex flex-col items-start gap-4">
          <LinkDevice 
          onSuccess={()=> setShowForm(false)}
          />

        
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
} */}

      {deviceId ? (
        /* CAMINO 1: Dispositivo Vinculado */
        <EmptyState
          type="device-linked"
          title="Device Linked Successfully"
          description={`Your CuraTech dispenser (ID: ${deviceId}) is connected and ready to use.`}
        />
      ) : showForm ? (
        /* CAMINO 2: Formulario */
        <div className="flex flex-col items-start gap-4">
          <LinkDevice
            onSuccess={() => {
              setShowForm(false);
              refreshDevice(); //  Llama al hook para que vuelva a leer la cookie sin recargar la página entera
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
        /* CAMINO 3: Estado Vacío */
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
