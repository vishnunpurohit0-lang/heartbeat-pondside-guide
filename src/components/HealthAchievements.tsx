import { useState, useEffect } from "react";
import { Trophy, Award, Target, Flame, Heart, Star, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  category: "daily" | "weekly" | "milestone" | "streak";
  points: number;
}

export const HealthAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Heart Hero",
      description: "Complete 7 heart-healthy workouts",
      icon: "heart",
      progress: 3,
      maxProgress: 7,
      unlocked: false,
      category: "weekly",
      points: 100
    },
    {
      id: "2",
      title: "Daily Warrior",
      description: "Maintain a 5-day exercise streak",
      icon: "flame",
      progress: 5,
      maxProgress: 5,
      unlocked: true,
      category: "streak",
      points: 50
    },
    {
      id: "3",
      title: "Health Scanner",
      description: "Upload and analyze 3 lab reports",
      icon: "target",
      progress: 1,
      maxProgress: 3,
      unlocked: false,
      category: "milestone",
      points: 75
    },
    {
      id: "4",
      title: "AI Conversationalist",
      description: "Chat with Heart BE 10 times",
      icon: "star",
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      category: "milestone",
      points: 60
    },
    {
      id: "5",
      title: "Perfect Week",
      description: "Complete all daily health checks for a week",
      icon: "calendar",
      progress: 4,
      maxProgress: 7,
      unlocked: false,
      category: "weekly",
      points: 150
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(250);
  const [currentStreak, setCurrentStreak] = useState(5);
  const [level, setLevel] = useState(2);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "heart": return <Heart className="h-6 w-6" />;
      case "flame": return <Flame className="h-6 w-6" />;
      case "target": return <Target className="h-6 w-6" />;
      case "star": return <Star className="h-6 w-6" />;
      case "calendar": return <Calendar className="h-6 w-6" />;
      default: return <Award className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "daily": return "bg-medical-blue text-white";
      case "weekly": return "bg-heart-red text-white";
      case "milestone": return "bg-medical-gold text-white";
      case "streak": return "bg-medical-green text-white";
      default: return "bg-medical-gray text-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "daily": return <Calendar className="h-3 w-3" />;
      case "weekly": return <Target className="h-3 w-3" />;
      case "milestone": return <Trophy className="h-3 w-3" />;
      case "streak": return <Flame className="h-3 w-3" />;
      default: return <Award className="h-3 w-3" />;
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const inProgressAchievements = achievements.filter(a => !a.unlocked && a.progress > 0);
  const lockedAchievements = achievements.filter(a => !a.unlocked && a.progress === 0);

  return (
    <Card className="p-6 bg-gradient-subtle border-medical-gold/20 shadow-elegant">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-medical-gold" />
            <h3 className="text-xl font-bold text-medical-gold">Health Achievements</h3>
          </div>
          <Badge className="bg-gradient-primary text-white text-lg px-3 py-1">
            Level {level}
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-medical-gold" />
            </div>
            <p className="text-2xl font-bold text-medical-gold">{totalPoints}</p>
            <p className="text-sm text-medical-gray-dark">Total Points</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-5 w-5 text-heart-red animate-pulse-heart" />
            </div>
            <p className="text-2xl font-bold text-heart-red">{currentStreak}</p>
            <p className="text-sm text-medical-gray-dark">Day Streak</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-5 w-5 text-medical-blue" />
            </div>
            <p className="text-2xl font-bold text-medical-blue">{unlockedAchievements.length}</p>
            <p className="text-sm text-medical-gray-dark">Unlocked</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">Level Progress</p>
            <p className="text-sm text-medical-gray-dark">{totalPoints}/500 XP</p>
          </div>
          <Progress value={(totalPoints / 500) * 100} className="h-3" />
        </div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 text-medical-green flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Unlocked ({unlockedAchievements.length})
            </h4>
            <div className="grid gap-3">
              {unlockedAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-white rounded-lg p-4 border-l-4 border-medical-green shadow-heart">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-medical-green/10 rounded-full text-medical-green">
                        {getIcon(achievement.icon)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{achievement.title}</p>
                        <p className="text-sm text-medical-gray-dark">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getCategoryColor(achievement.category)}>
                        {getCategoryIcon(achievement.category)}
                        <span className="ml-1 capitalize">{achievement.category}</span>
                      </Badge>
                      <p className="text-sm font-bold text-medical-gold mt-1">+{achievement.points} XP</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Achievements */}
        {inProgressAchievements.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 text-medical-blue flex items-center gap-2">
              <Target className="h-4 w-4" />
              In Progress ({inProgressAchievements.length})
            </h4>
            <div className="grid gap-3">
              {inProgressAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-white/70 rounded-lg p-4 border-l-4 border-medical-blue">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-medical-blue/10 rounded-full text-medical-blue">
                        {getIcon(achievement.icon)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{achievement.title}</p>
                        <p className="text-sm text-medical-gray-dark">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getCategoryColor(achievement.category)}>
                        {getCategoryIcon(achievement.category)}
                        <span className="ml-1 capitalize">{achievement.category}</span>
                      </Badge>
                      <p className="text-sm font-bold text-medical-gold mt-1">{achievement.points} XP</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 text-medical-gray-dark flex items-center gap-2">
              <Award className="h-4 w-4" />
              Locked ({lockedAchievements.length})
            </h4>
            <div className="grid gap-3">
              {lockedAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-white/30 rounded-lg p-4 border-l-4 border-medical-gray opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-medical-gray/10 rounded-full text-medical-gray">
                        {getIcon(achievement.icon)}
                      </div>
                      <div>
                        <p className="font-semibold text-medical-gray-dark">{achievement.title}</p>
                        <p className="text-sm text-medical-gray">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-medical-gray text-white">
                        {getCategoryIcon(achievement.category)}
                        <span className="ml-1 capitalize">{achievement.category}</span>
                      </Badge>
                      <p className="text-sm font-bold text-medical-gray mt-1">{achievement.points} XP</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};