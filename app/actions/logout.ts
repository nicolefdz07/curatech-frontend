"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookiesStore = cookies();

  (await cookiesStore).delete("access_token");
  (await cookiesStore).delete("user");

  redirect("/signin");
}