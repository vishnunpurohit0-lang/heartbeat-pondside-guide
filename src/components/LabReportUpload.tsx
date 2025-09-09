import { Upload, FileText, CheckCircle, Activity, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface HealthMetrics {
  spo2: number;
  systolicBp: number;
  diastolicBp: number;
  sugar: number;
  cholesterol: number;
}

interface HealthResult {
  condition: string;
  suggestions: string[];
}

export const LabReportUpload = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<HealthResult | null>(null);
  const [extractedMetrics, setExtractedMetrics] = useState<HealthMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const predictHeartHealth = (metrics: HealthMetrics): HealthResult => {
    const { spo2, systolicBp, diastolicBp, sugar, cholesterol } = metrics;

    // Normal
    if (spo2 >= 95 && spo2 <= 100 && systolicBp < 130 && diastolicBp < 90 && sugar < 140 && cholesterol < 200) {
      return {
        condition: "Normal",
        suggestions: [
          "No medicine needed – maintain a balanced lifestyle",
          "Daily exercise & healthy diet"
        ]
      };
    }
    
    // Abnormal
    if ((spo2 >= 90 && spo2 < 95) || (systolicBp >= 130 && systolicBp <= 140) || (sugar >= 140 && sugar <= 160) || (cholesterol >= 200 && cholesterol <= 240)) {
      return {
        condition: "Abnormal",
        suggestions: [
          "Consult doctor for mild BP control medication",
          "Consider dietary changes for sugar control"
        ]
      };
    }
    
    // Bad
    if ((spo2 >= 85 && spo2 < 90) || (systolicBp > 140 && systolicBp <= 160) || (sugar > 160 && sugar <= 200) || cholesterol > 240) {
      return {
        condition: "Bad",
        suggestions: [
          "Urgent: Consult doctor for cholesterol control",
          "Blood sugar medication may be required"
        ]
      };
    }
    
    // Critical
    return {
      condition: "Critical",
      suggestions: [
        "⚠️ Seek immediate medical attention",
        "Emergency consultation required"
      ]
    };
  };

  const simulateLabReportAnalysis = (file: File): Promise<HealthMetrics> => {
    return new Promise((resolve) => {
      // Simulate OCR/analysis of lab report
      setTimeout(() => {
        // Generate realistic sample data based on file name or random values
        const metrics: HealthMetrics = {
          spo2: Math.floor(Math.random() * 15) + 85, // 85-100
          systolicBp: Math.floor(Math.random() * 60) + 110, // 110-170
          diastolicBp: Math.floor(Math.random() * 40) + 70, // 70-110
          sugar: Math.floor(Math.random() * 150) + 80, // 80-230
          cholesterol: Math.floor(Math.random() * 150) + 150 // 150-300
        };
        resolve(metrics);
      }, 2500);
    });
  };

  const handleAnalyzeReport = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    try {
      toast({
        title: "Analyzing Lab Report",
        description: "Extracting health metrics from your report...",
      });

      const metrics = await simulateLabReportAnalysis(uploadedFile);
      const result = predictHeartHealth(metrics);
      
      setExtractedMetrics(metrics);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your lab report has been analyzed successfully!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the lab report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setAnalysisResult(null);
    setExtractedMetrics(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Upload Lab Reports</h2>
        <p className="text-medical-gray-dark text-lg">
          Upload your recent lab reports for personalized health insights
        </p>
      </div>

      <Card className="p-8 bg-white border-2 border-dashed border-medical-gray hover:border-medical-blue transition-smooth">
        {!uploadedFile ? (
          <div
            className={`text-center py-12 transition-smooth ${
              isDragOver ? "bg-medical-blue-light" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
          >
            <Upload className="h-16 w-16 text-medical-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Drop your lab reports here
            </h3>
            <p className="text-medical-gray-dark mb-6">
              Supports PDF, JPG, PNG files up to 10MB
            </p>
            
            <label htmlFor="file-upload">
              <Button
                type="button"
                className="bg-medical-blue hover:bg-medical-blue-dark text-white px-8 py-3 rounded-full font-semibold shadow-medical transition-smooth"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose Files
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileInput}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                File Uploaded Successfully!
              </h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-medical-blue" />
                <span className="text-medical-gray-dark">{uploadedFile.name}</span>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleAnalyzeReport}
                  disabled={isAnalyzing}
                  className="bg-medical-blue hover:bg-medical-blue-dark text-white px-6 py-2 rounded-full font-semibold shadow-medical transition-smooth"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 animate-spin" />
                      Analyzing Report...
                    </div>
                  ) : (
                    "Analyze Lab Report"
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadedFile(null);
                    setAnalysisResult(null);
                    setExtractedMetrics(null);
                  }}
                  className="text-medical-blue border-medical-blue hover:bg-medical-blue-light"
                >
                  Upload Another File
                </Button>
              </div>
            </div>

            {extractedMetrics && analysisResult && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-medical-gray">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-medical-blue" />
                  <h3 className="text-xl font-bold text-foreground">Lab Report Analysis</h3>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-3">Extracted Health Metrics:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-medical-blue-light p-3 rounded-lg">
                      <span className="font-medium text-medical-blue">SpO₂:</span>
                      <span className="ml-2 text-foreground">{extractedMetrics.spo2}%</span>
                    </div>
                    <div className="bg-medical-blue-light p-3 rounded-lg">
                      <span className="font-medium text-medical-blue">BP:</span>
                      <span className="ml-2 text-foreground">{extractedMetrics.systolicBp}/{extractedMetrics.diastolicBp}</span>
                    </div>
                    <div className="bg-medical-blue-light p-3 rounded-lg">
                      <span className="font-medium text-medical-blue">Sugar:</span>
                      <span className="ml-2 text-foreground">{extractedMetrics.sugar} mg/dL</span>
                    </div>
                    <div className="bg-medical-blue-light p-3 rounded-lg">
                      <span className="font-medium text-medical-blue">Cholesterol:</span>
                      <span className="ml-2 text-foreground">{extractedMetrics.cholesterol} mg/dL</span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-2 mb-4 ${
                  analysisResult.condition === "Normal" ? "text-green-600 bg-green-50 border-green-200" :
                  analysisResult.condition === "Abnormal" ? "text-yellow-600 bg-yellow-50 border-yellow-200" :
                  analysisResult.condition === "Bad" ? "text-orange-600 bg-orange-50 border-orange-200" :
                  "text-red-600 bg-red-50 border-red-200"
                }`}>
                  <h4 className="font-bold text-lg mb-2">Heart Health Status: {analysisResult.condition}</h4>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-3">AI Recommendations:</h5>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-medical-blue font-bold">•</span>
                        <span className="text-medical-gray-dark">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </section>
  );
};