import { useNavigate, useParams } from "react-router-dom";
import ConfirmViolationDialog from "./confirm-violation-dialog";
import CancelViolationDialog from "./cancel-violation-dialog";
import { useEffect, useState, useRef } from "react";
import TimeoutDialog from "./timeout-dialog";
import { toast } from "sonner";
import EnterDialog from "./enter-dialog";
import TimerUI from "@/components/ui/timer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { violationApi } from "@/lib/api";
import { validationApi } from "@/lib/validationApi";
import Cookies from "js-cookie";
import { useValidation } from "@/context/ValidationContext";
import { Loader, Pencil, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
// import object_detect from "src/assets/object_detect.jpeg";

export type ViolationType = {
  id: string;
  status: string;
  camera_id: number;
  camera: {
    id: number;
    location: string;
    stream_key: string;
    server_url: string;
    status: string;
    created_at: string | null;
    updated_at: string | null;
  };
  violation_evidence: string;
  number_evidence: string;
  violation_type_id: number;
  violation_type: {
    id: number;
    name: string;
    regulation: string;
    description: string;
    created_at: string | null;
    updated_at: string | null;
  };
  number: string;
  vehicle_data: {
    id: number;
    number: string;
    category: string;
    brand: string;
    type: string;
    color: string;
    owner_name: string;
    owner_phone: string;
    owner_email: string;
    created_at: string | null;
    updated_at: string | null;
  };
  created_at: string;
  updated_at: string;
};

export default function Violation() {
  // console.log("rendering page..");
  const { violationId } = useParams();
  const [isEnterDialogOpen, setIsEnterDialogOpen] = useState(false);
  const [isTimeoutDialogOpen, setIsTimeoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { handleRevokeSession } = useValidation();
  const [violation, setViolation] = useState<ViolationType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const startSession = async () => {
    try {
      const response = await violationApi.createToken(violationId as string);
      const inTenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
      Cookies.set("validation_token", response.data.token, { expires: inTenMinutes });
      Cookies.set("active_violation_id", violationId as string, { expires: inTenMinutes });
      return response.data.token;
    } catch (error) {
      console.error("Error starting session:", error);
      toast.error("Failed to start validation session");
      navigate("/d/violations");
    }
  };

  useEffect(() => {
    const fetchViolation = async () => {
      await startSession();
      const response = await validationApi.getViolationById(violationId as string);
      console.log(response.data.data, "DATANYE");
      setViolation(response.data.data);
      setIsLoading(false);
      setIsEnterDialogOpen(true);
    };

    fetchViolation();
  }, []);

  useEffect(() => {
    if (violation && violation?.status !== "Terdeteksi") {
      navigate("/d/violations");
      toast.error("Pelanggaran telah diproses sebelumnya");
    }
  }, [violation]);

  const handleTimeout = () => {
    handleRevokeSession();
    navigate("/d/violations");
  };

  const handleExit = () => {
    navigate("/d/violations");
  };

  const handleLast10Sec = () => {
    setIsTimeoutDialogOpen(true);
  };

  const handleRefreshSession = () => {
    // send  request refresh session
    handleRevokeSession();
    navigate(0);
  };

  const handleDoubleClick = () => {
    if (violation) {
      setVehicleNumber(violation.vehicle_data.number);
      setIsEditingNumber(true);
      // Focus input after state update
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleNumber(e.target.value);
  };

  const handleNumberSubmit = async () => {
    if (!violation || vehicleNumber === violation.vehicle_data.number) {
      setIsEditingNumber(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await validationApi.updateViolation(violation.id, {
        number: vehicleNumber,
      });

      // Only update the vehicle_data part of the violation state
      setViolation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          vehicle_data: response.data.violation.vehicle_data,
        };
      });

      if (response.data.violation.vehicle_data.number) {
        toast.success("Data kendaraan berhasil diperbarui");
      } else {
        toast.warning(response.data.violation.vehicle_data.message || "Data kendaraan tidak ditemukan");
      }
    } catch (error) {
      console.error("Error updating vehicle number:", error);
      toast.error("Gagal memperbarui nomor kendaraan");
      // Reset to original value on error
      setVehicleNumber(violation.vehicle_data.number);
    } finally {
      setIsEditingNumber(false);
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNumberSubmit();
    } else if (e.key === "Escape") {
      setIsEditingNumber(false);
      setVehicleNumber(violation?.vehicle_data.number || "");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-zinc-600">
        <Loader className="animate-spin" /> Memuat...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex flex-wrap justify-between gap-x-2">
        <div className="flex scroll-m-20 text-lg font-bold tracking-tight lg:text-xl gap-2 items-center">
          <Button variant={"outline"} onClick={() => navigate(-1)} className="cursor-pointer">
            <ArrowLeft /> Kembali
          </Button>{" "}
          Detail Pelanggaran #{violationId}
        </div>
        <div className=" flex gap-x-2 items-center text-end justify-end">
          <div className=" text-sm font-normal text-zinc-500">Selesaikan proses validasi sebelum</div>
          <TimerUI time={600} onLast10Sec={handleLast10Sec} onTimeout={handleTimeout} />
        </div>
      </div>
      <Card className="">
        <CardHeader>
          <CardTitle>Bukti pelanggaran</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 items-start flex-wrap">
          <img className="flex-1 max-h-80 object-contain bg-zinc-100 rounded-lg" src={`https://api.etilang.web.id/storage/${violation?.violation_evidence}`} alt={violation?.violation_evidence} />
          <div className="flex-initial flex xl:flex-col flex-nowrap overflow-x-scroll xl:overflow-x-hidden gap-2 items-start">
            <img src={`https://api.etilang.web.id/storage/${violation?.number_evidence}`} alt={violation?.number_evidence} className=" object-contain min-w-100 max-h-20 bg-zinc-100 rounded-lg" />
            <img src={`https://api.etilang.web.id/storage/${violation?.number_evidence}`} alt={violation?.number_evidence} className="object-contain min-w-100 max-h-20 bg-zinc-100 rounded-lg" />
            <div className="flex flex-col gap-1 p-2 bg-zinc-100 rounded-lg">
              <div className="font-medium text-zinc-900">{violation?.camera.location}</div>
              <div className="text-sm text-zinc-600">
                {new Date(violation?.created_at || "").toLocaleString("id-ID", {
                  dateStyle: "full",
                  timeStyle: "medium",
                })}
              </div>
              <div className="text-sm font-medium text-zinc-700">CCTV {violation?.camera.stream_key}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1 gap-2 rounded-xl">
          <CardHeader>
            <CardTitle>Informasi Deteksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-500">Nomor Kendaran</div>
                {isEditingNumber ? (
                  <Input
                    ref={inputRef}
                    value={vehicleNumber}
                    onChange={handleNumberChange}
                    onBlur={handleNumberSubmit}
                    onKeyDown={handleKeyDown}
                    className="text-base font-semibold text-zinc-950 dark:text-white"
                    disabled={isSubmitting}
                    autoFocus
                  />
                ) : (
                  <div
                    onDoubleClick={handleDoubleClick}
                    className={`flex justify-between items-center text-base font-semibold text-zinc-950 dark:text-white cursor-pointer group hover:bg-zinc-100 p-1 rounded ${isSubmitting ? "opacity-50" : ""}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader className="animate-spin h-4 w-4" />
                        <span>Memperbarui...</span>
                      </div>
                    ) : (
                      violation?.vehicle_data.number
                    )}
                    <Tooltip>
                      <TooltipTrigger>
                        <Pencil className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tekan dua kali untuk merubah</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-500">Jenis Kendaraan</div>
                <div className="text-base font-semibold text-zinc-950">{violation?.vehicle_data.category}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-500">Merek Kendaraan</div>
                <div className="text-base font-semibold text-zinc-950">{violation?.vehicle_data.brand}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-500">Tipe Kendaraan</div>
                <div className="text-base font-semibold text-zinc-950">{violation?.vehicle_data.type}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-500">Warna Kendaraan</div>
                <div className="text-base font-semibold text-zinc-950">{violation?.vehicle_data.color}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-500">Jenis Pelanggaran</div>
                <div className="text-base font-semibold text-zinc-950">{violation?.violation_type.name}</div>
                <div className="text-sm font-medium text-zinc-500">{violation?.violation_type.regulation}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2 w-full lg:w-80">
          <ConfirmViolationDialog violation={violation!} />
          <CancelViolationDialog violation={violation!} />
        </div>
      </div>
      <EnterDialog open={isEnterDialogOpen} onOpenChange={() => setIsEnterDialogOpen(false)} />
      <TimeoutDialog open={isTimeoutDialogOpen} onExit={handleExit} onRefreshSession={handleRefreshSession} />
    </div>
  );
}
