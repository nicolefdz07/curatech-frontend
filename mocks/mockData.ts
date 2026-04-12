import { User, Device, Module } from "@/app/types/tipos";

export const mockUsers: User[] = [
    {
        id_user: "11111111-1111-1111-1111-111111111111",
        patient_first_name: "Doña Carmen",
        patient_last_name: "Pérez",
        patient_birth_date: "1945-05-15",
        patient_health_condition: "Hipertensión",
        caregiver_name: "María (Hija)",
        email: "maria.cuidadora@email.com",
        password_hash: "hashed_password_mock_123",
        created_at: "2026-03-23T10:00:00Z"
    }
];

export const mockDevices: Device[] = [
    {
        id_device: "22222222-2222-2222-2222-222222222222",
        serial_number: "DISP-2026-001",
        api_key_hash: "mock_api_key_hash_abc",
        config_version: 1,
        id_user: "11111111-1111-1111-1111-111111111111" // Vinculado a Doña Carmen
    }
];

export const mockModules: Module[] = [
    {
        id_module: "33333333-3333-3333-3333-333333333333",
        pill_name: "Losartán 50mg",
        dose_times: ["08:00"], // ¡Arreglo de strings para las horas!
        daily_qty: 1,
        id_device: "22222222-2222-2222-2222-222222222222" // Vinculado al dispensador DISP-2026-001
    },
    {
        id_module: "44444444-4444-4444-4444-444444444444",
        pill_name: "Acetaminophen", // Usando el ejemplo de tu documento [cite: 100]
        dose_times: ["08:00", "20:00"], // Se toma dos veces al día
        daily_qty: 2,
        id_device: "22222222-2222-2222-2222-222222222222" // Vinculado al mismo dispensador
    }
];