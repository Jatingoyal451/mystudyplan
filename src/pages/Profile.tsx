import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatStudyTime } from '@/lib/utils';
import { LogOut } from 'lucide-react';

export default function Profile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('*').eq('user_id', user.id).single()
        .then(({ data }) => setProfile(data));
    }
  }, [user]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">{profile?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{profile?.username || 'User'}</CardTitle>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{formatStudyTime(profile?.total_study_time || 0)}</p>
              <p className="text-sm text-muted-foreground">Total Study Time</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Courses Completed</p>
            </div>
          </div>
          <Button variant="destructive" onClick={signOut} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
