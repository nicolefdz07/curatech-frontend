
import { Medication } from "@/types/tipos";
import { Clock, Pill, AlertCircle, Pencil } from "lucide-react"
import { Button } from "../UI/Button";


interface MedicationCardProps extends Medication {
  onEdit: () => void; 
}
export default function MedicationCard(medication: MedicationCardProps) {
  const isLowStock = medication.pillsRemaining < 5;

return (




  <div className="group relative rounded-xl bg-card p-6 transition-shadow hover:shadow-md ">
    <div className="mb-4 flex items-start justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Pill className="h-6 w-6 text-primary" />
      </div>
      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
        {medication.pill_name}
      </span>

    </div>
    <h3 className="mb-1 text-lg font-semibold text-card-foreground">
      {medication.pill_name}

    </h3>
    <p className="mb-4 text-sm text-muted-foreground">{medication.dosage}</p>

    <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-card-foreground">
            {medication.dose_times} daily
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          {isLowStock ? (
            <>
              <AlertCircle className="h-4 w-4 text-destructive" />
              {/* <span className="text-destructive">
                {medication.pillsRemaining} pills - Low stock!
              </span> */}
            </>
          ) : (
            <>
              <Pill className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {medication.dosage} 
              </span>
            </>
          )}
        </div>
      </div>
      {medication.notes && (
        <p className="mt-4 rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground">
          {medication.notes}
        </p>
      )}

      <Button
        variant="ghost"
        size="icon"
   

        onClick={medication.onEdit}
        className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Pencil className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </Button>
  </div>
        )
}