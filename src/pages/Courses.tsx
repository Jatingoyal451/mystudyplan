import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const courses = [
  {
    id: "python",
    title: "Python Programming",
    description: "Learn Python from basics to advanced concepts including data structures, OOP, and more.",
    duration: "40 hours",
    modules: 12,
    level: "Beginner",
    topics: ["Variables", "Functions", "OOP", "Data Structures"],
  },
  {
    id: "javascript",
    title: "JavaScript Mastery",
    description: "Master JavaScript with modern ES6+ features, async programming, and DOM manipulation.",
    duration: "35 hours",
    modules: 10,
    level: "Beginner",
    topics: ["Variables", "Functions", "Async/Await", "DOM"],
  },
  {
    id: "html",
    title: "HTML Fundamentals",
    description: "Learn semantic HTML5 and build accessible, well-structured web pages.",
    duration: "15 hours",
    modules: 6,
    level: "Beginner",
    topics: ["Elements", "Forms", "Semantic HTML", "Accessibility"],
  },
  {
    id: "css",
    title: "CSS & Modern Styling",
    description: "Master CSS including Flexbox, Grid, animations, and responsive design.",
    duration: "25 hours",
    modules: 8,
    level: "Beginner",
    topics: ["Selectors", "Flexbox", "Grid", "Animations"],
  },
  {
    id: "sql",
    title: "SQL Database Mastery",
    description: "Learn SQL from basics to advanced queries, joins, and database design.",
    duration: "30 hours",
    modules: 9,
    level: "Intermediate",
    topics: ["Queries", "Joins", "Indexes", "Optimization"],
  },
  {
    id: "react",
    title: "React Development",
    description: "Build modern web applications with React, hooks, state management, and more.",
    duration: "45 hours",
    modules: 14,
    level: "Intermediate",
    topics: ["Components", "Hooks", "State", "Context"],
  },
  {
    id: "nodejs",
    title: "Node.js Backend",
    description: "Build scalable backend applications with Node.js, Express, and databases.",
    duration: "40 hours",
    modules: 12,
    level: "Intermediate",
    topics: ["Express", "APIs", "Databases", "Authentication"],
  },
  {
    id: "typescript",
    title: "TypeScript Essentials",
    description: "Add type safety to your JavaScript projects with TypeScript.",
    duration: "25 hours",
    modules: 8,
    level: "Intermediate",
    topics: ["Types", "Interfaces", "Generics", "Advanced Types"],
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Courses</h1>
          <p className="text-muted-foreground">Learn programming with interactive lessons and exercises</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedLevel === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel(null)}
            >
              All
            </Button>
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.modules} modules
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full" asChild>
                  <Link to={`/courses/${course.id}`}>Start Learning</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No courses found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
