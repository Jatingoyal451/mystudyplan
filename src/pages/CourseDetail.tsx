import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, CheckCircle, Lock, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const courseData: Record<string, { title: string; description: string; modules: { id: string; title: string; lessons: { id: string; title: string; duration: string; type: string }[] }[] }> = {
  python: {
    title: "Python Programming",
    description: "Learn Python from basics to advanced concepts",
    modules: [
      {
        id: "m1",
        title: "Getting Started with Python",
        lessons: [
          { id: "l1", title: "Introduction to Python", duration: "10 min", type: "video" },
          { id: "l2", title: "Installing Python", duration: "8 min", type: "video" },
          { id: "l3", title: "Your First Program", duration: "15 min", type: "exercise" },
        ],
      },
      {
        id: "m2",
        title: "Variables and Data Types",
        lessons: [
          { id: "l4", title: "Understanding Variables", duration: "12 min", type: "video" },
          { id: "l5", title: "Numbers and Strings", duration: "15 min", type: "video" },
          { id: "l6", title: "Practice: Variables", duration: "20 min", type: "exercise" },
        ],
      },
    ],
  },
  javascript: {
    title: "JavaScript Mastery",
    description: "Master modern JavaScript",
    modules: [
      {
        id: "m1",
        title: "JavaScript Basics",
        lessons: [
          { id: "l1", title: "What is JavaScript?", duration: "10 min", type: "video" },
          { id: "l2", title: "Variables with let and const", duration: "12 min", type: "video" },
          { id: "l3", title: "Practice: First Script", duration: "15 min", type: "exercise" },
        ],
      },
    ],
  },
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courseId ? courseData[courseId] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/courses" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Course not found.</p>
              <Button className="mt-4" asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/courses" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground mb-4">{course.description}</p>
          <div className="flex items-center gap-4">
            <Progress value={0} className="flex-1 max-w-xs" />
            <span className="text-sm text-muted-foreground">0% complete</span>
          </div>
        </div>

        <div className="space-y-6">
          {course.modules.map((module, moduleIndex) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Module {moduleIndex + 1}: {module.title}
                </CardTitle>
                <CardDescription>
                  {module.lessons.length} lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {lessonIndex === 0 && moduleIndex === 0 ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                            <Badge variant="outline" className="text-xs">
                              {lesson.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant={lessonIndex === 0 && moduleIndex === 0 ? "default" : "outline"}>
                        {lessonIndex === 0 && moduleIndex === 0 ? "Start" : "Locked"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
