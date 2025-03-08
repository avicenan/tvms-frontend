import { useParams } from "react-router-dom";

export default function Violation() {
  const { violationId } = useParams();
  return <div>violation {violationId}</div>;
}
