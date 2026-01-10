-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_achievements table to track earned achievements
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create user_streaks table
CREATE TABLE public.user_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_study_date DATE,
  total_study_days INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

-- Achievements are readable by everyone
CREATE POLICY "Achievements are viewable by everyone" 
ON public.achievements FOR SELECT USING (true);

-- User achievements policies
CREATE POLICY "Users can view their own achievements" 
ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User streaks policies
CREATE POLICY "Users can view their own streaks" 
ON public.user_streaks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaks" 
ON public.user_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" 
ON public.user_streaks FOR UPDATE USING (auth.uid() = user_id);

-- Trigger for updated_at on user_streaks
CREATE TRIGGER update_user_streaks_updated_at
BEFORE UPDATE ON public.user_streaks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed achievements data
INSERT INTO public.achievements (name, description, icon, category, requirement_type, requirement_value, xp_reward) VALUES
('First Steps', 'Complete your first study session', 'baby', 'study', 'sessions', 1, 50),
('Dedicated Learner', 'Study for 1 hour total', 'clock', 'study', 'time', 3600, 100),
('Knowledge Seeker', 'Study for 10 hours total', 'book-open', 'study', 'time', 36000, 250),
('Study Master', 'Study for 50 hours total', 'graduation-cap', 'study', 'time', 180000, 500),
('Consistency King', 'Maintain a 7-day streak', 'flame', 'streak', 'streak', 7, 200),
('Unstoppable', 'Maintain a 30-day streak', 'zap', 'streak', 'streak', 30, 500),
('Century Club', 'Maintain a 100-day streak', 'crown', 'streak', 'streak', 100, 1000),
('Problem Solver', 'Complete 5 coding challenges', 'code', 'challenges', 'challenges', 5, 150),
('Code Warrior', 'Complete 25 coding challenges', 'sword', 'challenges', 'challenges', 25, 400),
('Algorithm Expert', 'Complete 100 coding challenges', 'trophy', 'challenges', 'challenges', 100, 1000),
('Social Butterfly', 'Join 3 study groups', 'users', 'social', 'groups', 3, 100),
('Team Player', 'Send 50 messages in groups', 'message-circle', 'social', 'messages', 50, 150),
('Early Bird', 'Study before 7 AM', 'sunrise', 'special', 'early_study', 1, 75),
('Night Owl', 'Study after 11 PM', 'moon', 'special', 'late_study', 1, 75),
('Weekend Warrior', 'Study on both Saturday and Sunday', 'calendar', 'special', 'weekend_study', 1, 100);