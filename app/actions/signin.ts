"use server";

import { API_BASE } from "@/components/constants";
import { ActionState, registeredUser } from "@/types/tipos";
import toHash from "@/utils/helperFunctions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signin(prevState: ActionState, 
  formData: FormData      
): Promise<ActionState> 

{ 
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = toHash(password);

  const registeredUser: registeredUser = {
    email: email,
    password: hashedPassword,
  };

  try {
    
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registeredUser),
    });

    if (!response.ok) {
      let errorMessage = "Failed to log in user";
      try {
        const errorData = await response.json();
        errorMessage = errorData?.detail || errorData?.message || errorMessage;
      } catch {

      }
      
      return { error: errorMessage };
    }

    const data = await response.json();
    const cookieStore = await cookies();

    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // 3. Guardamos los datos del USUARIO para usarlos en el diseño (Header, Perfil, etc.)
    // Como las cookies solo guardan texto, convertimos el objeto a un string (JSON.stringify)
    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    console.error("Error en login:", error);
    // Aquí manejarías el error visualmente
    // return {
    //   error:
    //     error instanceof Error ? error.message : "Fallo el inicio de sesión",
    // };
    // return { error: "Fallo el inicio de sesión" };
  }

  // Si el login es exitoso, redirigimos al usuario al dashboard
  redirect("/dashboard/medication_schedule");
}
