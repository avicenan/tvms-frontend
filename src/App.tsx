import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/PublicAccess";
import Dashboard from "./pages/Dashboard";
import ViolationsPage from "./pages/Violations/Page";
import Violation from "./pages/Violation/Page";
import TicketPage from "./pages/Ticket/Page";
import TicketsPage from "./pages/Tickets/Page";
import NotFound from "./pages/Error/NotFound";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname == "/d" || pathname == "/d/") {
      navigate("/d/dashboard");
    }
  });

  return (
    <main className="text-start">
      <Toaster />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/d" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="violations" element={<ViolationsPage />} />
          <Route path="violations/:violationId" element={<Violation />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/:ticketId" element={<TicketPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
export default App;
