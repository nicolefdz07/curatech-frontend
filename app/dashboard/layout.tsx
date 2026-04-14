import LogOutButton from "@/components/LogOutButton";
import SideNav from  "@/components/SideNav";
import { LogOut } from "lucide-react";
import { cookies } from "next/headers";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  // 1. we read the cookie user
  const cookieStore = cookies();
  const userDataString = (await cookieStore).get("user")?.value;

  
  const user = userDataString ? JSON.parse(userDataString) : null;
  
  
  
  return (
   
    <div className="min-h-screen w-full bg-background flex">
      
      
      <SideNav/>

      
      <div className="flex-1 flex flex-col">
        
       
        <header className="bg-card h-20 shadow-sm flex items-center justify-end px-8 z-10">
         
          <div className="flex items-center gap-2">
            <span className="font-bold text-primarytext">Hi, {user?.patient_first_name || "User"}</span>
          
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondarytext font-bold">
              {user?.patient_first_name ? user.patient_first_name.charAt(0).toUpperCase() : "U"}
            </div>
            <LogOutButton />
          </div>
        </header>

   
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
  