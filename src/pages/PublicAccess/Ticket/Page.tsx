import { ArrowLeft, Calendar, Clock, MapPin, Car, AlertTriangle, DollarSign, FileText, Camera, Upload, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function ViolationDetailPage() {
  const violationId = 21324234;

  // In a real application, you would fetch the violation data based on the ID
  const violationData = {
    id: violationId,
    type: "Speeding",
    date: "15 Maret 2023",
    time: "10:32 AM",
    location: "Jl. Telekomunikasi 1, Bandung",
    vehicle: "Toyota Camry (ABC-123)",
    description: "Penumpang/Pengendara tidak mengenakan helm atau tidak mengenakan helm sesuai standar",
    fine: "Rp. 150.000",
    status: "Pending",
    dueDate: "April 15, 2023",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 border-t">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link to="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to search
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Surat Tilang #{violationId}</h1>
              <div className="flex items-center mt-2">
                <Badge variant={violationData.status === "Pending" ? "outline" : "secondary"}>{violationData.status}</Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">Issued on {violationData.date}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
              <Button variant="outline" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-l-4 border-l-amber-500 mb-6">
            <CardContent className="">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Ringkasan Pelanggaran</h2>
                  <p className="text-gray-700 dark:text-gray-300">{violationData.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{violationData.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{violationData.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{violationData.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                      <span>Fine: {violationData.fine}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detail</TabsTrigger>
              <TabsTrigger value="evidence">Bukti Foto</TabsTrigger>
              <TabsTrigger value="next-steps">Respon</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Pelanggaran</CardTitle>
                    <CardDescription>Detail mengenai pelanggaran yang dilakukan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Tipe Pelanggaran</div>
                        <div className="text-gray-500 dark:text-gray-400">{violationData.type}</div>
                      </div>
                    </div>

                    <div className="flex">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Tanggal</div>
                        <div className="text-gray-500 dark:text-gray-400">{violationData.date}</div>
                      </div>
                    </div>

                    <div className="flex">
                      <Clock className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Waktu</div>
                        <div className="text-gray-500 dark:text-gray-400">{violationData.time}</div>
                      </div>
                    </div>

                    <div className="flex">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Lokasi</div>
                        <div className="text-gray-500 dark:text-gray-400">{violationData.location}</div>
                      </div>
                    </div>

                    <div className="flex">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Jumlah Denda</div>
                        <div className="text-gray-500 dark:text-gray-400">{violationData.fine}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Kendaraan</CardTitle>
                    <CardDescription>Detail mengenai kendaraan yang digunakan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex">
                      <Car className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Kendaraan</div>
                        <div className="text-gray-500 dark:text-gray-400">{violationData.vehicle}</div>
                      </div>
                    </div>

                    <div className="flex">
                      <FileText className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Deskripsi Pelanggaran</div>
                        <div className="text-gray-500 dark:text-gray-400">{violationData.description}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="evidence" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bukti Foto</CardTitle>
                  <CardDescription>Photographic evidence of the violation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                        <img src="https://placehold.co/600x400" alt="Traffic violation photo 1" width={600} height={400} className="object-cover max-w-50" />
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-black/70 hover:bg-black/70">
                            <Camera className="h-3 w-3 mr-1" />
                            Photo 1
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle captured at the intersection</p>
                    </div>

                    <div className="space-y-3">
                      <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                        <img src="/placeholder.svg?height=400&width=600" alt="Traffic violation photo 2" width={600} height={400} className="object-cover" />
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-black/70 hover:bg-black/70">
                            <Camera className="h-3 w-3 mr-1" />
                            Photo 2
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Close-up of vehicle license plate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="next-steps" className="mt-6">
              <div className="space-y-6">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
                    <div className="font-medium">Respon diperlukan sebelum {violationData.dueDate}</div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                        Bayar Denda Online
                      </CardTitle>
                      <CardDescription>Pay your fine quickly and securely</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pay your fine of {violationData.fine} using credit card, debit card, or bank transfer.</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Pay Now</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Upload className="h-5 w-5 mr-2 text-blue-600" />
                        Buat Bantahan
                      </CardTitle>
                      <CardDescription>Provide additional evidence</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Upload photos, videos, or documents that may help your case.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Upload Files
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Scale className="h-5 w-5 mr-2 text-purple-600" />
                        Hadiri Sidang
                      </CardTitle>
                      <CardDescription>Dispute the violation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Schedule a court hearing to contest this violation.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Contest Violation
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>Important details about your options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Payment Information</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Payment must be received by the due date to avoid additional penalties. A receipt will be emailed to you after payment is processed.</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Contesting the Violation</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">If you choose to contest this violation, you will need to attend a court hearing. The hearing date will be scheduled after you submit your request.</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Submitting Evidence</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">You may submit additional evidence to support your case. Acceptable formats include JPG, PNG, PDF, and MP4 files under 20MB.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
