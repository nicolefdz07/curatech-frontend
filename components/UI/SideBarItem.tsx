import Link from "next/link";
import { ReactNode, useContext } from "react";
import { sideBarContext } from "../SideNav";

export type SideBarItemProps = {
  href: string;
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
};

export function SideBarItem({
  href,
  icon,
  text,
  active,
  alert,
}: SideBarItemProps) {
  const { expanded } = useContext(sideBarContext);

  return (
    <Link
      href={href}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md text-primary-foregroundcursor-pointer transition-colors group ${
        active ? "bg-primary  text-primary-foreground " : "hover:bg-primary/10 "
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-[var(--color-neon-blue)] ${expanded ? "top-2" : ""}`}
        />
      )}
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-[var(--color-card)] text-[var(--color-primarytext)] text-sm invisible opacity-20 translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:x-translate-x-0">
          {text}
        </div>
      )}
    </Link>
  );
}
