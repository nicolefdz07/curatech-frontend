"use client";

import { Medication } from "@/types/tipos";
import { useState } from "react";
import { AddMedicationWizard } from "./AddMedicationWizard";
import MedicationScheduleTab from "./MedicationScheduleTab";
import NoMedicationTab from "./NoMedicationTab";
import getMedications from "@/app/actions/getMedications";

export default function MedicationDashboard({
  initialData,
}: {
  initialData: Medication[];
}) {
  const [medications, setMedications] = 
  useState<Medication[]>(initialData);

  

  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);


  const handleEditMed = (medication: Medication) => {
    setEditingMedication(medication); //se guarda que medic se editara
  };

  const refreshData = async () => {
    const updatedMeds = await getMedications();
    setMedications(updatedMeds);
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Medication Schedule</h1>

      <AddMedicationWizard 
      initialData={editingMedication}
      currentCount={medications.length}
      onSaveSuccess={refreshData}
       onClose={() => setEditingMedication(null)}
      
       />
      {medications.length === 0 ? (
        <NoMedicationTab />
      ) : (
        <MedicationScheduleTab 
        medications={medications} 
        onEdit = {handleEditMed}
        
        />
      )}
    </div>
  );
}
