import { useState } from "react";
import { Heart, Stethoscope, Activity } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { ExerciseCard } from "@/components/ExerciseCard";
import { LabReportUpload } from "@/components/LabReportUpload";
import { HeartBeAssistant } from "@/components/HeartBeAssistant";
import { HeartHealthChecker } from "@/components/HeartHealthChecker";
import { HeartRateMonitor } from "@/components/HeartRateMonitor";
import { PersonalizedWorkouts } from "@/components/PersonalizedWorkouts";
import { HealthAchievements } from "@/components/HealthAchievements";
import { EmergencyAlert } from "@/components/EmergencyAlert";
import heroImage from "@/assets/heart-hero.jpg";

interface Exercise {
  id: number;
  name: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  benefits: string[];
}

const heartExercises: Exercise[] = [
  {
    id: 1,
    name: "Brisk Walking",
    description: "A simple yet effective cardiovascular exercise that strengthens the heart muscle",
    duration: "30-45 min",
    difficulty: "Easy",
    benefits: ["Improves circulation", "Lowers blood pressure", "Reduces stress"]
  },
  {
    id: 2,
    name: "Swimming",
    description: "Full-body workout that's gentle on joints while providing excellent cardiovascular benefits",
    duration: "20-30 min", 
    difficulty: "Medium",
    benefits: ["Strengthens heart", "Improves endurance", "Low impact"]
  },
  {
    id: 3,
    name: "Cycling",
    description: "Great aerobic exercise that builds heart strength and improves overall fitness",
    duration: "30-60 min",
    difficulty: "Medium", 
    benefits: ["Boosts heart rate", "Burns calories", "Builds leg strength"]
  },
  {
    id: 4,
    name: "Yoga",
    description: "Combines movement, breathing, and meditation for heart health and stress reduction",
    duration: "45-60 min",
    difficulty: "Easy",
    benefits: ["Reduces stress", "Improves flexibility", "Lowers heart rate"]
  },
  {
    id: 5,
    name: "Dancing",
    description: "Fun cardiovascular activity that gets your heart pumping while you enjoy music",
    duration: "30-45 min", 
    difficulty: "Easy",
    benefits: ["Cardiovascular fitness", "Coordination", "Mood booster"]
  },
  {
    id: 6,
    name: "Interval Training",
    description: "High-intensity bursts followed by rest periods for maximum heart health benefits",
    duration: "15-25 min",
    difficulty: "Hard", 
    benefits: ["Improves VO2 max", "Burns fat", "Strengthens heart"]
  }
];

const Index = () => {
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(heartExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredExercises(heartExercises);
      return;
    }

    const filtered = heartExercises.filter(exercise =>
      exercise.name.toLowerCase().includes(query.toLowerCase()) ||
      exercise.description.toLowerCase().includes(query.toLowerCase()) ||
      exercise.benefits.some(benefit => 
        benefit.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredExercises(filtered);
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="medical-gradient medical-section relative overflow-hidden">
        <div className="medical-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 bg-heart-red rounded-full animate-pulse-heart">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold text-foreground">
                  HEART BEAT
                </h1>
              </div>
              
              <div className="mb-8">
                <p className="text-sm text-medical-gray-dark uppercase tracking-wider mb-2">
                  Down That Left Side in Small Pond Side
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-heart-red mb-6">
                  HEART HEALTH
                </h2>
                <p className="text-xl text-medical-gray-dark leading-relaxed max-w-lg">
                  Your comprehensive platform for cardiovascular wellness, exercise guidance, 
                  and AI-powered health insights
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
                  <Stethoscope className="h-5 w-5 text-medical-blue" />
                  <span className="text-medical-gray-dark font-medium">Professional Care</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
                  <Activity className="h-5 w-5 text-heart-red" />
                  <span className="text-medical-gray-dark font-medium">AI-Powered</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Heart health and medical care illustration" 
                className="w-full h-auto rounded-2xl shadow-heart animate-float"
              />
              <div className="absolute inset-0 bg-gradient-medical opacity-20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="medical-section bg-white">
        <div className="medical-container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Find Heart-Healthy Exercises
          </h2>
          <p className="text-medical-gray-dark text-lg mb-12 max-w-2xl mx-auto">
            Search through our comprehensive database of cardiovascular exercises 
            designed to keep your heart strong and healthy
          </p>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Exercises Grid */}
      <section className="bg-medical-gray py-16">
        <div className="medical-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Recommended Heart Exercises
            </h2>
            <p className="text-medical-gray-dark text-lg">
              Choose from expert-recommended exercises to boost your cardiovascular health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onClick={handleExerciseClick}
              />
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-medical-gray-dark mx-auto mb-4 opacity-50" />
              <p className="text-xl text-medical-gray-dark">
                No exercises found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </section>

      <main className="medical-container">
        {/* Innovative Health Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <HeartRateMonitor />
          <PersonalizedWorkouts />
        </div>

        {/* AI Assistant and Lab Upload Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <HeartBeAssistant />
          <LabReportUpload />
        </div>

        {/* Emergency Alert System */}
        <div className="mb-16">
          <EmergencyAlert />
        </div>

        {/* Health Achievements */}
        <div className="mb-16">
          <HealthAchievements />
        </div>

        {/* Heart Health Checker */}
        <div className="mb-16">
          <HeartHealthChecker />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="medical-container text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 bg-heart-red rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HEART BEAT</span>
          </div>
          <p className="text-gray-400 mb-4">
            Your trusted companion for cardiovascular health and wellness
          </p>
          <p className="text-gray-500 text-sm">
            Always consult with healthcare professionals for medical advice
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;