import { User } from "@/types/tipos";

export default async function registerUser(user: User) {
  const response = await fetch("endpint_to_register_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  });

  if(!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register user");
  }

  return response.json();

}

export async function loginUser(email: string, passwordHash: string) {
  const response = await fetch("endpoint_to_login_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password_hash: passwordHash })
  });

  if(!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login");
  }

  return response.json();  //returns a token or user data depending on your backend implementation
}