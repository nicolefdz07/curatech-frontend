import getMedications from "@/app/actions/getMedications";
import MedicationDashboard from "@/components/medication/MedicationDashboard";

export const dynamic = "force-dynamic"; 

export default async function MedicationPage() {
  
  const medications = await getMedications();

  return (
    
    <MedicationDashboard initialData={medications} />
  );
}
