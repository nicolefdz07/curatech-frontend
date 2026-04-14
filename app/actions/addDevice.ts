"use server";

import { cookies } from "next/headers";
import { API_BASE } from '../../components/constants';
import { revalidatePath } from "next/cache";

export default async function addDevice(serialNumber: string) {

  
  const cookieStore = cookies();
  const userDataString = (await cookieStore).get("user")?.value;

  if(!userDataString) {
    return {success: false, error: "User not authenticated"};
  }

  const user = JSON.parse(userDataString);
  const idUser = user.id_user; 

  try {
    // post request to add device
    const response = await fetch(`${API_BASE}/device/add`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serial_number: serialNumber,
        id_user: idUser,
      }),
    });

    if(response.status === 409) {
      return {success: false, error: "Device already exists or Serial number is incorrect"};
    }
    
    const data = await response.json(); 
    
   
    (await
      // Guardamos el id_device en una cookie
      cookieStore).set("id_device", data.id_device, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // Dura 1 año
    });

    // reload page to update device list
    revalidatePath("/dashboard/device");
    revalidatePath("/dashboard/medication_schedule"); 
    
    return {success: true};
  }catch(error){
    console.error("Error adding device:", error);
    return {success: false, error: "An error occurred while adding the device"};
  }
}