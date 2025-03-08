import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/Error/NotFound.tsx";
import Violations from "./pages/Violation/index.tsx";
import Violation from "./pages/Violation/show.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/violations",
    element: <Violations />,
  },
  {
    path: "/violations/:violationId",
    element: <Violation />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
