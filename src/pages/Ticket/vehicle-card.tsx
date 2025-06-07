import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Car, Mail, Phone } from "lucide-react";
import { TicketType } from "@/lib/types";

export default function VehicleCard({ data }: { data: TicketType }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Car className="text-primary" />
          <span className="font-semibold text-lg">Info Kendaraan</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-xs font-medium text-zinc-500">Nomor Kendaraan</p>
              <p className="text-base">{data.violation?.vehicle_data.number}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Jenis</p>
              <p className="text-base">{data.violation?.vehicle_data.category}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Merek</p>
              <p className="text-base">{data.violation?.vehicle_data.brand}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Tipe</p>
              <p className="text-base">{data.violation?.vehicle_data.type}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Warna</p>
              <p className="text-base">{data.violation?.vehicle_data.color}</p>
            </div>
          </div>
          <div className="border-t pt-4 grid sm:grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <p className="text-xs">{data.violation?.vehicle_data.owner_phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <p className="text-xs">{data.violation?.vehicle_data.owner_email}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
