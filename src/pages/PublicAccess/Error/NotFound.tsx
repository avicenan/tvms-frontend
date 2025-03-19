import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PublicNotFoundPage() {
  return (
    <div>
      <span>Halaman Tidak Ditemukan</span>
      <Link to={"/"}>
        <Button variant={"outline"}>Kembali ke beranda</Button>
      </Link>
    </div>
  );
}
