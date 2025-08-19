import React, { useState } from "react";
import {
  Trophy,
  Lock,
  Zap,
  BookOpen,
  Brain,
  CheckCircle2,
  Crown,
  Flame,
  Clock,
  Flame as StreakIcon,
  Award,
  Share2,
  Download,
} from "lucide-react";

/* ----------------- Local UI Components ----------------- */

// Card
const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white border rounded-xl shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`border-b p-4 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-bold ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// Button
const Button = ({ children, variant = "default", className = "", ...props }) => {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-100",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Progress
const Progress = ({ value = 0, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div
      className="bg-blue-600 h-2 rounded-full transition-all"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

// Badge
const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-600 ${className}`}
  >
    {children}
  </span>
);

/* ----------------- Mock Data ----------------- */
const mockAchievements = [
  {
    id: 1,
    title: "First Course Completed",
    description: "Completed your very first course",
    icon: BookOpen,
    earned: true,
    earnedDate: "2024-01-15",
    xpReward: 100,
  },
  {
    id: 2,
    title: "Speed Learner",
    description: "Completed 5 lessons in one day",
    icon: Zap,
    earned: true,
    earnedDate: "2024-01-20",
    xpReward: 250,
  },
  {
    id: 3,
    title: "Knowledge Master",
    description: "Scored 100% on 10 quizzes",
    icon: Brain,
    earned: true,
    earnedDate: "2024-02-01",
    xpReward: 500,
  },
  {
    id: 4,
    title: "Dedication Champion",
    description: "Maintained a 30-day streak",
    icon: Flame,
    earned: false,
    progress: 15,
    total: 30,
    xpReward: 750,
  },
  {
    id: 5,
    title: "Perfect Student",
    description: "Complete 25 quizzes with perfect scores",
    icon: Crown,
    earned: false,
    progress: 10,
    total: 25,
    xpReward: 1500,
  },
];

const leaderboard = [
  { name: "Sarah Chen", xp: 4250 },
  { name: "Mike Rodriguez", xp: 3890 },
  { name: "Alex Johnson", xp: 2847, you: true },
  { name: "Emma Davis", xp: 2654 },
  { name: "Chris Wilson", xp: 2341 },
];

/* ----------------- Achievement Card ----------------- */
const AchievementCard = ({ achievement, onClick }) => {
  const IconComponent = achievement.icon;
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        achievement.earned ? "border-blue-500" : "opacity-60"
      }`}
      onClick={() => onClick(achievement)}
    >
      <CardContent className="text-center">
        <div
          className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
            achievement.earned ? "bg-blue-100" : "bg-gray-200"
          }`}
        >
          {achievement.earned ? (
            <IconComponent className="w-8 h-8 text-blue-600" />
          ) : (
            <Lock className="w-8 h-8 text-gray-400" />
          )}
        </div>

        <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{achievement.description}</p>

        {achievement.earned ? (
          <>
            <Badge>Earned {achievement.earnedDate}</Badge>
            <div className="text-blue-600 font-semibold">
              +{achievement.xpReward} XP
            </div>
          </>
        ) : (
          <>
            {achievement.progress !== undefined && (
              <>
                <Progress
                  value={(achievement.progress / achievement.total) * 100}
                  className="mb-1"
                />
                <div className="text-sm text-gray-500">
                  {achievement.progress}/{achievement.total}
                </div>
              </>
            )}
            <div className="text-gray-500">
              Reward: {achievement.xpReward} XP
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

/* ----------------- Main Page ----------------- */
const Achievement = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 space-y-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Your Achievement Dashboard
        </h1>
        <p className="text-gray-500">
          Track your learning journey and celebrate your progress!
        </p>
      </div>

      {/* Profile + Progress */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4 p-6">
          <img
            src="https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-gray-500">Lifelong Learner</p>
            <Badge className="mt-2">Level 12</Badge>
          </div>
        </Card>

        <Card className="col-span-2 p-6">
          <CardTitle className="mb-2">Progress Overview</CardTitle>
          <Progress value={(2847 / 3000) * 100} className="mb-2" />
          <p className="text-sm text-gray-500 mb-4">153 XP to Level 13</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <StreakIcon className="w-6 h-6 mx-auto text-orange-500" />
              <p className="font-bold">15</p>
              <p className="text-sm text-gray-500">Day Streak</p>
            </div>
            <div>
              <Clock className="w-6 h-6 mx-auto text-blue-500" />
              <p className="font-bold">127h</p>
              <p className="text-sm text-gray-500">Total Hours</p>
            </div>
            <div>
              <Trophy className="w-6 h-6 mx-auto text-green-500" />
              <p className="font-bold">#3</p>
              <p className="text-sm text-gray-500">Global Rank</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leaderboard + Milestones */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard.map((user, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center p-2 rounded ${
                  user.you ? "bg-blue-50" : ""
                }`}
              >
                <span>
                  {idx + 1}. {user.name}
                </span>
                <span className="font-semibold">{user.xp} XP</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm mb-1">Next Level</p>
              <Progress value={(2847 / 3000) * 100} />
              <p className="text-xs text-gray-500">153 XP needed</p>
            </div>
            <div>
              <p className="text-sm mb-1">30-Day Streak</p>
              <Progress value={(15 / 30) * 100} />
              <p className="text-xs text-gray-500">15 days left</p>
            </div>
            <div>
              <p className="text-sm mb-1">Course Master</p>
              <Progress value={(3 / 10) * 100} />
              <p className="text-xs text-gray-500">7 courses left</p>
            </div>
            <div className="p-3 bg-blue-50 rounded text-center">
              <Award className="w-6 h-6 mx-auto text-blue-600" />
              <p className="text-sm mt-2">
                Complete 2 more lessons for a Gold Badge!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates */}
      <Card>
        <CardHeader>
          <CardTitle>Your Certificates</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">JavaScript Fundamentals</h3>
            <p className="text-sm text-gray-500">Issued on 1/30/2024</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-1 inline" /> PDF
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-1 inline" /> Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Achievements</h2>
        {/* Filters */}
        <div className="flex gap-3 mb-6">
          {["all", "earned", "locked"].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter[0].toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAchievements
            .filter((a) =>
              selectedFilter === "earned"
                ? a.earned
                : selectedFilter === "locked"
                ? !a.earned
                : true
            )
            .map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClick={setSelectedAchievement}
              />
            ))}
        </div>
      </div>

      {/* Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <selectedAchievement.icon className="w-6 h-6 text-blue-600" />
                {selectedAchievement.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                {selectedAchievement.description}
              </p>
              {selectedAchievement.earned ? (
                <div className="text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />
                  <p className="font-semibold text-green-600">
                    Achievement Unlocked!
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Lock className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="font-semibold">Locked</p>
                </div>
              )}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedAchievement(null)}
                >
                  Close
                </Button>
                <Badge>{selectedAchievement.xpReward} XP</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Achievement;
