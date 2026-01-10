import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Star, Users, Play, ChevronRight } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  progress?: number;
  instructor: string;
}

const courses: Course[] = [
  { id: 1, title: 'JavaScript Fundamentals', description: 'Master the core concepts of JavaScript including variables, functions, arrays, objects, and ES6+ features.', duration: '10h', lessons: 45, students: 12500, rating: 4.8, level: 'Beginner', category: 'Web Development', progress: 65, instructor: 'Sarah Chen' },
  { id: 2, title: 'React Essentials', description: 'Build modern, interactive UIs with React. Learn hooks, state management, and component patterns.', duration: '15h', lessons: 62, students: 9800, rating: 4.9, level: 'Intermediate', category: 'Web Development', progress: 30, instructor: 'Mike Johnson' },
  { id: 3, title: 'TypeScript Mastery', description: 'Write type-safe JavaScript. Cover interfaces, generics, decorators, and advanced type patterns.', duration: '12h', lessons: 48, students: 7200, rating: 4.7, level: 'Intermediate', category: 'Web Development', instructor: 'Alex Rivera' },
  { id: 4, title: 'Python for Beginners', description: 'Start your Python journey with data types, control flow, functions, and file handling.', duration: '8h', lessons: 35, students: 25000, rating: 4.9, level: 'Beginner', category: 'Programming', progress: 100, instructor: 'Dr. Emily Watson' },
  { id: 5, title: 'Node.js Backend Development', description: 'Build scalable server-side applications with Express, databases, and authentication.', duration: '14h', lessons: 55, students: 6500, rating: 4.6, level: 'Intermediate', category: 'Backend', instructor: 'James Park' },
  { id: 6, title: 'SQL & Database Design', description: 'Master relational databases, complex queries, optimization, and database architecture.', duration: '10h', lessons: 42, students: 8900, rating: 4.8, level: 'Beginner', category: 'Databases', instructor: 'Maria Garcia' },
  { id: 7, title: 'Data Structures & Algorithms', description: 'Essential DSA concepts: arrays, trees, graphs, sorting, searching, and dynamic programming.', duration: '20h', lessons: 85, students: 15000, rating: 4.9, level: 'Advanced', category: 'Computer Science', progress: 15, instructor: 'Prof. David Kim' },
  { id: 8, title: 'System Design Fundamentals', description: 'Learn to design scalable systems. Cover load balancing, caching, microservices, and databases.', duration: '16h', lessons: 50, students: 4500, rating: 4.7, level: 'Advanced', category: 'Architecture', instructor: 'Lisa Thompson' },
  { id: 9, title: 'Machine Learning Basics', description: 'Introduction to ML with Python. Linear regression, classification, clustering, and neural networks.', duration: '18h', lessons: 70, students: 11000, rating: 4.8, level: 'Intermediate', category: 'AI/ML', instructor: 'Dr. Robert Chen' },
  { id: 10, title: 'Docker & Kubernetes', description: 'Containerize applications and orchestrate deployments with Docker and Kubernetes.', duration: '12h', lessons: 45, students: 5800, rating: 4.6, level: 'Intermediate', category: 'DevOps', instructor: 'Chris Martinez' },
  { id: 11, title: 'GraphQL API Development', description: 'Build flexible APIs with GraphQL. Schema design, resolvers, and Apollo Server.', duration: '8h', lessons: 32, students: 3200, rating: 4.5, level: 'Intermediate', category: 'Backend', instructor: 'Nina Patel' },
  { id: 12, title: 'CSS & Tailwind Mastery', description: 'Modern CSS techniques, animations, responsive design, and Tailwind CSS framework.', duration: '10h', lessons: 40, students: 7800, rating: 4.7, level: 'Beginner', category: 'Web Development', instructor: 'Tom Anderson' },
  { id: 13, title: 'Git & GitHub Pro', description: 'Version control mastery: branching, merging, rebasing, and collaborative workflows.', duration: '6h', lessons: 25, students: 18000, rating: 4.8, level: 'Beginner', category: 'Tools', progress: 80, instructor: 'Amy Lee' },
  { id: 14, title: 'AWS Cloud Practitioner', description: 'Cloud fundamentals with AWS: EC2, S3, Lambda, and core AWS services overview.', duration: '14h', lessons: 55, students: 9500, rating: 4.6, level: 'Beginner', category: 'Cloud', instructor: 'Kevin Brown' },
  { id: 15, title: 'Rust Programming', description: 'Learn Rust for systems programming: ownership, borrowing, and zero-cost abstractions.', duration: '16h', lessons: 60, students: 2800, rating: 4.9, level: 'Advanced', category: 'Programming', instructor: 'Sophie Walker' },
  { id: 16, title: 'Mobile Development with React Native', description: 'Build cross-platform mobile apps for iOS and Android using React Native.', duration: '15h', lessons: 58, students: 6200, rating: 4.7, level: 'Intermediate', category: 'Mobile', instructor: 'Daniel Lee' },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-success/20 text-success';
    case 'Intermediate': return 'bg-warning/20 text-warning';
    case 'Advanced': return 'bg-destructive/20 text-destructive';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function Courses() {
  const inProgressCourses = courses.filter(c => c.progress && c.progress > 0 && c.progress < 100);
  const completedCourses = courses.filter(c => c.progress === 100);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mt-1">Expand your knowledge with our comprehensive courses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="outline" size="sm">Filter</Button>
        </div>
      </div>

      {inProgressCourses.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Continue Learning
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressCourses.map((course) => (
              <Card key={course.id} className="glass-card hover:glow-primary transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="text-xs text-muted-foreground">{course.category}</span>
                  </div>
                  <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-medium">{course.progress}% complete</span>
                    <Button size="sm" className="gap-1">
                      Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {completedCourses.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" />
            Completed ({completedCourses.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {completedCourses.map((course) => (
              <Card key={course.id} className="bg-success/5 border-success/20 hover:border-success/40 transition-all cursor-pointer">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                      <Star className="h-4 w-4 text-success" />
                    </div>
                    <span className="font-medium text-sm">{course.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Certificate earned</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          All Courses
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="glass-card hover:glow-primary transition-all cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="text-xs text-muted-foreground">{course.category}</span>
                </div>
                <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {(course.students / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">by {course.instructor}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}