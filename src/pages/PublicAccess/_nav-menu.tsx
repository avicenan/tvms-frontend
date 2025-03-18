import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavMenu() {
  const { pathname } = useLocation();
  return (
    <div className="h-14 p-6 shadow flex items-center justify-between">
      <div className="font-semibold">Korlantas Polri</div>
      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem title="Beranda">
            <Link to="/">
              <NavigationMenuLink className={`${pathname == "/" ? "font-semibold" : ""}`}>Beranda</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/help">
              <NavigationMenuLink>Bantuan</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about">
              <NavigationMenuLink>Tentang</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/faqs">
              <NavigationMenuLink>FAQs</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/login">
              <NavigationMenuLink>
                <LogIn color="black" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
