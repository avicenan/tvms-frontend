import { ArrowLeft, ArrowRight, FileText, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTicket } from "@/context/CheckTicketContext";
import TabEvidence from "./TabEvidence";
import TabDetail from "./TabDetail";
import TabResponse from "./TabResponse/content";

export default function ViolationDetailPage() {
  const [searchParams] = useSearchParams();
  const [tabOpen, setTabOpen] = useState<string>("evidence");
  const navigate = useNavigate();
  const { ticket, isLoading, getTicket } = useTicket();

  useEffect(() => {
    if (!searchParams.has("vno") || !searchParams.has("tno")) {
      // if the data is unavailable
      navigate("/");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    getTicket(searchParams.get("tno")!, searchParams.get("vno")!);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-8 w-8 animate-spin" />
        <span className="ml-3">Memuat data...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 border-t">
      <header className="bg-white dark:bg-gray-800 shadow ">
        <div className="container mx-auto p-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link to="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke halaman utama
              </Link>
              <h1 className="text-2xl md:text-2xl font-bold text-gray-900 dark:text-white">Surat Tilang #{ticket?.id}</h1>
              <div className="flex items-center mt-2">
                <Badge
                  variant={
                    ticket?.status === "Tilang"
                      ? "outline"
                      : ticket?.status === "Himbauan"
                      ? "secondary"
                      : ticket?.status === "Persidangan"
                      ? "destructive"
                      : ticket?.status === "Sudah Bayar"
                      ? "secondary"
                      : ticket?.status === "Lewat Tenggat"
                      ? "destructive"
                      : ticket?.status === "Pengajuan Banding"
                      ? "secondary"
                      : ticket?.status === "Banding Diterima"
                      ? "secondary"
                      : "secondary"
                  }
                  className="border-gray-200"
                >
                  {ticket?.status}
                </Badge>
                {/* <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                  Diterbitkan pada {new Date(ticket?.violation?.created_at!).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span> */}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                  Diterbitkan pada {new Date(ticket?.violation?.created_at!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" })}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
              <Button variant="outline" className="flex items-center cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <Tabs value={tabOpen} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-200">
              <TabsTrigger value="evidence" className="font-semibold cursor-pointer hover:bg-zinc-300" onClick={() => setTabOpen("evidence")}>
                Bukti Foto
              </TabsTrigger>
              <TabsTrigger value="details" className="font-semibold cursor-pointer hover:bg-zinc-300" onClick={() => setTabOpen("details")}>
                Detail
              </TabsTrigger>
              <TabsTrigger value="response" className="font-semibold cursor-pointer hover:bg-zinc-300" onClick={() => setTabOpen("response")}>
                Respon
              </TabsTrigger>
            </TabsList>

            <TabsContent value="evidence" className="relative space-y-2">
              <TabEvidence ticket={ticket} />
              <div className="flex justify-end">
                <Button className="flex items-center cursor-pointer" onClick={() => setTabOpen("details")}>
                  Detail Pelanggaran <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="details" className="relative space-y-2">
              <TabDetail ticket={ticket} />
              <div className="flex justify-end">
                <Button className="flex items-center cursor-pointer" onClick={() => setTabOpen("response")}>
                  Konfirmasi dan Bayar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="response" className="">
              <TabResponse ticket={ticket} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
