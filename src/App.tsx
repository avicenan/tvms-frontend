import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/Dashboard/Page";
import LandingPage from "./pages/PublicAccess/Home/Page";
import ViolationsPage from "./pages/Violations/Page";
import Violation from "./pages/Violation/Page";
import TicketPage from "./pages/Ticket/Page";
import TicketsPage from "./pages/Tickets/Page";
import NotFound from "./pages/Error/NotFound";
import { useEffect } from "react";
import MyTicket from "./pages/PublicAccess/Ticket/Page";
import ReportViolation from "./pages/ReportViolation/Page";
import PublicNotFoundPage from "./pages/PublicAccess/Error/NotFound";
import LoginPage from "./pages/Auth/Login";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ValidationProvider } from "./context/ValidationContext";
import AppealPage from "./pages/Appeal/Page";
import { CheckTicketProvider } from "./context/CheckTicketContext";
function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname == "/d" || pathname == "/d/") {
      navigate("/d/dashboard");
    }
  }, []);

  return (
    <main className="text-start">
      <Toaster />
      <ValidationProvider>
        <AuthProvider>
          <CheckTicketProvider>
            <Routes>
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="tickets" element={<MyTicket />} />
                <Route path="*" element={<PublicNotFoundPage />} />
              </Route>
              <Route path="/d" element={<MainLayout />}>
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="violations"
                  element={
                    <ProtectedRoute>
                      <ViolationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="violations/:violationId"
                  element={
                    <ProtectedRoute>
                      <Violation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="tickets"
                  element={
                    <ProtectedRoute>
                      <TicketsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="tickets/:ticketId"
                  element={
                    <ProtectedRoute>
                      <TicketPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="report-violation"
                  element={
                    <ProtectedRoute>
                      <ReportViolation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="appeals"
                  element={
                    <ProtectedRoute>
                      <AppealPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="login" element={<LoginPage />}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CheckTicketProvider>
        </AuthProvider>
      </ValidationProvider>
    </main>
  );
}
export default App;
