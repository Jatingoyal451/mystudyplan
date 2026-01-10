import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Timer, Trophy, Target, TrendingUp, Flame, Star, Zap } from 'lucide-react';
import { formatTime, formatStudyTime } from '@/lib/utils';
import { useStreaks } from '@/hooks/useStreaks';
import { useAchievements } from '@/hooks/useAchievements';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { streakData, updateStreak } = useStreaks();
  const { earnedCount, totalCount, totalXP } = useAchievements();

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('total_study_time').eq('user_id', user.id).single()
        .then(({ data }) => { if (data) setTotalStudyTime(data.total_study_time || 0); });
    }
  }, [user]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = async () => {
    if (!user) return;
    const { data } = await supabase.from('study_sessions').insert({ user_id: user.id }).select().single();
    if (data) setSessionId(data.id);
    setIsRunning(true);
  };

  const pauseTimer = async () => {
    setIsRunning(false);
    if (sessionId && user) {
      await supabase.from('study_sessions').update({ ended_at: new Date().toISOString(), duration_seconds: seconds }).eq('id', sessionId);
      await supabase.from('profiles').update({ total_study_time: totalStudyTime + seconds }).eq('user_id', user.id);
      setTotalStudyTime((t) => t + seconds);
      await updateStreak();
    }
  };

  const resetTimer = () => { setSeconds(0); setIsRunning(false); setSessionId(null); };

  const dailyGoal = 3600;
  const progress = Math.min((seconds / dailyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Flame className={`h-5 w-5 ${streakData.currentStreak > 0 ? 'text-warning flame-animation' : ''}`} />
          <span className="font-medium">{streakData.currentStreak} day streak</span>
        </div>
      </div>
      
      {/* Main Timer Card */}
      <Card className="glass-card glow-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            Study Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-7xl font-mono font-bold text-gradient">{formatTime(seconds)}</div>
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground">Daily Goal: {formatStudyTime(dailyGoal)} ({Math.round(progress)}% complete)</p>
          </div>
          <div className="flex justify-center gap-4">
            {!isRunning ? (
              <Button size="lg" className="gap-2 px-8" onClick={startTimer}>
                <Play className="h-5 w-5" />Start
              </Button>
            ) : (
              <Button size="lg" variant="secondary" className="gap-2 px-8" onClick={pauseTimer}>
                <Pause className="h-5 w-5" />Pause
              </Button>
            )}
            <Button size="lg" variant="outline" onClick={resetTimer}>
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatStudyTime(totalStudyTime)}</p>
                <p className="text-sm text-muted-foreground">Total Study Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Flame className="h-6 w-6 text-warning flame-animation" />
              </div>
              <div>
                <p className="text-2xl font-bold">{streakData.currentStreak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(progress)}%</p>
                <p className="text-sm text-muted-foreground">Daily Goal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Link to="/achievements">
          <Card className="glass-card hover:glow-primary transition-all cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{earnedCount}/{totalCount}</p>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
                <p className="text-xl font-bold">{streakData.longestStreak} days</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Study Days</p>
                <p className="text-xl font-bold">{streakData.totalStudyDays} days</p>
              </div>
              <Star className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total XP Earned</p>
                <p className="text-xl font-bold">{totalXP} XP</p>
              </div>
              <Trophy className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}