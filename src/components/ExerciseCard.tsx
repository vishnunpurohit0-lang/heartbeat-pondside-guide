import { Heart, Clock, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Exercise {
  id: number;
  name: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  benefits: string[];
}

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

export const ExerciseCard = ({ exercise, onClick }: ExerciseCardProps) => {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700", 
    Hard: "bg-red-100 text-red-700"
  };

  return (
    <Card 
      className="p-6 hover:shadow-heart cursor-pointer transition-smooth group bg-white border border-medical-gray hover:border-heart-red/20"
      onClick={() => onClick(exercise)}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-heart-red-light rounded-full group-hover:bg-heart-red/10 transition-smooth">
          <Heart className="h-6 w-6 text-heart-red" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-heart-red transition-smooth">
              {exercise.name}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[exercise.difficulty]}`}>
              {exercise.difficulty}
            </span>
          </div>
          
          <p className="text-medical-gray-dark mb-4">{exercise.description}</p>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2 text-sm text-medical-gray-dark">
              <Clock className="h-4 w-4" />
              {exercise.duration}
            </div>
            <div className="flex items-center gap-2 text-sm text-medical-gray-dark">
              <Target className="h-4 w-4" />
              Heart Health
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {exercise.benefits.slice(0, 2).map((benefit, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-medical-blue-light text-medical-blue text-sm rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};