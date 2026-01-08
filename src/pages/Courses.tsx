import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Video, FileText, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import { courseContent } from "@/data/courseContent";

const languages = ["All", "Python", "JavaScript", "HTML", "CSS", "SQL", "React", "Node.js", "TypeScript"];

const Courses = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const filteredCourses = selectedLanguage === "All"
    ? courseContent
    : courseContent.filter((course) => course.language === selectedLanguage);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Courses</h1>
          <p className="text-muted-foreground text-lg">
            Master programming with interactive video lessons and hands-on projects
          </p>
        </header>

        {/* Language Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {languages.map((lang) => (
            <Button
              key={lang}
              variant={selectedLanguage === lang ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLanguage(lang)}
            >
              {lang}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant={course.level === "Beginner" ? "default" : course.level === "Intermediate" ? "secondary" : "outline"}>
                    {course.level}
                  </Badge>
                  <Badge variant="outline">{course.language}</Badge>
                </div>
                <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Video className="h-4 w-4" /> {course.videoCount} videos
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> {course.modules.length} modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {course.duration}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress || 0}%</span>
                  </div>
                  <Progress value={course.progress || 0} className="h-2" />
                </div>

                <Button asChild className="w-full">
                  <Link to={`/courses/${course.id}`}>
                    {course.progress ? "Continue Learning" : "Start Course"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
