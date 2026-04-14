"use server";

import { API_BASE } from "@/components/constants";
import { cookies } from "next/headers";

export default async function detectModule(status: string) {

  try {
    
    
    const cookieStore = cookies();
    const idDevice = (await cookieStore).get("id_device")?.value;

    if(!idDevice) {
      return { success: false, error: "No active device linked to this account." };
    }

    const url = `${API_BASE}/module/detect?status=${status}&id_device=${idDevice}`;
      
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      
      cache: "no-store",
    });

   
    if(response.status === 404) {
      return {success: false, error: "No module detected within the timeframe."};
    }

    if(!response.ok) {
     
      const errorDetail = await response.text(); 
      
      console.error("FastAPI devolvió este error  :", errorDetail);

      
      return { success: false, error: "An error occurred while detecting the module." };
    }

    
    const data = await response.json();
    return { success: true, data: data };

  } catch (error) {
   console.error("Error detecting module:", error);
    return { success: false, error: "Could not connect to the server." };
  }
}
