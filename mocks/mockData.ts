import { Device,  User } from "@/types/tipos";

export const mockUsers: User[] = [
  {
    id_user: "11111111-1111-1111-1111-111111111111",
    patient_first_name: "Doña Carmen",
    patient_last_name: "Pérez",
    patient_birth_date: "1945-05-15",
    patient_health_condition: "Hipertensión",
    caregiver_name: "María (Hija)",
    email: "maria.cuidadora@email.com",
    password: "hashed_password_mock_123",
    // created_at: "2026-03-23T10:00:00Z",
  },
];

export const mockDevices: Device[] = [
  {
    id_device: "22222222-2222-2222-2222-222222222222",
    serial_number: "DISP-2026-001",
    api_key_hash: "mock_api_key_hash_abc",
    config_version: 1,
    id_user: "11111111-1111-1111-1111-111111111111",
  },
];


//   {
//     id_module: "33333333-3333-3333-3333-333333333333",
//     servo_id: "servo-001",
//     pill_name: "Losartán 50mg",
//     dose_times: ["08:00"], // ¡Arreglo de strings para las horas!
//     daily_qty: 1,
//     id_device: "22222222-2222-2222-2222-222222222222", // Vinculado al dispensador DISP-2026-001
//   },
//   {
//     id_module: "44444444-4444-4444-4444-444444444444",
//     servo_id: "servo-002",
//     pill_name: "Acetaminophen", [cite: 100]
//     dose_times: ["08:00", "20:00"],
//     daily_qty: 2,
//     id_device: "22222222-2222-2222-2222-222222222222", // Vinculado al mismo dispensador
//   },
// ];

// export const mockMedications: Medication[] = [
//   {
//     id_module: "mod-101",
//     pill_name: "Lisinopril",
//     dosage: "10mg",
//     dose_times: ["08:00"],
//     daily_qty: 1,
//     pillsRemaining: 28,
//     id_device: "dev-alpha",
//     notes: "Take with water",
//   },
//   {
//     id_module: "mod-102",
//     pill_name: "Metformin",
//     dosage: "500mg",
//     dose_times: "12:00",
//     daily_qty: 2,
//     pillsRemaining: 45,
//     id_device: "dev-alpha",
//     // notes es opcional, así que podemos omitirlo aquí
//   },
//   //   {
//   //     id: "med-3",
//   //     name: "Atorvastatin",
//   //     dosage: "20mg",
//   //     time: "21:00",
//   //     moduleSlot: 3,
//   //     pillsRemaining: 14,
//   //     refillDate: "2024-02-10",
//   //     notes: "Take before bed",
//   //   },
// ];
