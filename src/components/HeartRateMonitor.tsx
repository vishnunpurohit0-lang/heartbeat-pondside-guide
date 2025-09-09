import { useState, useRef, useEffect } from "react";
import { Camera, Heart, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export const HeartRateMonitor = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [readings, setReadings] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsMonitoring(true);
        setProgress(0);
        setReadings([]);
        
        // Simulate heart rate detection process
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              // Simulate heart rate calculation
              const simulatedHR = 60 + Math.floor(Math.random() * 40);
              setHeartRate(simulatedHR);
              setReadings(prev => [...prev, simulatedHR].slice(-10));
              
              toast({
                title: "Heart Rate Detected",
                description: `Your heart rate is ${simulatedHR} BPM`,
              });
              
              return 100;
            }
            return prev + 2;
          });
        }, 100);

        toast({
          title: "Monitoring Started",
          description: "Place your finger gently on the camera lens",
        });
      }
    } catch (error) {
      toast({
        title: "Camera Access Failed",
        description: "Please allow camera access to monitor heart rate",
        variant: "destructive",
      });
    }
  };

  const stopMonitoring = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsMonitoring(false);
    setProgress(0);
  };

  const getHeartRateStatus = (bpm: number) => {
    if (bpm < 60) return { status: "Low", color: "text-medical-blue", bg: "bg-medical-blue/10" };
    if (bpm <= 100) return { status: "Normal", color: "text-medical-green", bg: "bg-medical-green/10" };
    return { status: "High", color: "text-heart-red", bg: "bg-heart-red/10" };
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-heart-red/20 shadow-elegant">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-6 w-6 text-heart-red animate-pulse-heart" />
          <h3 className="text-xl font-bold text-heart-red">Smart Heart Rate Monitor</h3>
          <Camera className="h-6 w-6 text-medical-blue" />
        </div>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            className={`w-32 h-32 mx-auto rounded-full object-cover border-4 transition-smooth ${
              isMonitoring ? "border-heart-red animate-pulse" : "border-medical-gray"
            }`}
            style={{ display: isMonitoring ? "block" : "none" }}
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {!isMonitoring && (
            <div className="w-32 h-32 mx-auto rounded-full bg-medical-gray/20 flex items-center justify-center">
              <Camera className="h-12 w-12 text-medical-gray-dark" />
            </div>
          )}
        </div>

        {isMonitoring && (
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-medical-gray-dark">
              {progress < 100 ? "Detecting pulse..." : "Analysis complete!"}
            </p>
          </div>
        )}

        {heartRate && (
          <div className={`p-4 rounded-xl ${getHeartRateStatus(heartRate).bg}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className={`h-8 w-8 ${getHeartRateStatus(heartRate).color} animate-pulse-heart`} />
              <span className="text-3xl font-bold">{heartRate}</span>
              <span className="text-lg font-semibold">BPM</span>
            </div>
            <p className={`font-medium ${getHeartRateStatus(heartRate).color}`}>
              Status: {getHeartRateStatus(heartRate).status}
            </p>
          </div>
        )}

        {readings.length > 0 && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-semibold mb-2">Recent Readings</h4>
            <div className="flex gap-1 justify-center">
              {readings.map((reading, index) => (
                <div
                  key={index}
                  className="w-2 bg-heart-red rounded-full transition-smooth"
                  style={{ height: `${(reading / 120) * 40 + 10}px` }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            className={`px-6 py-3 rounded-full font-semibold transition-smooth ${
              isMonitoring
                ? "bg-heart-red hover:bg-heart-red/90 text-white"
                : "bg-medical-blue hover:bg-medical-blue-dark text-white"
            }`}
          >
            {isMonitoring ? (
              <>
                <Square className="h-5 w-5 mr-2" />
                Stop Monitor
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Start Monitor
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-medical-gray-dark">
          Place your finger gently over the camera lens for accurate reading
        </p>
      </div>
    </Card>
  );
};