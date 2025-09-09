import { useState, useEffect } from "react";
import { Dumbbell, Target, Timer, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Workout {
  id: string;
  name: string;
  duration: number;
  difficulty: "Easy" | "Moderate" | "Hard";
  category: string;
  exercises: string[];
  calories: number;
  heartRateZone: string;
}

export const PersonalizedWorkouts = () => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fitnessLevel: "moderate",
    preferredDuration: 30,
    healthGoals: ["cardiovascular", "weight-loss"]
  });
  
  const { toast } = useToast();

  const sampleWorkouts: Workout[] = [
    {
      id: "1",
      name: "Cardio Blast",
      duration: 25,
      difficulty: "Moderate",
      category: "Cardiovascular",
      exercises: ["Jumping Jacks", "High Knees", "Burpees", "Mountain Climbers"],
      calories: 200,
      heartRateZone: "Zone 3-4"
    },
    {
      id: "2",
      name: "Heart Healthy Walk",
      duration: 45,
      difficulty: "Easy",
      category: "Low Impact",
      exercises: ["Brisk Walking", "Arm Swings", "Gentle Stretching"],
      calories: 150,
      heartRateZone: "Zone 2-3"
    },
    {
      id: "3",
      name: "HIIT Power",
      duration: 20,
      difficulty: "Hard",
      category: "High Intensity",
      exercises: ["Sprint Intervals", "Squat Jumps", "Push-ups", "Plank Hold"],
      calories: 300,
      heartRateZone: "Zone 4-5"
    }
  ];

  const generatePersonalizedWorkout = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const workout = sampleWorkouts[Math.floor(Math.random() * sampleWorkouts.length)];
    setCurrentWorkout(workout);
    setIsGenerating(false);
    
    toast({
      title: "Workout Generated!",
      description: `Perfect ${workout.difficulty.toLowerCase()} workout for your heart health`,
    });
  };

  const startWorkout = (workout: Workout) => {
    setWorkoutHistory(prev => [workout, ...prev].slice(0, 5));
    toast({
      title: "Workout Started!",
      description: `Get ready for ${workout.name} - ${workout.duration} minutes`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-medical-green text-white";
      case "Moderate": return "bg-medical-blue text-white";
      case "Hard": return "bg-heart-red text-white";
      default: return "bg-medical-gray text-foreground";
    }
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-medical-blue/20 shadow-elegant">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-medical-blue" />
            <h3 className="text-xl font-bold text-medical-blue">AI Personalized Workouts</h3>
          </div>
          <Badge className="bg-gradient-primary text-white">
            <Zap className="h-3 w-3 mr-1" />
            Smart AI
          </Badge>
        </div>

        {/* User Profile Summary */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-heart-red" />
            Your Profile
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-medium">Fitness Level</p>
              <Badge className="mt-1 bg-medical-blue text-white">Moderate</Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Preferred Duration</p>
              <p className="text-lg font-bold text-heart-red">30 min</p>
            </div>
            <div>
              <p className="text-sm font-medium">Weekly Goal</p>
              <p className="text-lg font-bold text-medical-green">5 workouts</p>
            </div>
          </div>
        </div>

        {/* Generate New Workout */}
        <div className="text-center">
          <Button
            onClick={generatePersonalizedWorkout}
            disabled={isGenerating}
            className="bg-gradient-primary hover:opacity-90 text-white px-8 py-3 rounded-full font-semibold shadow-elegant transition-smooth"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Generate AI Workout
              </>
            )}
          </Button>
        </div>

        {/* Current Workout */}
        {currentWorkout && (
          <div className="bg-white rounded-xl p-6 border border-medical-blue/20 shadow-heart">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-heart-red">{currentWorkout.name}</h4>
              <Badge className={getDifficultyColor(currentWorkout.difficulty)}>
                {currentWorkout.difficulty}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-medical-blue" />
                <span className="font-medium">{currentWorkout.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-heart-red" />
                <span className="font-medium">{currentWorkout.calories} calories</span>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold mb-2">Exercises:</h5>
              <div className="flex flex-wrap gap-2">
                {currentWorkout.exercises.map((exercise, index) => (
                  <Badge key={index} variant="outline" className="border-medical-blue text-medical-blue">
                    {exercise}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-medical-gray-dark">
                <strong>Target Heart Rate:</strong> {currentWorkout.heartRateZone}
              </p>
            </div>

            <Button
              onClick={() => startWorkout(currentWorkout)}
              className="w-full bg-heart-red hover:bg-heart-red/90 text-white font-semibold py-3 rounded-full transition-smooth"
            >
              Start Workout
            </Button>
          </div>
        )}

        {/* Workout History */}
        {workoutHistory.length > 0 && (
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-medical-gold" />
              Recent Workouts
            </h4>
            <div className="space-y-2">
              {workoutHistory.map((workout, index) => (
                <div key={`${workout.id}-${index}`} className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                  <div>
                    <p className="font-medium">{workout.name}</p>
                    <p className="text-sm text-medical-gray-dark">{workout.duration} min • {workout.calories} cal</p>
                  </div>
                  <Badge className={getDifficultyColor(workout.difficulty)}>
                    {workout.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};