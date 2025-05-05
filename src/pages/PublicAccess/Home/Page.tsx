import { FlipWords } from "@/components/ui/flip-words";
import CheckTicketForm from "./check-ticket-form";

export default function LandingPage() {
  return (
    <div className="">
      <div className="md:px-40 px-4 pt-20 bg-zinc-100 h-200" id="check-ticket">
        <div className="mx-auto max-w-200 justify-center ">
          <div className="items-center text-center space-y-6 mb-14">
            <h1 className="text-6xl font-bold text-primary">
              <FlipWords words={["Check", "Confirm", "Pay"]} duration={1000} className="text-primary" />
              <span className=" -ms-1">Violation Ticket</span>
            </h1>
            <p className="text-primary">Check your ticket status easily and quickly! Enter the ticket number and vehicle number to see the violation details, make fine payments online.</p>
          </div>
          <CheckTicketForm />
        </div>
      </div>
    </div>
  );
}
