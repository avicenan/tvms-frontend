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
import { ArrowLeft, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TicketPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<TicketType>({} as TicketType);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setIsLoading(true);
        const response = await ticketApi.getTicketById(ticketId as string);
        setTicket(response.data.data);
        console.log(response.data.data, "DATANY ");
      } catch (error) {
        console.error("Error fetching ticket:", error);
        navigate("/d/tickets");
        toast.error("Surat Tilang tidak ditemukan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-zinc-600 py-10">
        <Loader className="animate-spin" /> Memuat...
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4">
      <div className="flex scroll-m-20 text-lg font-bold tracking-tight lg:text-xl mb-4 gap-4 items-center">
        <Button variant={"ghost"} onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft />
        </Button>
        Surat Tilang #{ticketId}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid grid-flow-row auto-rows-max gap-4 ">
          <TilangCard data={ticket} />
          {ticket.violation?.vehicle_data && <VehicleCard data={ticket} />}
          {ticket.hearing_schedule && <CourtCard data={ticket.hearing_schedule} />}
          {ticket.payment?.status === "settlement" && <FineCard data={ticket} />}
        </div>
        <div className="grid grid-flow-row auto-rows-max gap-4">
          {ticket.violation && <EvidenceCard data={ticket.violation} />}
          {ticket.appeal && <AppealCard data={ticket} />}
          {ticket.notifications && <NotificationCard data={ticket} setTicket={setTicket} />}
          {ticket.activities && <ActivityCard data={ticket.activities} />}
        </div>
      </div>
    </div>
  );
}
