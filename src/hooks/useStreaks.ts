import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalStudyDays: number;
}

export function useStreaks() {
  const { user } = useAuth();
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    totalStudyDays: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchStreaks = async () => {
      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching streaks:', error);
      }
      
      if (data) {
        setStreakData({
          currentStreak: data.current_streak,
          longestStreak: data.longest_streak,
          lastStudyDate: data.last_study_date,
          totalStudyDays: data.total_study_days,
        });
      }
      setLoading(false);
    };
    
    fetchStreaks();
  }, [user]);

  const updateStreak = async () => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    let newStreak = 1;
    let newLongest = streakData.longestStreak;
    let newTotalDays = streakData.totalStudyDays;
    
    if (streakData.lastStudyDate === today) {
      // Already studied today
      return;
    } else if (streakData.lastStudyDate === yesterday) {
      // Continuing streak
      newStreak = streakData.currentStreak + 1;
      newTotalDays = streakData.totalStudyDays + 1;
    } else if (streakData.lastStudyDate) {
      // Streak broken, starting fresh
      newStreak = 1;
      newTotalDays = streakData.totalStudyDays + 1;
    } else {
      // First time studying
      newTotalDays = 1;
    }
    
    if (newStreak > newLongest) {
      newLongest = newStreak;
    }
    
    const { error } = await supabase
      .from('user_streaks')
      .upsert({
        user_id: user.id,
        current_streak: newStreak,
        longest_streak: newLongest,
        last_study_date: today,
        total_study_days: newTotalDays,
      }, { onConflict: 'user_id' });
    
    if (!error) {
      setStreakData({
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastStudyDate: today,
        totalStudyDays: newTotalDays,
      });
    }
  };

  return { streakData, loading, updateStreak };
}