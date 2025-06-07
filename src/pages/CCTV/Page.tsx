import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraType } from "@/lib/types";
import { Cctv, Loader } from "lucide-react";
import SkeletonPage from "./skeleton-page";
import AddCameraDialog from "./add-camera-dialog";
import { capitalize } from "@/lib/utils";

// Dummy data for testing with YouTube video IDs
const dummyCameras: CameraType[] = [
  {
    id: 1,
    location: "Jalan Sudirman - Simpang 1",
    stream_url: "https://www.youtube.com/embed/z7SiAaN4ogw",
    status: "aktif",
    stream_key: "camera1",
    created_at: "2024-03-20T00:00:00Z",
    updated_at: "2024-03-20T00:00:00Z",
  },
  {
    id: 2,
    location: "Jalan Thamrin - Simpang 2",
    stream_url: "https://www.youtube.com/embed/VR-x3HdhKLQ",
    status: "aktif",
    stream_key: "camera2",
    created_at: "2024-03-20T00:00:00Z",
    updated_at: "2024-03-20T00:00:00Z",
  },
  {
    id: 3,
    location: "Jalan Gatot Subroto - Simpang 3",
    stream_url: "https://www.youtube.com/embed/xRPjKQtRXR8",
    status: "aktif",
    stream_key: "camera3",
    created_at: "2024-03-20T00:00:00Z",
    updated_at: "2024-03-20T00:00:00Z",
  },
  {
    id: 4,
    location: "Jalan Rasuna Said - Simpang 4",
    stream_url: "https://www.youtube.com/embed/B7LBgMD_QE0",
    status: "aktif",
    stream_key: "camera4",
    created_at: "2024-03-20T00:00:00Z",
    updated_at: "2024-03-20T00:00:00Z",
  },
];

export default function CCTVPage() {
  const [cameras, setCameras] = useState<CameraType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedIframes, setLoadedIframes] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // Simulate API call with timeout
    const fetchCameras = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCameras(dummyCameras);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

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
        <h1 className="text-lg font-bold mb-4 flex gap-2 items-center">
          <Cctv /> Siaran Langsung Kamera
        </h1>
        <AddCameraDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((camera) => (
          <Card key={camera.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{camera.location}</CardTitle>
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
                  src={camera.stream_url}
                  title={`Live Stream - ${camera.location}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onLoad={() => handleIframeLoad(camera.id)}
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">{capitalize(camera.status)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
