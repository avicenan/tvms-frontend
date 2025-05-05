import { useNavigate, useParams } from "react-router-dom";
import ConfirmViolationDialog from "./confirm-violation-dialog";
import CancelViolationDialog from "./cancel-violation-dialog";
import { useState } from "react";
import TimeoutDialog from "./timeout-dialog";
import { toast } from "sonner";
import EnterDialog from "./enter-dialog";
import TimerUI from "@/components/ui/timer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import object_detect from "src/assets/object_detect.jpeg";

export default function Violation() {
  // console.log("rendering page..");
  const { violationId } = useParams();
  const [isEnterDialogOpen, setIsEnterDialogOpen] = useState(true);
  const [isTimeoutDialogOpen, setIsTimeoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleTimeout = () => {
    toast("Timeout", {
      description: "Waktu validasi telah habis",
    });
    // console.log("render..");
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
    navigate(0);
  };

  // useEffect(() => {
  //   setIsEnterDialogOpen(true);
  // }, [isEnterDialogOpen]);

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex flex-wrap justify-between gap-x-2">
        <div className="flex-none scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">Violation Details #{violationId}</div>
        <div className=" flex gap-x-2 items-center text-end justify-end">
          <div className=" text-sm font-normal text-zinc-500">Complete the validation process before</div>
          <TimerUI time={600} onLast10Sec={handleLast10Sec} onTimeout={handleTimeout} />
        </div>
      </div>
      <Card className="">
        <CardHeader>
          <CardTitle>Evidence of violation</CardTitle>
          <CardDescription>Wednesday, 05-24-2025 13:30 - Jl. Telekomunikasi - CCTV hiwe78j</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 items-start flex-wrap">
          <img className="flex-1 max-h-96 object-contain bg-zinc-50" src={"/src/assets/object_detect.jpeg"} alt="" />
          <div className="flex-initial flex xl:flex-col flex-nowrap overflow-x-scroll xl:overflow-x-hidden gap-2 items-start">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Latest_motor_vehicle_number_plate_designs_in_Indonesia.jpg/1200px-Latest_motor_vehicle_number_plate_designs_in_Indonesia.jpg" alt="" className=" max-h-32" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Latest_motor_vehicle_number_plate_designs_in_Indonesia.jpg/1200px-Latest_motor_vehicle_number_plate_designs_in_Indonesia.jpg" alt="" className="max-h-32" />
            <div className="">
              <div className="">Jl. Telekomunikasi</div>
              <div className="">Wednesday, 24-05-2025 13:30</div>
              <div className="">CCTV hiwe78j</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1 gap-2 rounded-xl">
          <CardHeader>
            <CardTitle>Information</CardTitle>
            <CardDescription>Double press to make changes</CardDescription>
          </CardHeader>
          {/* <div className="flex flex-col flex-wrap justify-between items-baseline mb-4">
            <span className="font-semibold text-lg">Informasi Deteksi</span>
            <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span>
          </div> */}
          <CardContent>
            <div className="flex flex-wrap justify-between items-baseline">
              <span className="font-normal flex-1 text-zinc-500">Vehicle Number</span>
              <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">B-3244-KHK</span>
            </div>
            <div className="flex flex-wrap justify-between items-baseline">
              <span className="font-normal flex-1 text-zinc-500">Vehicle Category</span>
              <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Motorcycle</span>
            </div>
            <div className="flex flex-wrap justify-between items-baseline">
              <span className="font-normal flex-1 text-zinc-500">Vehicle Brand</span>
              <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Yamaha</span>
            </div>
            <div className="flex flex-wrap justify-between items-baseline">
              <span className="font-normal flex-1 text-zinc-500">Vehicle Type</span>
              <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">NMax</span>
            </div>
            <div className="flex flex-wrap justify-between items-baseline">
              <span className="font-normal flex-1 text-zinc-500">Vehicle Color</span>
              <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Red</span>
            </div>
            <div className="flex flex-wrap justify-between items-baseline">
              <span className="font-normal flex-1 text-zinc-500">Violation</span>
              <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Helm</span>
            </div>
          </CardContent>
        </Card>
        {/* <div className="flex flex-col gap-2 w-80 border border-zinc-400 rounded-xl border-dashed p-4">
          <div className="">
            <ValidationForm></ValidationForm>
          </div>
        </div> */}
        <div className="flex flex-col gap-2 w-full lg:w-80">
          <ConfirmViolationDialog />
          <CancelViolationDialog />
        </div>
      </div>
      <EnterDialog open={isEnterDialogOpen} onOpenChange={() => setIsEnterDialogOpen(false)} />
      <TimeoutDialog open={isTimeoutDialogOpen} onExit={handleExit} onRefreshSession={handleRefreshSession} />
    </div>
  );
}
