import { Button } from "@/components/ui/button";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import { useTicket } from "@/context/CheckTicketContext";
// import { useNavigate } from "react-router-dom";

const MidtransPayment = ({ paymentDialogChange, snapToken }: { paymentDialogChange: (open: boolean) => void; snapToken: string }) => {
  // const { ticket } = useTicket();
  const navigate = useNavigate();
  const snap_token = snapToken;
  // useEffect(() => {
  //   // Load the Midtrans Snap script dynamically
  //   const script = document.createElement("script");
  //   script.src = "https://app.midtrans.com/snap/snap.js"; // For production, remove `.sandbox`
  //   script.setAttribute("data-client-key", import.meta.env.VITE_MIDTRANS_CLIENT_KEY); // Replace with your client key
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script); // Clean up on unmount
  //   };
  // }, []);

  const handlePayment = () => {
    try {
      if ((window as any).snap) {
        (window as any).snap.pay(snap_token, {
          onSuccess: function (result: any) {
            navigate(0);
            toast.success("Pembayaran berhasil!", {
              description: result,
            });
          },
          onPending: function (result: any) {
            console.log(result);
          },
          onError: function (error: any) {
            toast.error("Pembayaran gagal", {
              description: error.message,
            });
          },
        });
      } else {
        throw new Error("Snap.js is not loaded yet.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan", {
        description: (error as Error).message,
      });
    }
    paymentDialogChange(false);
  };

  return (
    <div>
      <Button onClick={handlePayment} className="cursor-pointer w-full">
        Bayar
      </Button>
    </div>
  );
};

export default MidtransPayment;
