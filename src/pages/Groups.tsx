import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Lock, Unlock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Group {
  id: string;
  name: string;
  description: string | null;
  code: string | null;
  password: string | null;
  created_by: string;
  member_count?: number;
}

const Groups = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", description: "", password: "" });
  const [joinCode, setJoinCode] = useState("");
  const [joinPassword, setJoinPassword] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user]);

  const fetchGroups = async () => {
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch groups");
      return;
    }

    setGroups(data || []);
  };

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase
      .from("groups")
      .insert({
        name: newGroup.name,
        description: newGroup.description || null,
        password: newGroup.password || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to create group");
      return;
    }

    // Join the group as creator
    await supabase.from("group_members").insert({
      group_id: data.id,
      user_id: user.id,
    });

    toast.success("Group created successfully!");
    setShowCreateForm(false);
    setNewGroup({ name: "", description: "", password: "" });
    fetchGroups();
  };

  const joinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data: group, error: findError } = await supabase
      .from("groups")
      .select("*")
      .eq("code", joinCode)
      .single();

    if (findError || !group) {
      toast.error("Group not found");
      return;
    }

    if (group.password && group.password !== joinPassword) {
      toast.error("Incorrect password");
      return;
    }

    const { error: joinError } = await supabase.from("group_members").insert({
      group_id: group.id,
      user_id: user.id,
    });

    if (joinError) {
      if (joinError.code === "23505") {
        toast.error("You're already a member of this group");
      } else {
        toast.error("Failed to join group");
      }
      return;
    }

    toast.success("Joined group successfully!");
    setShowJoinForm(false);
    setJoinCode("");
    setJoinPassword("");
    fetchGroups();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Groups</h1>
            <p className="text-muted-foreground">Learn together with other students</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowJoinForm(!showJoinForm)}>
              Join Group
            </Button>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>
        </div>

        {/* Create Group Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Group</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={createGroup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name">Group Name</Label>
                  <Input
                    id="group-name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group-description">Description (optional)</Label>
                  <Input
                    id="group-description"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group-password">Password (optional)</Label>
                  <Input
                    id="group-password"
                    type="password"
                    value={newGroup.password}
                    onChange={(e) => setNewGroup({ ...newGroup, password: e.target.value })}
                    placeholder="Leave empty for public group"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Create Group</Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Join Group Form */}
        {showJoinForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Join a Group</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={joinGroup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="join-code">Group Code</Label>
                  <Input
                    id="join-code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-password">Password (if required)</Label>
                  <Input
                    id="join-password"
                    type="password"
                    value={joinPassword}
                    onChange={(e) => setJoinPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Join Group</Button>
                  <Button type="button" variant="outline" onClick={() => setShowJoinForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Groups List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  {group.password ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Unlock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <CardDescription>{group.description || "No description"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Group
                  </Badge>
                  {group.code && (
                    <span className="text-xs text-muted-foreground">Code: {group.code}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No groups yet. Create one to get started!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Groups;
