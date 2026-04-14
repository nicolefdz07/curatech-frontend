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
    <aside className="sticky top-0 z-30 h-screen shrink-0 overflow-hidden border-r bg-card shadow-sm">
      <nav className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            {expanded && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Pill className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
            <div className="text-2xl font-black tracking-tight text-[#5B6235] font-manrope">
              {expanded ? "CuraTech" : ""}
            </div>
          </div>

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <sideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-2">
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
          {/* <LogOutButton /> */}
        </sideBarContext.Provider>
        {/* <div className="mt-auto border-t p-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-200 text-sm font-bold text-indigo-700">
              LU
            </div>
            <div
              className={`overflow-hidden transition-all ${expanded ? "ml-0 w-40" : "w-0"}`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Logged In user</h4>
                <span className="text-xs text-gray-600">user@example.com</span>
              </div>
            </div>
          </div>
        </div> */}
      </nav>
    </aside>
  );
}
