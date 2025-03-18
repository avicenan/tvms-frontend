import { useParams } from "react-router-dom";
import TilangCard from "./tilang-card";
import VehicleCard from "./vehicle-card";
import CourtCard from "./court-card";
import FineCard from "./fine-card";
import EvidenceCard from "./evidence-card";
import ActivityCard from "./activity-card";
import NotificationCard from "./notification-card";
import AppealCard from "./appeal-card";

export default function TicketPage() {
  const { ticketId } = useParams();
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-none scroll-m-20 text-lg font-bold tracking-tight lg:text-xl mb-4">Surat Tilang {ticketId}</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid grid-flow-row auto-rows-max gap-4 ">
            <TilangCard />
            <VehicleCard />
            <CourtCard />
            <FineCard />
          </div>
          <div className="grid grid-flow-row auto-rows-max gap-4">
            <EvidenceCard />
            <AppealCard />
            <NotificationCard />
            <ActivityCard />
          </div>
        </div>
      </div>
    </>
  );
}
