"use client"; 

import { API_BASE } from "@/components/constants";
import { getCookie } from "cookies-next"; 
import { useCallback, useEffect, useState } from "react";

export default function useGetDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshDevice = useCallback(async () => {
    setIsLoading(true);
    const idFromCookie = getCookie("id_device")?.toString();
    

    if (!idFromCookie) {
      setDeviceId(null);
      setIsLoading(false);
      return;
    }


    try {
      console.log(`2. URL a buscar: ${API_BASE}/module/get/${idFromCookie}`); 
      const res = await fetch(`${API_BASE}/module/get/${idFromCookie}`, {
        cache: "no-store",
      });
      

      
      if (res.status === 404 || res.ok) {
        setDeviceId(idFromCookie); 
        return;
      }


  
  

      setDeviceId(null);

    } catch (error) {
      setDeviceId(null);
      console.error("4. ERROR DE RED O CORS:", error); // 
    }finally{
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { deviceId, refreshDevice , isLoading};
}
