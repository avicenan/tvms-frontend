import NavMenu from "@/pages/PublicAccess/Home/nav-menu";
import Footer from "@/pages/PublicAccess/Home/footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <NavMenu />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
