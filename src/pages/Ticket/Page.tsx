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
        <div className="flex-none scroll-m-20 text-lg font-bold tracking-tight lg:text-xl mb-4">Surat Tilang #{ticketId}</div>
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
            {/* <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Bukti Pelanggaran</CardTitle>
                </div>
                <CardDescription>Foto dan dokumentasi pelanggaran lalu lintas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg border">
                    <img src="/placeholder.svg?height=300&width=500" alt="Bukti pelanggaran utama" width={500} height={300} className="h-auto w-full object-cover" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-lg border">
                      <img src="/placeholder.svg?height=200&width=300" alt="Bukti pelanggaran tambahan 1" width={300} height={200} className="h-auto w-full object-cover" />
                    </div>
                    <div className="overflow-hidden rounded-lg border">
                      <img src="/placeholder.svg?height=200&width=300" alt="Bukti pelanggaran tambahan 2" width={300} height={200} className="h-auto w-full object-cover" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </>
  );
}
