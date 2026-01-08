import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, CheckCircle, Circle, Video, FileText, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import { courseContent } from "@/data/courseContent";

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courseContent.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/courses" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <Badge>{course.language}</Badge>
                <Badge variant="secondary">{course.level}</Badge>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground">{course.description}</p>
            </div>

            {/* Video Player Placeholder */}
            <Card className="mb-8 aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Click to start the first lesson</p>
              </div>
            </Card>

            {/* Course Modules */}
            <Tabs defaultValue="curriculum">
              <TabsList className="mb-4">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="space-y-4">
                {course.modules.map((module, moduleIndex) => (
                  <Card key={moduleIndex}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                          {moduleIndex + 1}
                        </span>
                        {module.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                            </div>
                            {lesson.type === "video" && <Video className="h-4 w-4 text-muted-foreground" />}
                            {lesson.type === "article" && <FileText className="h-4 w-4 text-muted-foreground" />}
                            {lesson.type === "exercise" && <Code className="h-4 w-4 text-muted-foreground" />}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="projects">
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Complete the curriculum to unlock hands-on projects
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources">
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Additional resources will be available as you progress
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completed</span>
                    <span>{course.progress || 0}%</span>
                  </div>
                  <Progress value={course.progress || 0} />
                </div>
                <Button className="w-full">Continue Learning</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Videos</span>
                  <span className="font-medium">{course.videoCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modules</span>
                  <span className="font-medium">{course.modules.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
