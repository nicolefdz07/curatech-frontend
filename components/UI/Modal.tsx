import { X } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  isError?: boolean;
  onAccept: () => void;
}

export function Modal({
  isOpen,
  title,
  message,
  isError = false,
  onAccept,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto rounded-xl bg-card p-4 shadow-xl animate-in zoom-in-95 sm:max-w-sm sm:p-6">
        <div className="mb-4 flex items-start justify-between">
          <h3
            className={`text-lg font-bold ${isError ? "text-destructive" : "text-card-foreground"}`}
          >
            {title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onAccept}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="mb-8 text-sm text-muted-foreground">{message}</p>

        <div className="flex justify-end">
          <Button
            onClick={onAccept}
            className={
              isError
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground"
            }
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
