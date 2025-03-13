import { useParams } from "react-router-dom";

export default function TicketPage() {
  const { ticketId } = useParams();
  return <div>{ticketId}</div>;
}
