import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function paymentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Bayar Sekarang</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bayar Denda</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Bayar Denda</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
