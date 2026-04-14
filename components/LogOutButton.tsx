"use client";
import { LogOut } from "lucide-react";
import { Button } from "./UI/Button";
import logout from "@/app/actions/logout";

export default function LogOutButton() {

  const handleLogout = async () =>{
    await logout();
  }

  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout}
      
      className=" justify-end text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Log Out
    </Button>
  );
}