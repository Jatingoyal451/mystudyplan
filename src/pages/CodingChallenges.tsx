import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

const challenges = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', language: 'JavaScript' },
  { id: 2, title: 'Reverse String', difficulty: 'Easy', language: 'Python' },
  { id: 3, title: 'Valid Parentheses', difficulty: 'Medium', language: 'TypeScript' },
  { id: 4, title: 'Binary Search', difficulty: 'Medium', language: 'JavaScript' },
];

export default function CodingChallenges() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Coding Challenges</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader><CardTitle className="flex items-center gap-2"><Code className="h-5 w-5 text-primary" />{challenge.title}</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{challenge.difficulty}</span>
                <span className="px-2 py-1 rounded text-xs bg-muted">{challenge.language}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
