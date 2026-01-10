import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Timer, Trophy, Target, TrendingUp } from 'lucide-react';
import { formatTime, formatStudyTime } from '@/lib/utils';

export default function Dashboard() {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);

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
    }
  };

  const resetTimer = () => { setSeconds(0); setIsRunning(false); setSessionId(null); };

  const dailyGoal = 3600;
  const progress = Math.min((seconds / dailyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back!</h1>
      
      <Card className="glass-card">
        <CardHeader><CardTitle className="flex items-center gap-2"><Timer className="h-5 w-5" />Study Timer</CardTitle></CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-mono font-bold text-gradient">{formatTime(seconds)}</div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground">Daily Goal: {formatStudyTime(dailyGoal)}</p>
          <div className="flex justify-center gap-4">
            {!isRunning ? (
              <Button size="lg" onClick={startTimer}><Play className="mr-2 h-5 w-5" />Start</Button>
            ) : (
              <Button size="lg" variant="secondary" onClick={pauseTimer}><Pause className="mr-2 h-5 w-5" />Pause</Button>
            )}
            <Button size="lg" variant="outline" onClick={resetTimer}><RotateCcw className="mr-2 h-5 w-5" />Reset</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="pt-6 text-center">
          <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
          <p className="text-2xl font-bold">{formatStudyTime(totalStudyTime)}</p>
          <p className="text-sm text-muted-foreground">Total Study Time</p>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <Target className="h-8 w-8 mx-auto text-primary mb-2" />
          <p className="text-2xl font-bold">{Math.round(progress)}%</p>
          <p className="text-sm text-muted-foreground">Daily Goal</p>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-muted-foreground">Day Streak</p>
        </CardContent></Card>
      </div>
    </div>
  );
}
