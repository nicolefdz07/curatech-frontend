"use server";
import { API_BASE } from "@/components/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface UpdateModulePayload {
  pill_name: string;
  dosage: string;
  dose_times: string[];
  daily_qty: number;
  notes: string;
  status: string;
}

export default async function updateModule(
  servoId: number,
  payload: UpdateModulePayload,
) {
  try {
    const cookieStore = await cookies();
    const idDevice = cookieStore.get("id_device")?.value;

    if (!idDevice) {
      return { success: false, error: "No active device found." };
    }

    const url = `${API_BASE}/module/update/${servoId}/${idDevice}`;

    // Hacemos el PATCH al endpoint
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

     
    if (!response.ok) {
       
      const errorDetail = await response.text();
      console.error("🚨 Error desde FastAPI Terminal:", errorDetail);

      try {
         
        const errorJson = JSON.parse(errorDetail);
        return { success: false, error: errorJson.detail || "Server error" };
      } catch {
        
        return {
          success: false,
          error: `Backend Error: ${response.statusText}`,
        };
      }
    }

    // const data = await response.json();

    // reload page to show new medication
    revalidatePath("dashboard/medication_schedule");

     
    return {
      success: true,
    };
  } catch (error) {
     
    console.error("❌ Error de conexión:", error);
    return {
      success: false,
      error: "Network error: Could not reach the server.",
    };
  }
}
