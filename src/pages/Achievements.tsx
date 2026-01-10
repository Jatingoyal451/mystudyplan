import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAchievements } from '@/hooks/useAchievements';
import { useStreaks } from '@/hooks/useStreaks';
import { 
  Trophy, Flame, Clock, BookOpen, Code, Users, 
  MessageCircle, Sunrise, Moon, Calendar, Crown,
  Zap, GraduationCap, Baby, Star, Lock
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'baby': <Baby className="h-6 w-6" />,
  'clock': <Clock className="h-6 w-6" />,
  'book-open': <BookOpen className="h-6 w-6" />,
  'graduation-cap': <GraduationCap className="h-6 w-6" />,
  'flame': <Flame className="h-6 w-6" />,
  'zap': <Zap className="h-6 w-6" />,
  'crown': <Crown className="h-6 w-6" />,
  'code': <Code className="h-6 w-6" />,
  'sword': <Star className="h-6 w-6" />,
  'trophy': <Trophy className="h-6 w-6" />,
  'users': <Users className="h-6 w-6" />,
  'message-circle': <MessageCircle className="h-6 w-6" />,
  'sunrise': <Sunrise className="h-6 w-6" />,
  'moon': <Moon className="h-6 w-6" />,
  'calendar': <Calendar className="h-6 w-6" />,
};

const categoryColors: Record<string, string> = {
  'study': 'from-blue-500 to-cyan-500',
  'streak': 'from-orange-500 to-red-500',
  'challenges': 'from-purple-500 to-pink-500',
  'social': 'from-green-500 to-emerald-500',
  'special': 'from-yellow-500 to-amber-500',
};

export default function Achievements() {
  const { achievements, isUnlocked, totalXP, earnedCount, totalCount, loading } = useAchievements();
  const { streakData } = useStreaks();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const categorizedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof achievements>);

  const categoryLabels: Record<string, string> = {
    'study': 'Study Time',
    'streak': 'Streaks',
    'challenges': 'Coding Challenges',
    'social': 'Community',
    'special': 'Special',
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            Achievements
          </h1>
          <p className="text-muted-foreground mt-1">Track your progress and earn rewards</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardContent className="pt-6 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{earnedCount}/{totalCount}</p>
            <p className="text-sm text-muted-foreground">Achievements Earned</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6 text-center">
            <div className="h-12 w-12 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-warning" />
            </div>
            <p className="text-2xl font-bold">{totalXP}</p>
            <p className="text-sm text-muted-foreground">Total XP Earned</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6 text-center">
            <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-3 flame-animation">
              <Flame className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-2xl font-bold">{streakData.currentStreak}</p>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6 text-center">
            <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-success" />
            </div>
            <p className="text-2xl font-bold">{streakData.totalStudyDays}</p>
            <p className="text-sm text-muted-foreground">Total Study Days</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(earnedCount / totalCount) * 100} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {earnedCount} of {totalCount} achievements unlocked ({Math.round((earnedCount / totalCount) * 100)}%)
          </p>
        </CardContent>
      </Card>

      {/* Achievements by Category */}
      {Object.entries(categorizedAchievements).map(([category, categoryAchievements]) => (
        <section key={category}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${categoryColors[category]}`}></span>
            {categoryLabels[category] || category}
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryAchievements.map((achievement) => {
              const unlocked = isUnlocked(achievement.id);
              
              return (
                <Card 
                  key={achievement.id} 
                  className={`glass-card transition-all relative overflow-hidden
                    ${unlocked ? 'border-primary/50 glow-primary' : 'opacity-70'}
                  `}
                >
                  {unlocked && (
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-2 right-[-20px] rotate-45 bg-primary text-primary-foreground text-xs px-6 py-0.5">
                        ✓
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`
                        h-14 w-14 rounded-xl flex items-center justify-center shrink-0
                        ${unlocked 
                          ? `bg-gradient-to-br ${categoryColors[category]} text-white` 
                          : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        {unlocked ? iconMap[achievement.icon] || <Trophy className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
                            +{achievement.xp_reward} XP
                          </span>
                          {unlocked && (
                            <span className="text-xs text-success">Unlocked</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}