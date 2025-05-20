import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Calendar, Clock, MapPin, DollarSign, Car, FileText } from "lucide-react";

export default function TabDetail({ ticket }: { ticket: any }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Pelanggaran</CardTitle>
          <CardDescription>Detail mengenai pelanggaran yang dilakukan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-500 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium">Tipe Pelanggaran</div>
              <div className="text-gray-500 dark:text-gray-400">{ticket?.violation?.violation_type?.name}</div>
            </div>
          </div>

          <div className="flex">
            <Calendar className="h-5 w-5 mt-1 text-gray-500 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium">Tanggal</div>
              <div className="text-gray-500 dark:text-gray-400">{new Date(ticket?.violation?.created_at!).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="flex">
            <Clock className="h-5 w-5 mt-1 text-gray-500 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium">Waktu</div>
              <div className="text-gray-500 dark:text-gray-400">{new Date(ticket?.violation?.created_at!).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</div>
            </div>
          </div>

          <div className="flex">
            <MapPin className="h-5 w-5 mt-1 text-gray-500 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium">Lokasi</div>
              <div className="text-gray-500 dark:text-gray-400">{ticket?.violation?.camera?.location}</div>
            </div>
          </div>

          <div className="flex">
            <DollarSign className="h-5 w-5 mt-1 text-gray-500 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium">Jumlah Denda</div>
              <div className="text-gray-500 dark:text-gray-400">{""}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Kendaraan</CardTitle>
          <CardDescription>Detail mengenai kendaraan yang digunakan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex">
            <Car className="h-5 w-5 mt-1 text-gray-500 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium">Kendaraan</div>
              <div className="text-gray-500 dark:text-gray-400">
                {ticket?.violation?.vehicle_data?.category} {ticket?.violation?.vehicle_data?.brand} {ticket?.violation?.vehicle_data?.type}
              </div>
            </div>
          </div>

          <div className="flex">
            <FileText className="h-5 w-5 mt-1 text-gray-500 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium">Deskripsi Pelanggaran</div>
              <div className="text-gray-500 dark:text-gray-400">
                <div className="mb-2">{ticket?.violation?.violation_type?.regulation}</div>
                <div>{ticket?.violation?.violation_type?.description}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
