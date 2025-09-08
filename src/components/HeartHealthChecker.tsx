import { useState } from "react";
import { Heart, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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

export const HeartHealthChecker = () => {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    spo2: 0,
    systolicBp: 0,
    diastolicBp: 0,
    sugar: 0,
    cholesterol: 0
  });
  
  const [result, setResult] = useState<HealthResult | null>(null);
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

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const healthResult = predictHeartHealth(metrics);
      setResult(healthResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const conditionColors = {
    Normal: "text-green-600 bg-green-50 border-green-200",
    Abnormal: "text-yellow-600 bg-yellow-50 border-yellow-200", 
    Bad: "text-orange-600 bg-orange-50 border-orange-200",
    Critical: "text-red-600 bg-red-50 border-red-200"
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-heart-red mb-4 filter blur-sm">Heart Health Assessment</h2>
        <p className="text-medical-gray-dark text-lg">
          Enter your vital signs for AI-powered health insights
        </p>
      </div>

      <Card className="p-8 bg-gradient-blur-red backdrop-blur-sm border-heart-red/20 shadow-heart">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="spo2" className="text-foreground font-medium mb-2 block">
                SpO₂ Level (%)
              </Label>
              <Input
                id="spo2"
                type="number"
                placeholder="95-100"
                value={metrics.spo2 || ""}
                onChange={(e) => setMetrics({ ...metrics, spo2: Number(e.target.value) })}
                className="h-12 bg-white/80 backdrop-blur-sm border-heart-red/20 focus:border-heart-red"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="systolic" className="text-foreground font-medium mb-2 block">
                  Systolic BP
                </Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder="120"
                  value={metrics.systolicBp || ""}
                  onChange={(e) => setMetrics({ ...metrics, systolicBp: Number(e.target.value) })}
                  className="h-12 bg-white/80 backdrop-blur-sm border-heart-red/20 focus:border-heart-red"
                />
              </div>
              <div>
                <Label htmlFor="diastolic" className="text-foreground font-medium mb-2 block">
                  Diastolic BP
                </Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder="80"
                  value={metrics.diastolicBp || ""}
                  onChange={(e) => setMetrics({ ...metrics, diastolicBp: Number(e.target.value) })}
                  className="h-12 bg-white/80 backdrop-blur-sm border-heart-red/20 focus:border-heart-red"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="sugar" className="text-foreground font-medium mb-2 block">
                Blood Sugar (mg/dL)
              </Label>
              <Input
                id="sugar"
                type="number"
                placeholder="70-100"
                value={metrics.sugar || ""}
                onChange={(e) => setMetrics({ ...metrics, sugar: Number(e.target.value) })}
                className="h-12 bg-white/80 backdrop-blur-sm border-heart-red/20 focus:border-heart-red"
              />
            </div>

            <div>
              <Label htmlFor="cholesterol" className="text-foreground font-medium mb-2 block">
                Cholesterol (mg/dL)
              </Label>
              <Input
                id="cholesterol"
                type="number"
                placeholder="< 200"
                value={metrics.cholesterol || ""}
                onChange={(e) => setMetrics({ ...metrics, cholesterol: Number(e.target.value) })}
                className="h-12 bg-white/80 backdrop-blur-sm border-heart-red/20 focus:border-heart-red"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-12 bg-heart-red hover:bg-heart-red/90 text-white font-semibold rounded-xl shadow-heart transition-smooth"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 animate-spin" />
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Analyze Heart Health
                </div>
              )}
            </Button>
          </div>

          {result && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-heart-red" />
                <h3 className="text-xl font-bold text-foreground">Health Assessment</h3>
              </div>

              <div className={`p-4 rounded-lg border-2 mb-4 ${conditionColors[result.condition as keyof typeof conditionColors]}`}>
                <h4 className="font-bold text-lg mb-2">Condition: {result.condition}</h4>
                <p className="text-sm">
                  SpO₂: {metrics.spo2}%, BP: {metrics.systolicBp}/{metrics.diastolicBp}, 
                  Sugar: {metrics.sugar}, Cholesterol: {metrics.cholesterol}
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-foreground mb-3">Recommendations:</h5>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-heart-red font-bold">•</span>
                      <span className="text-medical-gray-dark">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};