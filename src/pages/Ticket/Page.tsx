import { useNavigate, useParams } from "react-router-dom";
import TilangCard from "./tilang-card";
import VehicleCard from "./vehicle-card";
import CourtCard from "./court-card";
import FineCard from "./fine-card";
import EvidenceCard from "./evidence-card";
import ActivityCard from "./activity-card";
import NotificationCard from "./notification-card";
import AppealCard from "./appeal-card";
import { ticketApi } from "@/lib/api";
import { useEffect, useState } from "react";
import { TicketType } from "@/lib/types";
import { toast } from "sonner";
import { ArrowLeft, Loader, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressBar from "./progress-bar";
import Ticket from "@/components/ticket/ticket";

export default function TicketPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<TicketType>({} as TicketType);
  const [isLoading, setIsLoading] = useState(false);
  const [updateTicket, setUpdateTicket] = useState(false);
  const navigate = useNavigate();
  const [showPdf, setShowPdf] = useState(false);

  const fetchTicket = async () => {
    try {
      const response = await ticketApi.getTicketById(ticketId as string);
      setTicket(response.data.data);
    } catch (error) {
      setIsLoading(false);
      navigate("/d/tickets");
      toast.error("Surat Tilang tidak ditemukan");
    } finally {
      setIsLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    if (!ticket.id) {
      setIsLoading(true);
      fetchTicket();
    }

    const interval = setInterval(() => {
      fetchTicket();
    }, 10000);

    return () => clearInterval(interval);
  }, [ticketId]);

  // no load
  useEffect(() => {
    if (updateTicket) {
      fetchTicket();
      setUpdateTicket(false);
    }
  }, [updateTicket]);

  const handlePrint = () => {
    setShowPdf(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-zinc-600 py-10">
        <Loader className="animate-spin" /> Memuat...
      </div>
    );
  }
  if (showPdf) {
    return (
      <div className="h-screen flex flex-col">
        <div className="p-4 bg-white dark:bg-gray-800 shadow">
          <Button variant="outline" onClick={() => setShowPdf(false)} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          <Ticket ticket={ticket} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col pb-4">
      <div className="flex scroll-m-20 text-lg font-bold tracking-tight lg:text-xl mb-4 gap-4 items-center">
        <Button variant={"ghost"} onClick={() => navigate("/d/tickets")} className="cursor-pointer">
          <ArrowLeft />
        </Button>
        Surat Tilang #{ticketId}
      </div>
      <div className="flex items-start gap-2 mb-4 ">
        <div className="flex-1">
          <ProgressBar ticket={ticket} />
        </div>
        <div className="flex items-center gap-2 p-3">
          <Button variant={"ghost"} className="cursor-pointer" size={"lg"} onClick={handlePrint}>
            <Printer />
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid grid-flow-row auto-rows-max gap-4 ">
          {ticket.id && <TilangCard data={ticket} />}
          {ticket.violation?.vehicle_data && <VehicleCard data={ticket} />}
          {ticket.hearing_schedule && <CourtCard data={ticket.hearing_schedule} />}
          {ticket.payment?.status === "settlement" && <FineCard data={ticket} />}
        </div>
        <div className="grid grid-flow-row auto-rows-max gap-4">
          {ticket.violation && <EvidenceCard data={ticket.violation} />}
          {ticket.appeal && <AppealCard ticket={ticket} onUpdate={setUpdateTicket} />}
          {ticket.notifications && <NotificationCard ticket={ticket} onUpdate={setUpdateTicket} />}
          {ticket.activities && <ActivityCard data={ticket.activities} />}
        </div>
      </div>
    </div>
  );
}
