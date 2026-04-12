export interface User {
    id_user: string,
    patient_first_name: string,
    patient_last_name: string,
    patient_birth_date: string,
    patient_health_condition?: string,
    caregiver_name?: string,
    email: string,
    password_hash: string,
    created_at: string,

}

export interface Device {
    id_device: string,
    serial_number: string,
    api_key_hash: string,
    config_version: number,
    id_user: string

}

export interface Module {
    id_module: string,
    pill_name: string,
    dose_times: string[],
    daily_qty: number,
    id_device: string,

}