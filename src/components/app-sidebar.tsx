import * as React from "react";
import { AudioWaveform, BarChartBig, Camera, Command, Ticket, TrafficCone, Users } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavAdmin } from "./nav-admin";

// This is sample data.
const data = {
  user: {
    name: "Avicena",
    email: "m@example.com",
    avatar: "https://github.com/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "TVMS",
      logo: TrafficCone,
      plan: "Traffic Violation Management System",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      name: "Dashboard",
      url: "/d/dashboard",
      icon: BarChartBig,
    },
    {
      name: "Violations",
      url: "/d/violations",
      icon: TrafficCone,
    },
    {
      name: "Tickets",
      url: "/d/tickets",
      icon: Ticket,
    },
    {
      name: "Report Violation",
      url: "/d/report-violation",
      icon: Camera,
    },
  ],
  navAdmin: [
    {
      name: "Police Accounts",
      url: "/d/users",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAdmin items={data.navAdmin} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
