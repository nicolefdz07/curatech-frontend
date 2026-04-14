
import { CheckCircle2, Pill, Unplug } from "lucide-react";
import { Button } from "../UI/Button";

interface EmptyStateProps {
  type: "no-device" | "no-medications" | "device-linked";
  title: string;
  description: string;
  onActionClick?: () => void; 
  actionText?: string;
}

export default function EmptyState({
  type,
  title,
  description,
  actionText = "Link Device",  
  onActionClick, 
}: EmptyStateProps) {
   
  let Icon = Unplug;
  if (type === "no-medications") Icon = Pill;
  if (type === "device-linked") Icon = CheckCircle2;

  
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-card p-8 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-card-foreground">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-muted-foreground">{description}</p>
       

       
      {onActionClick && (
        <Button
          onClick={onActionClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}