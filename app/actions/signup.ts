"use server";
import { API_BASE } from "@/components/constants";
import { User } from "@/types/tipos";
import toHash from "@/utils/helperFunctions";
import { redirect } from "next/navigation";

export default async function signup(formData: FormData) {
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const birthDate = formData.get("birth_date") as string;
  const healthCondition = formData.get("health_condition") as string;
  const caregiverName = formData.get("caregiver_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !birthDate || !email || !password) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = toHash(password);
  const newUser: User = {
    
    patient_first_name: firstName,
    patient_last_name: lastName,
    patient_birth_date: birthDate,
    patient_health_condition: healthCondition,
    caregiver_name: caregiverName,
    email: email,
    password: hashedPassword,
    
  };

  try {
    
    console.log("New user created:", newUser);
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

     
  } catch (error) {
    console.error("Error en registro:", error);
  }
redirect("/signin");
}
