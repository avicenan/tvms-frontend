import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraType } from "@/lib/types";
import { Cctv, Loader } from "lucide-react";
import SkeletonPage from "./skeleton-page";
import AddCameraDialog from "./add-dialog";
import EditCameraDialog from "./edit-dialog";
import DeleteDialog from "./delete-dialog";
import { cameraApi } from "@/lib/api";
// import { cameraApi } from "@/lib/api";
// Dummy data for testing with YouTube video IDs
// const dummyCameras: CameraType[] = [
//   {
//     id: 1,
//     location: "Jalan Sudirman - Simpang 1",
//     server_url: "https://www.youtube.com/embed/ByED80IKdIU",
//     stream_key: "camera1",
//     status: "active",
//     updated_at: "2024-03-20T00:00:00Z",
//   },
//   {
//     id: 2,
//     location: "Jalan Thamrin - Simpang 2",
//     server_url: "https://www.youtube.com/embed/up3rJmxI1Fo",
//     stream_key: "camera2",
//     status: "active",
//     updated_at: "2024-03-20T00:00:00Z",
//   },
//   {
//     id: 3,
//     location: "Jalan Gatot Subroto - Simpang 3",
//     server_url: "https://www.youtube.com/embed/gicEyI_T8Hk",
//     stream_key: "camera3",
//     status: "active",
//     updated_at: "2024-03-20T00:00:00Z",
//   },
//   {
//     id: 4,
//     location: "Jalan Rasuna Said - Simpang 4",
//     server_url: "https://www.youtube.com/embed/qMYlpMsWsBE",
//     stream_key: "camera4",
//     status: "active",
//     updated_at: "2024-03-20T00:00:00Z",
//   },
// ];

export default function CCTVPage() {
  const [cameras, setCameras] = useState<CameraType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadedIframes, setLoadedIframes] = useState<{ [key: number]: boolean }>({});
  const [isUpdated, setIsUpdated] = useState(false);

  const fetchCameras = async () => {
    try {
      const res = await cameraApi.getCameras();
      setCameras(res.data.data);
    } catch (error) {
      console.error("Error fetching cameras:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCameras();
  }, []);

  useEffect(() => {
    if (isUpdated) {
      fetchCameras();
      setIsUpdated(false);
    }
  }, [isUpdated]);

  const handleIframeLoad = (cameraId: number) => {
    setLoadedIframes((prev) => ({
      ...prev,
      [cameraId]: true,
    }));
  };

  if (loading) {
    return <SkeletonPage />;
  }

  return (
    <div className="container pb-4">
      <div className="flex justify-between items-start">
        <h1 className="text-sm md:text-lg font-bold mb-4 flex gap-2 items-center">
          <Cctv /> Siaran Langsung Kamera
        </h1>
        <AddCameraDialog onUpdate={() => setIsUpdated(true)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((camera) => (
          <Card key={camera.id} className="overflow-hidden">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{camera.location}</CardTitle>
              <div className="flex gap-2">
                <EditCameraDialog camera={camera} onUpdate={() => setIsUpdated(true)} />
                <DeleteDialog camera={camera} onUpdate={() => setIsUpdated(true)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {!loadedIframes[camera.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-center">
                      <Loader className="h-8 w-8 animate-spin mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Loading stream...</p>
                    </div>
                  </div>
                )}
                <iframe
                  className="w-full h-full"
                  src={camera.server_url}
                  title={`Live Stream - ${camera.location}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onLoad={() => handleIframeLoad(camera.id)}
                />
                {/* <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">{capitalize(camera.status)}</div> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
