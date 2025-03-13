import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Violations from "./pages/Violations/Page";
import NotFound from "./pages/Error/NotFound";
import Violation from "./pages/Violation/Page";
import Dashboard from "./pages/Dashboard";
import PublicLayout from "./layouts/PublicLayout";
import LandingPage from "./pages/PublicAccess";
import ReportViolation from "./pages/ReportViolation";
import TicketPage from "./pages/Ticket/Page";
import TicketsPage from "./pages/Tickets/Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: "/d",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "violations", element: <Violations /> },
      { path: "violations/:violationId", element: <Violation /> },
      { path: "report-violation", element: <ReportViolation /> },
      { path: "tickets", element: <TicketsPage /> },
      { path: "tickets/:ticketId", element: <TicketPage /> },
      { path: "users", element: <div>users</div> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
