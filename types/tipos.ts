export interface User {
  id_user?: string;
  patient_first_name: string;
  patient_last_name: string;
  patient_birth_date: string;
  patient_health_condition?: string;
  caregiver_name?: string;
  email: string;
  password: string;
  // created_at: string,
}

export interface Device {
  id_device: string;
  serial_number: string;
  api_key_hash: string;
  config_version: number;
  id_user: string;
}

export interface Module {
  id_module: string;
  servo_id: string;
  pill_name: string;
  dose_times: string[];
  daily_qty: number;
  dosage?: string;
  id_device: string;
  notes?: string;
  status?: "pending" | "idle";
}

export type LoginState = {
  success: boolean;
  error?: string;
  message?: string;
} | null;

export type registeredUser = {
  email: string;
  password: string;
};



export interface Medication {
  id_module: string;
  pill_name: string;
  dosage: string;
  dose_times: [string];
  daily_qty: number;
  pillsRemaining: number;
  id_device: string;
  notes?: string;
  servo_id: string;
}

export type WizardStep = "insert" | "detected" | "details" | "save";


export type ActionState = {
  error?: string;
  success?: boolean;
} | null;


export interface AddMedicationWizardProps {
  onSaveSuccess: (modules: Medication[]) => void;
  currentCount: number; //
}