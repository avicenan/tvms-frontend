import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTicket } from "@/context/CheckTicketContext";
import { useNavigate } from "react-router-dom";
const MidtransPayment = ({ paymentDialogChange, snapToken, paymentType, courtAgreement = false }: { paymentDialogChange: (open: boolean) => void; snapToken: string; paymentType: "denda" | "sidang"; courtAgreement?: boolean }) => {
  const navigate = useNavigate();
  const { reFetchTicket, ticket, attendCourtHearing } = useTicket();

  const handlePayment = () => {
    if (paymentType === "sidang" && !courtAgreement) {
      paymentDialogChange(false);
      toast.error("Pembayaran Gagal", {
        description: "Anda harus menyetujui perjanjian sidang sebelum melakukan pembayaran",
      });
      return;
    }

    try {
      if ((window as any).snap && snapToken) {
        (window as any).snap.pay(snapToken, {
          onSuccess: async function (result: any) {
            navigate(`/tickets?vno=${ticket?.violation?.vehicle_data?.number}&tno=${ticket?.id}&t=response`);
            await reFetchTicket();
            toast.success("Pembayaran Berhasil", {
              description: `Pembayaran ${result.gross_amount} untuk ${ticket?.violation?.vehicle_data?.number} berhasil dilakukan, silahkan cek email untuk melihat detail pembayaran`,
            });
            if (paymentType === "sidang") {
              await attendCourtHearing(ticket?.id);
            }
          },
          onError: async function () {
            navigate(`/tickets?vno=${ticket?.violation?.vehicle_data?.number}&tno=${ticket?.id}&t=response`);
            await reFetchTicket();
            toast.error("Pembayaran Gagal", {
              description: `Pembayaran untuk ${ticket?.violation?.vehicle_data?.number} gagal dilakukan, silahkan coba lagi`,
            });
          },
          onPending: async function () {
            navigate(`/tickets?vno=${ticket?.violation?.vehicle_data?.number}&tno=${ticket?.id}&t=response`);
            await reFetchTicket();
            toast.info("Pembayaran Gagal, Silahkan coba lagi", {
              description: `Pembayaran untuk ${ticket?.violation?.vehicle_data?.number} gagal dilakukan, silahkan coba lagi`,
            });
          },
          onClose: async function () {
            navigate(`/tickets?vno=${ticket?.violation?.vehicle_data?.number}&tno=${ticket?.id}&t=response`);
            await reFetchTicket();
            toast.info("Pembayaran Dibatalkan", {
              description: `Pembayaran untuk ${ticket?.violation?.vehicle_data?.number} dibatalkan`,
            });
          },
        });
      } else {
        throw new Error("Percobaan Pembayaran Gagal, Silahkan coba lagi");
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
      <Button onClick={handlePayment} className="cursor-pointer w-full" disabled={snapToken === "" || (paymentType === "sidang" && !courtAgreement)}>
        Pilih Metode Pembayaran
      </Button>
    </div>
  );
};

export default MidtransPayment;
