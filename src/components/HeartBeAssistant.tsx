import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export const HeartBeAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(
    "Hi! I'm Heart BE, your personal heart health guide. Ask me about exercises that keep your heart healthy!"
  );
  const [apiKey, setApiKey] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleUserInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Could not understand audio. Please try again.",
          variant: "destructive",
        });
      };
    }
  }, []);

  const saveApiKey = () => {
    localStorage.setItem("openai_api_key", apiKey);
    setIsSettingsOpen(false);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved locally.",
    });
  };

  const generateAIResponse = async (userInput: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenAI API key in settings.",
        variant: "destructive",
      });
      return "Please set up your OpenAI API key in the settings to use AI responses.";
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are HEART BE, a kind and supportive AI assistant that provides general, friendly information related to heart health and exercises. You do not provide medical advice or diagnoses. Always remind users to consult healthcare professionals for specific concerns. Keep responses concise and encouraging.'
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      toast({
        title: "AI Response Error",
        description: "Could not generate AI response. Please check your API key.",
        variant: "destructive",
      });
      return "I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleUserInput = async (input: string) => {
    const response = await generateAIResponse(input);
    setCurrentMessage(response);
    speakMessage(response);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Speak now, I'm listening!",
      });
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
    } else {
      speakMessage(currentMessage);
    }
  };

  const speakMessage = (message: string) => {
    if (!synthRef.current) {
      toast({
        title: "Speech Unavailable",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive",
      });
      return;
    }

    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const exerciseRecommendations = [
    "Try 30 minutes of brisk walking daily - it's great for your heart!",
    "Swimming is excellent for cardiovascular health and gentle on joints.",
    "Cycling helps strengthen your heart muscle while being fun and engaging.",
    "Yoga improves circulation and reduces stress, supporting heart health.",
    "Dancing is a fun way to boost heart health while enjoying music!"
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
          {isListening && (
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-medical-blue animate-pulse opacity-75"></div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-heart-red">Heart BE</h2>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <Settings className="h-4 w-4 text-medical-gray-dark" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-key">OpenAI API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenAI API key"
                  />
                  <p className="text-sm text-medical-gray-dark mt-2">
                    Your API key is stored locally and never shared.
                  </p>
                </div>
                <Button onClick={saveApiKey} className="w-full">
                  Save API Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-medical-gray-dark mb-6">Your AI Heart Health Guide</p>

        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-6">
          <p className="text-foreground font-medium leading-relaxed">
            "{currentMessage}"
          </p>
          {transcript && (
            <p className="text-sm text-medical-blue mt-2 italic">
              You said: "{transcript}"
            </p>
          )}
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