import { FC, ReactNode, createContext, useContext, useState } from "react";
import { TicketType } from "@/lib/types";
import { publicApi } from "@/lib/publicApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface CheckTicketContextType {
  ticket: TicketType;
  isLoading: boolean;
  setTicket: (ticket: TicketType) => void;
  getTicket: (ticketId: string, vehicleNo: string) => Promise<void>;
  reFetchTicket: () => Promise<void>;
}

export const CheckTicketContext = createContext<CheckTicketContextType | undefined>(undefined);

export const CheckTicketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ticket, setTicket] = useState<TicketType>({} as TicketType);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getTicket = async (ticketId: string, vehicleNo: string) => {
    try {
      setIsLoading(true);
      const response = await publicApi.getTicket(ticketId, vehicleNo);
      setTicket(response.data.data);
      navigate(`/tickets?vno=${vehicleNo}&tno=${ticketId}`);
      Cookies.set("ticketId", ticketId);
      Cookies.set("vehicleNo", vehicleNo);
      setIsLoading(false);
    } catch (error) {
      navigate("/");
      toast.error("Surat Tilang Tidak Ditemukan");
      setTicket({} as TicketType);
    } finally {
      setIsLoading(false);
    }
  };

  const reFetchTicket = async () => {
    try {
      const response = await publicApi.getTicket(Cookies.get("ticketId")!, Cookies.get("vehicleNo")!);
      setTicket(response.data.data);
    } catch (error) {
      navigate("/");
      toast.error("Gagal memperbarui data");
    }
  };

  return <CheckTicketContext.Provider value={{ ticket, isLoading, setTicket, getTicket, reFetchTicket }}>{children}</CheckTicketContext.Provider>;
};

export const useTicket = () => {
  const context = useContext(CheckTicketContext);
  if (!context) throw new Error("useTicket must be used within a CheckTicketProvider");
  return context;
};
