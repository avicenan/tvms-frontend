import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";

export default function TabEvidence({ ticket }: { ticket: any }) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Bukti Foto</CardTitle>
        <CardDescription>Bukti fotografis pelanggaran</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden border bg-muted">
              <img src={`https://api.etilang.web.id/storage/${ticket?.violation?.violation_evidence}`} alt="Traffic violation photo 1" className="object-cover max-h-[500px] w-full" loading="lazy" />
              <div className="absolute bottom-2 right-2">
                <Badge className="bg-black/70 hover:bg-black/70 transition-colors">
                  <Camera className="h-3 w-3 mr-1" aria-hidden="true" />
                  <span>{ticket?.violation?.violation_type?.name}</span>
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Kendaraan terdeteksi melalui kamera</p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
              <img src={`https://api.etilang.web.id/storage/${ticket?.violation?.number_evidence}`} alt="Traffic violation photo 2" className="object-cover w-full h-full" loading="lazy" />
              <div className="absolute bottom-2 right-2">
                <Badge className="bg-black/70 hover:bg-black/70 transition-colors">
                  <Camera className="h-3 w-3 mr-1" aria-hidden="true" />
                  <span>{ticket?.violation?.number}</span>
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tampak dekat plat nomor kendaraan</p>
            {/* <div className="flex justify-center items-start bg-red-500 rounded-lg">
              <AlertTriangle className="h-10 w-10 text-red-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Bukti tidak tersedia</p>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
