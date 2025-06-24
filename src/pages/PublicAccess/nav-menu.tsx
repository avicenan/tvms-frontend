import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavMenu() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`z-50 w-full sticky top-0 transition-all duration-200 ${scrolled ? "bg-white/50 backdrop-blur-sm shadow-xl" : "bg-white"}`}>
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img src="/logo.svg" alt="logo" className="w-full h-full object-contain" />
          </div>
          <span className=" font-bold">
            SIMPELANTAS <span className="hidden lg:inline font-medium">- Sistem Informasi Pelanggaran Lalu Lintas</span>{" "}
          </span>
        </Link>
        <nav className="hidden space-x-8 md:flex">
          <div className={`text-sm hover:text-zinc-950 cursor-pointer`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Cek Tilang
          </div>
          <div className="text-sm hover:text-zinc-950 cursor-pointer" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
            Layanan
          </div>
          <div className="text-sm hover:text-zinc-950 cursor-pointer" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            Tentang
          </div>
          <Link to="/login" className="text-sm hover:text-primary flex items-center">
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
                <div className=" hover:text-zinc-950 w-full text-center p-4" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  Beranda
                </div>
                <div className=" hover:text-zinc-950 w-full text-center p-4" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
                  Layanan
                </div>
                <div className=" hover:text-zinc-950 w-full text-center p-4" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
                  Tentang
                </div>

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
