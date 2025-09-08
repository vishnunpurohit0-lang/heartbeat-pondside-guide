import { useState } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const HeartBeAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(
    "Hi! I'm Heart BE, your personal heart health guide. Ask me about exercises that keep your heart healthy!"
  );

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would integrate with speech recognition API
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      // Here you would integrate with ElevenLabs TTS API
      speakMessage(currentMessage);
    }
  };

  const speakMessage = (message: string) => {
    // Placeholder for ElevenLabs integration
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  const exerciseRecommendations = [
    "Try 30 minutes of brisk walking daily",
    "Swimming is excellent for cardiovascular health",
    "Cycling helps strengthen your heart muscle",
    "Yoga improves circulation and reduces stress",
    "Dancing is a fun way to boost heart health"
  ];

  const getRandomExercise = () => {
    const randomExercise = exerciseRecommendations[
      Math.floor(Math.random() * exerciseRecommendations.length)
    ];
    setCurrentMessage(randomExercise);
    speakMessage(randomExercise);
  };

  return (
    <Card className="p-8 bg-gradient-heart border-heart-red/20 shadow-heart max-w-2xl mx-auto">
      <div className="text-center">
        <div className="relative mb-6">
          <div className={`w-24 h-24 mx-auto rounded-full bg-heart-red flex items-center justify-center mb-4 transition-bounce ${
            isSpeaking ? "animate-pulse-heart scale-110" : ""
          }`}>
            <span className="text-white text-3xl font-bold">HB</span>
          </div>
          {isSpeaking && (
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-heart-red animate-ping opacity-75"></div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-heart-red mb-2">Heart BE</h2>
        <p className="text-medical-gray-dark mb-6">Your AI Heart Health Guide</p>

        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-6">
          <p className="text-foreground font-medium leading-relaxed">
            "{currentMessage}"
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <Button
            onClick={toggleListening}
            className={`p-4 rounded-full transition-smooth ${
              isListening 
                ? "bg-heart-red hover:bg-heart-red/90 text-white" 
                : "bg-white hover:bg-medical-gray text-heart-red border-2 border-heart-red"
            }`}
          >
            {isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </Button>

          <Button
            onClick={toggleSpeaking}
            className={`p-4 rounded-full transition-smooth ${
              isSpeaking 
                ? "bg-medical-blue hover:bg-medical-blue-dark text-white" 
                : "bg-white hover:bg-medical-gray text-medical-blue border-2 border-medical-blue"
            }`}
          >
            {isSpeaking ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
          </Button>
        </div>

        <Button
          onClick={getRandomExercise}
          className="bg-heart-red hover:bg-heart-red/90 text-white px-8 py-3 rounded-full font-semibold shadow-heart transition-smooth"
        >
          Get Exercise Recommendation
        </Button>
      </div>
    </Card>
  );
};