import Footer from "@/pages/PublicAccess/Home/footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
