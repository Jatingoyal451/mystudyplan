import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Users, Timer, ArrowRight, Trophy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Learn Python, JavaScript, HTML, CSS, SQL, React, Node.js, and TypeScript with video lessons and exercises.",
    },
    {
      icon: Code,
      title: "Coding Challenges",
      description: "Practice with hundreds of coding challenges across multiple languages and difficulty levels.",
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Join or create study groups to learn together and stay motivated.",
    },
    {
      icon: Timer,
      title: "Study Timer",
      description: "Track your study sessions with Pomodoro timer and see your progress over time.",
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Earn badges and track your learning streaks to stay motivated.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Master Programming with
            <span className="text-primary"> MyStudyPlan</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn to code with interactive courses, practice with coding challenges, 
            and track your progress with study groups and timers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/auth">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Learn Programming
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of learners and start your programming journey today.
          </p>
          <Button size="lg" asChild>
            <Link to={user ? "/dashboard" : "/auth"}>
              {user ? "Continue Learning" : "Create Free Account"}
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2024 MyStudyPlan. Learn to code, one step at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
