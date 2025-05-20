import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTicket } from "@/context/CheckTicketContext";
import { useForm } from "@tanstack/react-form";
import Cookies from "js-cookie";

export default function CheckTicketForm() {
  const { getTicket } = useTicket();

  const form = useForm({
    defaultValues: {
      ticket_no: Cookies.get("ticket_no") || "",
      vehicle_no: Cookies.get("vehicle_no") || "",
    },
    onSubmit: async ({ value }) => {
      Cookies.set("ticket_no", value.ticket_no);
      Cookies.set("vehicle_no", value.vehicle_no);
      getTicket(value.ticket_no, value.vehicle_no);
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
                <Input type="ticket_no" id="ticket_no" placeholder="hh5s-323n-43u7" className="" onChange={(e) => field.handleChange(e.target.value)} disabled={form.state.isSubmitting} value={field.state.value} />
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
                <Input type="vehicle_no" id="vehicle_no" placeholder="B5623KKK" onChange={(e) => field.handleChange(e.target.value)} disabled={form.state.isSubmitting} value={field.state.value} />
                <div className="text-xl text-start font-bold uppercase">{field.state.value}</div>
              </div>
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button onClick={form.handleSubmit} type="submit" disabled={isSubmitting} className="w-full mt-8 cursor-pointer">
              {isSubmitting ? "..." : "Cek Tilang"}
            </Button>
          )}
        />
      </form>
    </Card>
  );
}
