import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

export default function GroupChat() {
  const { groupId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!groupId) return;
    fetchMessages();
    const channel = supabase.channel(`messages-${groupId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `group_id=eq.${groupId}` },
        (payload) => setMessages((m) => [...m, payload.new]))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [groupId]);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').eq('group_id', groupId).order('created_at');
    if (data) {
      setMessages(data);
      const userIds = [...new Set(data.map((m) => m.user_id))];
      const { data: profs } = await supabase.from('profiles').select('user_id, username').in('user_id', userIds);
      if (profs) setProfiles(Object.fromEntries(profs.map((p) => [p.user_id, p.username])));
    }
  };

  const sendMessage = async () => {
    if (!user || !newMessage.trim() || !groupId) return;
    await supabase.from('messages').insert({ group_id: groupId, user_id: user.id, content: newMessage });
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.user_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.user_id === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-xs font-medium mb-1">{profiles[msg.user_id] || 'User'}</p>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t flex gap-2">
          <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
          <Button onClick={sendMessage}><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
    </div>
  );
}
