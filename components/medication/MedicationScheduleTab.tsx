"use client";

import { Medication } from "@/types/tipos";
import MedicationCard from "./MedicationCard";

export default function MedicationScheduleTab({ medications, 
  onEdit 
}: { medications: Medication[]; 
  
  onEdit: (medication: Medication) => void 

}
) {
  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-primary">
        Your Medications
        ({medications.length})
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {medications.map((medication: Medication) => (
          <MedicationCard
          onEdit={() => onEdit(medication)}
           key={medication.id_module} {...medication} />
        ))}
      </div>
    </>
  );
}
