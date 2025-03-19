import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { LogIn, Menu, TrafficCone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavMenu() {
  const { pathname } = useLocation();
  return (
    <header className="z-50 w-full bg-white/5 backdrop-blur-sm dark:bg-gray-950/80">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <TrafficCone />
          <span className=" font-bold">Korlantas Polri</span>
        </Link>
        <nav className="hidden space-x-8 md:flex">
          <Link to="/" className={`text-sm hover:text-zinc-950 ${pathname == "/" ? "font-semibold" : ""}`}>
            Beranda
          </Link>
          <Link to="/help" className="text-sm hover:text-zinc-950 ">
            Bantuan
          </Link>
          <Link to="/about" className="text-sm hover:text-zinc-950">
            Tentang
          </Link>
          <Link to="/faqs" className="text-sm hover:text-zinc-950 ">
            FAQs
          </Link>
          <Link to="/login" className="text-sm hover:text-zinc-950 flex items-center">
            <LogIn size={14} />
          </Link>
        </nav>
        <div className=" flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-50">
              <SheetHeader></SheetHeader>
              <nav className="space-y-6 flex flex-col items-center mt-10">
                <Link to="/" className={` hover:text-zinc-950 w-full text-center p-4 ${pathname == "/" ? "font-semibold bg-zinc-100" : ""} `}>
                  Beranda
                </Link>
                <Link to="/help" className=" hover:text-zinc-950 w-full text-center p-4">
                  Bantuan
                </Link>
                <Link to="/about" className=" hover:text-zinc-950  w-full text-center p-4">
                  Tentang
                </Link>
                <Link to="/faqs" className=" hover:text-zinc-950  w-full text-center p-4">
                  FAQs
                </Link>
                <Link to="/login" className=" hover:text-zinc-950 flex items-center w-full justify-center">
                  <LogIn size={14} />
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
