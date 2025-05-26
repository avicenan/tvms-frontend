"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Badge } from "./ui/badge";
import { useAuth } from "@/context/AuthContext";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    role: string;
    // avatar: string;
  };
}) {
  const { logout } = useAuth();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 bg-zinc-100 rounded-md p-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <div className="text-sm font-medium">
              {user.name} {user.role === "admin" && <Badge variant="outline">Admin</Badge>}
            </div>
            <div className="text-xs text-zinc-500">{user.email}</div>
          </div>
          <Button variant="ghost" size="icon" className="group" onClick={logout}>
            <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-700" />
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
