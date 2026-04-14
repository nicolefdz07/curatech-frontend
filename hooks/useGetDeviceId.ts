import checkDevice from "@/app/actions/checkDevice";
import { useEffect, useState } from "react";

export default function useGetDeviceId() {

  const [deviceId, setDeviceId] = useState<string | null>(null);


  

    const fetchDeviceId = async ()=>{
      try {
        const { id_device} = await checkDevice();
        if(id_device) {
          setDeviceId(id_device);
  
        }
      } catch (error) {
        console.error("Error checking device ID:", error);
      }
    }

    useEffect(() => {
    (async () => {
      await fetchDeviceId();
    })();
  }, []);

  return {
    deviceId,
    setDeviceId,
    refreshDevice: fetchDeviceId
  };
  }
  
