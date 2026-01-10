import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users, Plus, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Groups() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [groups, setGroups] = useState<any[]>([]);
  const [myGroups, setMyGroups] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    fetchGroups();
    fetchMyGroups();
  }, [user]);

  const fetchGroups = async () => {
    const { data } = await supabase.from('groups').select('*').order('created_at', { ascending: false });
    if (data) setGroups(data);
  };

  const fetchMyGroups = async () => {
    if (!user) return;
    const { data } = await supabase.from('group_members').select('group_id').eq('user_id', user.id);
    if (data) setMyGroups(data.map((g) => g.group_id));
  };

  const createGroup = async () => {
    if (!user || !name.trim()) return;
    const { data, error } = await supabase.from('groups').insert({ name, description, created_by: user.id }).select().single();
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    if (data) {
      await supabase.from('group_members').insert({ group_id: data.id, user_id: user.id });
      setName(''); setDescription('');
      fetchGroups(); fetchMyGroups();
      toast({ title: 'Group created!' });
    }
  };

  const joinGroup = async (groupId: string) => {
    if (!user) return;
    const { error } = await supabase.from('group_members').insert({ group_id: groupId, user_id: user.id });
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    fetchMyGroups();
    toast({ title: 'Joined group!' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Study Groups</h1>
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Create Group</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create a Study Group</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><Label>Description</Label><Input value={description} onChange={(e) => setDescription(e.target.value)} /></div>
              <Button onClick={createGroup} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />{group.name}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{group.description || 'No description'}</p>
              {myGroups.includes(group.id) ? (
                <Link to={`/groups/${group.id}/chat`}><Button className="w-full"><MessageCircle className="mr-2 h-4 w-4" />Open Chat</Button></Link>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => joinGroup(group.id)}>Join Group</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
