import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const courses = [
  { id: 1, title: 'JavaScript Fundamentals', description: 'Learn the basics of JavaScript', duration: '10h' },
  { id: 2, title: 'React Essentials', description: 'Build modern UIs with React', duration: '15h' },
  { id: 3, title: 'TypeScript Mastery', description: 'Type-safe JavaScript development', duration: '12h' },
  { id: 4, title: 'Python for Beginners', description: 'Start your Python journey', duration: '8h' },
  { id: 5, title: 'Node.js Backend', description: 'Server-side JavaScript', duration: '14h' },
  { id: 6, title: 'SQL Databases', description: 'Master database queries', duration: '10h' },
];

export default function Courses() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Courses</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{course.description}</p>
              <p className="text-sm font-medium">Duration: {course.duration}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
