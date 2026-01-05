import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, Users, Timer, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const quickActions = [
    { icon: BookOpen, label: "Continue Learning", href: "/courses", color: "text-blue-500" },
    { icon: Code, label: "Practice Coding", href: "/challenges", color: "text-green-500" },
    { icon: Users, label: "Study Groups", href: "/groups", color: "text-purple-500" },
    { icon: Timer, label: "Start Timer", href: "/profile", color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" asChild>
              <Link to={action.href}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <action.icon className={`h-8 w-8 mb-2 ${action.color}`} />
                  <span className="text-sm font-medium text-center">{action.label}</span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Streak</CardTitle>
              <CardDescription>Keep it going!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">0 days</div>
              <p className="text-sm text-muted-foreground mt-1">Start studying to build your streak</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Study Time</CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">0h 0m</div>
              <Progress value={0} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">Goal: 10 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Challenges Completed</CardTitle>
              <CardDescription>All time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">0</div>
              <p className="text-sm text-muted-foreground mt-1">Start solving challenges!</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/courses">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No courses started yet.</p>
              <Button className="mt-4" asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
