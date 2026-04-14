"use server";

import { cookies } from "next/headers";
import { API_BASE } from '../../components/constants';

export default async function checkDevice() {
  const cookieStore = cookies();
  const deviceId = (await cookieStore).get("id_device")?.value;


  if(deviceId) {
    return {linked: true, id_device: deviceId};
  }

  return {linked: false , id: null};

}
