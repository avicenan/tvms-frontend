import { createContext, useContext, useEffect, ReactNode, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { validationApi } from "@/lib/validationApi";
import { toast } from "sonner";

interface ValidationContextType {
  checkValidationToken: () => Promise<void>;
  handleRevokeSession: () => Promise<void>;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export const ValidationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { violationId } = useParams();
  const navigate = useNavigate();

  const checkValidationToken = async () => {
    console.log("CHECKING VALIDATION TOKEN....");
    const token = Cookies.get("validation_token");

    if (token && !violationId) {
      handleRevokeSession();
    }
  };

  const handleRevokeSession = async () => {
    try {
      const activeViolationId = Cookies.get("active_violation_id");
      const response = await validationApi.revokeSession(activeViolationId as string);
      console.log(response.data.message, "RESPONSENYA");
      Cookies.remove("validation_token");
      Cookies.remove("active_violation_id");
      toast.warning("Timeout", {
        description: "Sesi validasi pelanggaran anda telah berakhir",
      });
    } catch (error) {
      console.error("Error revoking validation session:", error);
    }
  };

  useEffect(() => {
    checkValidationToken();
  }, [navigate]);

  //   const handleRevokeSession = async () => {
  //     if (Cookies.get("validation_token")) {
  //       try {
  //         const response = await violationApi.revokeSession(violationId as string);
  //         console.log(violationId, "IDNYAA");
  //         Cookies.remove("validation_token");
  //         navigate("/d/violations");
  //       } catch (error) {
  //         console.error("Error revoking session:", error);
  //       }
  //     }
  //   };

  return <ValidationContext.Provider value={{ checkValidationToken, handleRevokeSession }}>{children}</ValidationContext.Provider>;
};

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }
  return context;
};
