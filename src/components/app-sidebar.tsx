import * as React from "react";
import { AudioWaveform, BarChartBig, Camera, Cctv, Command, Globe, Scale, Ticket, TrafficCone, Users } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavAdmin } from "./nav-admin";
import { useAuth } from "@/context/AuthContext";
import { NavOther } from "./navOther";
// This is sample data.
const data = {
  teams: [
    {
      name: "TVMS",
      logo: TrafficCone,
      plan: "Traffic Violation Management System",
    },
  ],
  navMain: [
    // {
    //   name: "Dasbor",
    //   url: "/d/dashboard",
    //   icon: BarChartBig,
    // },
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
    // {
    //   name: "CCTV",
    //   url: "/d/cctv",
    //   icon: Cctv,
    // },
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

  const userData = {
    name: user?.name || "",
    email: user?.email || "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavOther items={data.navOther} />
        {/* <NavAdmin items={data.navAdmin} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
