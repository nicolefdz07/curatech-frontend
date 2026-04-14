"use server";
import { API_BASE } from "@/components/constants";
import { cookies } from "next/headers";

export default async function getMedications() {

  const cookieStore = await cookies();
  const idDevice = cookieStore.get("id_device")?.value;

  

  try {
    const response = await fetch(`${API_BASE}/module/get/${idDevice}`, {
      cache: "no-store"  
    });

    if(!response.ok) return [];

    const data = await response.json();
    return data;
  }catch (error) {
    console.error("Error fetching medications:", error);
    return [];
  }
}