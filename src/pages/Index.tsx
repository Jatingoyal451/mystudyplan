import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Users, Trophy, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Learn Python, JavaScript, HTML, CSS, SQL, React, Node.js, and TypeScript with video lessons and hands-on projects",
    },
    {
      icon: Code,
      title: "Coding Challenges",
      description: "Practice with 100+ challenges across multiple difficulty levels and languages",
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Join study groups, collaborate with peers, and learn together",
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Set goals, track your learning journey, and earn achievements",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/20 to-background" />
        <div className="container relative mx-auto px-4 py-24 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl animate-fade-in">
            Master Programming
            <span className="block text-primary">One Challenge at a Time</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Interactive courses, coding challenges, and project-based tutorials to help you become a proficient developer
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/courses">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/challenges">Try Challenges</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
          Everything You Need to Learn Coding
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="group transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Learn Popular Languages & Frameworks
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Python", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "React", "Node.js"].map((lang) => (
              <div
                key={lang}
                className="rounded-full bg-background px-6 py-3 font-medium text-foreground shadow-sm border"
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold text-foreground">Ready to Start Your Coding Journey?</h2>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          Join thousands of learners who are building their programming skills with StudyHub
        </p>
        <Button asChild size="lg">
          <Link to="/auth">Get Started Free</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 StudyHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
