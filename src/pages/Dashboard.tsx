import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, Trophy, Clock, Target, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const stats = [
    { icon: BookOpen, label: "Courses Enrolled", value: 3, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Code, label: "Challenges Completed", value: 12, color: "text-green-500", bg: "bg-green-500/10" },
    { icon: Trophy, label: "Achievements", value: 5, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Clock, label: "Hours Learning", value: 24, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const recentCourses = [
    { title: "Python for Beginners", progress: 65, language: "Python" },
    { title: "JavaScript Fundamentals", progress: 30, language: "JavaScript" },
    { title: "React Essentials", progress: 10, language: "React" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.user_metadata?.full_name || "Learner"}!
            </h1>
            <p className="text-muted-foreground">Continue your learning journey</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Continue Learning */}
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{course.title}</h3>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
              <Button asChild className="w-full mt-4">
                <Link to="/courses">View All Courses</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Daily Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Daily Goals
              </CardTitle>
              <CardDescription>Track your daily progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span>Complete 1 lesson</span>
                  <span className="text-green-500">✓</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span>Solve 2 challenges</span>
                  <span className="text-muted-foreground">1/2</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span>Study for 30 minutes</span>
                  <span className="text-muted-foreground">20/30 min</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/challenges">Practice Challenges</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
