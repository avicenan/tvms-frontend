import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";

const checkTicket = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { message: "Tiket ditemukan" } });
    }, 1500);
  });
};

export default function CheckTicketForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      ticket_no: "",
      vehicle_no: "",
    },
    onSubmit: async ({ value }) => {
      const res = await checkTicket();
      console.log(res);
      navigate(`/tickets?vno=${value.vehicle_no}&tno=${value.ticket_no}`);
    },
  });
  return (
    <Card className="bg-white lg:p-8 p-4 rounded-xl w-full lg:w-200">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="space-y-4"
      >
        <form.Field
          name="ticket_no"
          children={(field) => (
            <>
              <div className="flex flex-col gap-2 justify-center text-center">
                <div className="text-sm font-semibold">Nomor Tilang</div>
                <Input type="ticket_no" id="ticket_no" placeholder="hh5s-323n-43u7" className="" onChange={(e) => field.handleChange(e.target.value)} disabled={form.state.isSubmitting} />
                <div className="text-xl text-start font-bold uppercase">{field.state.value}</div>
              </div>
            </>
          )}
        />
        <form.Field
          name="vehicle_no"
          children={(field) => (
            <>
              <div className="flex flex-col gap-2 justify-center text-center">
                <div className="text-sm font-semibold">Nomor Kendaraan</div>
                <Input type="vehicle_no" id="vehicle_no" placeholder="B5623KKK" onChange={(e) => field.handleChange(e.target.value)} disabled={form.state.isSubmitting} />
                <div className="text-xl text-start font-bold uppercase">{field.state.value}</div>
              </div>
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button onClick={form.handleSubmit} type="submit" disabled={!canSubmit} className="w-full mt-8">
              {isSubmitting ? "..." : "Cek Tilang"}
            </Button>
          )}
        />
      </form>
    </Card>
  );
}
