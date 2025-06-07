import { ArrowLeft, ArrowRight, FileText, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTicket } from "@/context/CheckTicketContext";
import TabEvidence from "./TabEvidence";
import TabDetail from "./TabDetail";
import TabResponse from "./TabResponse/content";
import Cookies from "js-cookie";
import Ticket from "@/components/ticket/ticket";
import InstructionModal from "./instruction-dialog";
export default function ViolationDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabOpen, setTabOpen] = useState<string>("evidence");
  const [showPdf, setShowPdf] = useState(false);
  const { ticket, isLoading, getTicket } = useTicket();

  useEffect(() => {
    getTicket(searchParams.get("tno")!, searchParams.get("vno")!);
    Cookies.set("ticketId", searchParams.get("tno")!);
    Cookies.set("vehicleNo", searchParams.get("vno")!);

    if (searchParams.get("t")) {
      setTabOpen(searchParams.get("t")!);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("t")) {
      setTabOpen(searchParams.get("t")!);
    }
    // Cleanup and remount when ticket changes
    return () => {
      setTabOpen("response"); // Reset to default tab
    };
  }, [ticket]);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      t: tabOpen,
    }));
  }, [tabOpen]);

  // const handleHelp = () => {
  //   setTabOpen("response");
  //   // Add a small delay to ensure tab switch completes before scrolling
  //   setTimeout(() => {
  //     const informationCard = document.getElementById("information-card");
  //     if (informationCard) {
  //       informationCard.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, 100);
  //   return;
  // };

  const handleDownload = () => {
    setShowPdf(true);
  };

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
    <div className="min-h-screen bg-background dark:bg-gray-900 border-t">
      {isLoading ? (
        <header className="bg-white dark:bg-gray-800 shadow h-32">
          <div className="container mx-auto py-4 max-w-4xl">
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke halaman utama
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </header>
      ) : (
        <header className="bg-white dark:bg-gray-800 shadow px-4 md:px-0">
          <div className="container mx-auto py-4 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Link to="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke halaman utama
                </Link>
                <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white"> Surat Tilang #{ticket?.id}</h1>
                <div className="flex items-center mt-2">
                  <Badge
                    variant={"outline"}
                    className={`${
                      ticket?.status?.toLowerCase() === "tilang"
                        ? "bg-blue-400/20 border-blue-400"
                        : ticket?.status?.toLowerCase() === "himbauan"
                        ? "bg-lime-400/20 border-lime-400"
                        : ticket?.status?.toLowerCase() === "pengajuan banding"
                        ? "bg-orange-400/20 border-orange-400"
                        : ticket?.status?.toLowerCase() === "persidangan"
                        ? "bg-teal-400/20 border-teal-400"
                        : ticket?.status?.toLowerCase() === "sudah bayar"
                        ? "bg-indigo-400/20 border-indigo-400"
                        : ticket?.status?.toLowerCase() === "lewat tenggat"
                        ? "bg-zinc-400/20 border-zinc-400"
                        : "bg-zinc-400/20 border-zinc-400"
                    }`}
                  >
                    {ticket?.status}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                    Diterbitkan pada {new Date(ticket?.violation?.created_at!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" })}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                <Button variant="outline" onClick={handleDownload} className="flex items-center cursor-pointer">
                  <FileText className=" h-4 w-4" />
                  <span className="">Unduh</span>
                </Button>
                <InstructionModal />
              </div>
            </div>
          </div>
        </header>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="h-8 w-8 animate-spin" />
          <span className="ml-3">Memuat data...</span>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <Tabs value={tabOpen} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-200 mb-2">
                <TabsTrigger value="evidence" className="font-semibold cursor-pointer hover:bg-zinc-300" onClick={() => setTabOpen("evidence")}>
                  Bukti Foto
                </TabsTrigger>
                <TabsTrigger value="details" className="font-semibold cursor-pointer hover:bg-zinc-300" onClick={() => setTabOpen("details")}>
                  Detail
                </TabsTrigger>
                <TabsTrigger value="response" className="font-semibold cursor-pointer hover:bg-zinc-300" onClick={() => setTabOpen("response")}>
                  Respons
                </TabsTrigger>
              </TabsList>

              <TabsContent value="evidence" className="relative space-y-2 pb-4">
                <TabEvidence ticket={ticket} />
                <div className="flex justify-end">
                  <Button className="flex items-center drop-shadow-lg cursor-pointer" onClick={() => setTabOpen("details")}>
                    Detail Pelanggaran <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details" className="relative space-y-2 pb-4">
                <TabDetail ticket={ticket} />
                <div className="flex justify-end">
                  <Button className="flex items-center drop-shadow-lg cursor-pointer" onClick={() => setTabOpen("response")}>
                    Konfirmasi dan Bayar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="response" className="relative space-y-2 pb-4">
                <TabResponse ticket={ticket} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
