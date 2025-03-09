import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Violation() {
  const { violationId } = useParams();
  const navigate = useNavigate();

  // const handleRedirectTimeout = () => {
  //   navigate("/d/violations");
  // };

  // const [count, setCount] = useState(10);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount(count - 1);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [count]);
  // if (count === 0) {
  //   // window.location.href = "/d/violations";
  //   handleRedirectTimeout();
  //   return <div>Waktu Habis...</div>;
  // }

  return <div>violation {violationId}</div>;
}
