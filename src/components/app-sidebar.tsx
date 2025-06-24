import * as React from "react";
import { BarChartBig, Cctv, Camera, Globe, Scale, Ticket, TrafficCone, Users } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavAdmin } from "./nav-admin";
import { NavOther } from "./navOther";
import { useAuth } from "@/context/AuthContext";

const data = {
  teams: [
    {
      name: "SIMPELANTAS",
      plan: "Sistem Informasi Pelanggaran Lalu Lintas",
      logo: TrafficCone,
    },
  ],
  navMain: [
    {
      name: "Dasbor",
      url: "/d/dashboard",
      icon: BarChartBig,
    },
    {
      name: "Pelanggaran",
      url: "/d/violations",
      icon: TrafficCone,
    },
    {
      name: "Surat Tilang",
      url: "/d/tickets",
      icon: Ticket,
    },
    {
      name: "Lapor Pelanggaran",
      url: "/d/report-violation",
      icon: Camera,
    },
    {
      name: "Banding",
      url: "/d/appeals",
      icon: Scale,
    },
    {
      name: "Kamera",
      url: "/d/cctvs",
      icon: Cctv,
    },
  ],
  navAdmin: [
    {
      name: "Manajemen Akun Polisi",
      url: "/d/users",
      icon: Users,
    },
  ],
  navOther: [
    {
      name: "Halaman Publik",
      url: "https://etilang.web.id",
      icon: Globe,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {user?.role === "admin" && <NavAdmin items={data.navAdmin} />}
        <NavOther items={data.navOther} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
