"use client";
import { usePathname } from "next/navigation";

import { createContext, useState } from "react";

import {
  BriefcaseMedical,
  ChevronFirst,
  ChevronLast,
  Pill,
  Settings,
} from "lucide-react";
import { SideBarItem } from "./UI/SideBarItem";


export const sideBarContext = createContext<{ expanded: boolean }>({
  expanded: true,
});



export default function SideNav() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-card border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {expanded && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Pill className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
            <div
              className={`text-2xl font-black text-[#5B6235] font-manrope tracking-tight`}
            >
              {expanded ? "CuraTech" : ""}
            </div>
          </div>

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <sideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {/* <Link href="/dashboard/medication_schedule" className="">
            Horario de Medicamentos
          </Link> */}
            <SideBarItem
              href="/dashboard/medication_schedule"
              text="Medication Schedule"
              icon={<BriefcaseMedical />}
              active={pathname === "/dashboard/medication_schedule"}
            />
            <SideBarItem
              href="/dashboard/device"
              text="Device Settings"
              icon={<Settings />}
              active={pathname === "/dashboard/device"}
            />
          </ul>
        </sideBarContext.Provider>

        <div className="border-t flex p-3 ">
          <img
            src="https://ui-avatars.com/api/?name=LU&background=c7d2fe&color=3730a3&bold=true"
            className="w-10 h-10 rounded-md"
            alt=""
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Logged In user</h4>
              <span className="text-xs text-gray-600">user@example.com</span>
            </div>
            
          </div>
        </div>
      </nav>
    </aside>
  );
}
