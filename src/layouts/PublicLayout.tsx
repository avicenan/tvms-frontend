import NavMenu from "@/pages/PublicAccess/nav-menu";
import Footer from "@/pages/PublicAccess/Home/footer";
import { Outlet, useLocation } from "react-router-dom";

export default function PublicLayout() {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname !== "/tickets" && <NavMenu />}
      <div className="">
        <Outlet />
      </div>
      {pathname !== "/tickets" && <Footer />}
    </div>
  );
}
