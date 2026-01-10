import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement_type: string;
  requirement_value: number;
  xp_reward: number;
}

interface UserAchievement {
  achievement_id: string;
  earned_at: string;
}

export function useAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      const { data: allAchievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('requirement_value', { ascending: true });

      if (achievementsError) {
        console.error('Error fetching achievements:', achievementsError);
      } else {
        setAchievements(allAchievements || []);
      }

      if (user) {
        const { data: earned, error: earnedError } = await supabase
          .from('user_achievements')
          .select('achievement_id, earned_at')
          .eq('user_id', user.id);

        if (earnedError) {
          console.error('Error fetching user achievements:', earnedError);
        } else {
          setUserAchievements(earned || []);
        }
      }

      setLoading(false);
    };

    fetchAchievements();
  }, [user]);

  const unlockAchievement = async (achievementId: string) => {
    if (!user) return false;
    
    const alreadyEarned = userAchievements.some(a => a.achievement_id === achievementId);
    if (alreadyEarned) return false;

    const { error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: user.id,
        achievement_id: achievementId,
      });

    if (!error) {
      setUserAchievements([...userAchievements, {
        achievement_id: achievementId,
        earned_at: new Date().toISOString(),
      }]);
      return true;
    }
    return false;
  };

  const isUnlocked = (achievementId: string) => {
    return userAchievements.some(a => a.achievement_id === achievementId);
  };

  const getProgress = (achievement: Achievement, stats: { 
    totalStudyTime?: number; 
    streak?: number; 
    challengesCompleted?: number;
    groupsJoined?: number;
    messagesSent?: number;
  }) => {
    switch (achievement.requirement_type) {
      case 'time':
        return Math.min((stats.totalStudyTime || 0) / achievement.requirement_value * 100, 100);
      case 'streak':
        return Math.min((stats.streak || 0) / achievement.requirement_value * 100, 100);
      case 'challenges':
        return Math.min((stats.challengesCompleted || 0) / achievement.requirement_value * 100, 100);
      case 'groups':
        return Math.min((stats.groupsJoined || 0) / achievement.requirement_value * 100, 100);
      case 'messages':
        return Math.min((stats.messagesSent || 0) / achievement.requirement_value * 100, 100);
      case 'sessions':
        return 0; // Would need session count
      default:
        return 0;
    }
  };

  const totalXP = userAchievements.reduce((sum, ua) => {
    const achievement = achievements.find(a => a.id === ua.achievement_id);
    return sum + (achievement?.xp_reward || 0);
  }, 0);

  return { 
    achievements, 
    userAchievements, 
    loading, 
    unlockAchievement, 
    isUnlocked, 
    getProgress,
    totalXP,
    earnedCount: userAchievements.length,
    totalCount: achievements.length,
  };
}