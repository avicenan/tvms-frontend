import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Car } from "lucide-react";
import { TicketType } from "@/lib/types";

export default function VehicleCard({ data }: { data: TicketType }) {
  return (
    <Card>
      <CardHeader className="border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">Kendaraan</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-sm font-medium text-zinc-500">Nomor Kendaraan</p>
              <p className="text-base font-semibold">{data.violation?.vehicle_data.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Jenis</p>
              <p className="text-base font-semibold">{data.violation?.vehicle_data.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Merek</p>
              <p className="text-base font-semibold">{data.violation?.vehicle_data.brand}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Tipe</p>
              <p className="text-base font-semibold">{data.violation?.vehicle_data.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Warna</p>
              <p className="text-base font-semibold">{data.violation?.vehicle_data.color}</p>
            </div>
          </div>
          <div className="border-t pt-4 grid sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-xs font-medium text-zinc-500">Nomor HP Pemilik</p>
              <p className="text-xs font-semibold">{data.violation?.vehicle_data.owner_phone}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Email Pemilik</p>
              <p className="text-xs font-semibold">{data.violation?.vehicle_data.owner_email}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
