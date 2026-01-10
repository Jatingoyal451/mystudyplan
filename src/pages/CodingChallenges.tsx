import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, CheckCircle, Clock, Flame, Trophy, Star, Lock, ChevronRight } from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  category: string;
  language: string[];
  xp: number;
  completions: number;
  timeLimit: string;
  completed?: boolean;
  locked?: boolean;
  description: string;
}

const challenges: Challenge[] = [
  // Easy Challenges
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', language: ['JavaScript', 'Python', 'TypeScript'], xp: 50, completions: 125000, timeLimit: '15 min', completed: true, description: 'Find two numbers that add up to a target.' },
  { id: 2, title: 'Reverse String', difficulty: 'Easy', category: 'Strings', language: ['JavaScript', 'Python'], xp: 50, completions: 98000, timeLimit: '10 min', completed: true, description: 'Reverse a given string in place.' },
  { id: 3, title: 'Palindrome Check', difficulty: 'Easy', category: 'Strings', language: ['JavaScript', 'Python', 'Java'], xp: 50, completions: 87000, timeLimit: '10 min', description: 'Check if a string is a palindrome.' },
  { id: 4, title: 'FizzBuzz', difficulty: 'Easy', category: 'Logic', language: ['JavaScript', 'Python', 'Go'], xp: 50, completions: 150000, timeLimit: '10 min', completed: true, description: 'Classic FizzBuzz implementation.' },
  { id: 5, title: 'Maximum Subarray', difficulty: 'Easy', category: 'Arrays', language: ['JavaScript', 'Python'], xp: 75, completions: 65000, timeLimit: '20 min', description: 'Find the contiguous subarray with maximum sum.' },
  { id: 6, title: 'Valid Anagram', difficulty: 'Easy', category: 'Strings', language: ['JavaScript', 'Python', 'TypeScript'], xp: 50, completions: 72000, timeLimit: '15 min', description: 'Check if two strings are anagrams.' },
  { id: 7, title: 'Merge Sorted Arrays', difficulty: 'Easy', category: 'Arrays', language: ['JavaScript', 'Python'], xp: 75, completions: 58000, timeLimit: '15 min', description: 'Merge two sorted arrays into one.' },
  { id: 8, title: 'Count Vowels', difficulty: 'Easy', category: 'Strings', language: ['JavaScript', 'Python', 'Ruby'], xp: 50, completions: 95000, timeLimit: '10 min', description: 'Count vowels in a string.' },

  // Medium Challenges
  { id: 9, title: 'Valid Parentheses', difficulty: 'Medium', category: 'Stacks', language: ['JavaScript', 'TypeScript', 'Python'], xp: 100, completions: 45000, timeLimit: '20 min', description: 'Check if brackets are properly balanced.' },
  { id: 10, title: 'Binary Search', difficulty: 'Medium', category: 'Searching', language: ['JavaScript', 'Python', 'Go'], xp: 100, completions: 52000, timeLimit: '15 min', completed: true, description: 'Implement binary search algorithm.' },
  { id: 11, title: 'Linked List Cycle', difficulty: 'Medium', category: 'Linked Lists', language: ['JavaScript', 'Python', 'Java'], xp: 125, completions: 38000, timeLimit: '25 min', description: 'Detect cycle in a linked list.' },
  { id: 12, title: 'LRU Cache', difficulty: 'Medium', category: 'Design', language: ['JavaScript', 'Python', 'TypeScript'], xp: 150, completions: 28000, timeLimit: '30 min', description: 'Implement a Least Recently Used cache.' },
  { id: 13, title: 'Group Anagrams', difficulty: 'Medium', category: 'Hash Tables', language: ['JavaScript', 'Python'], xp: 125, completions: 35000, timeLimit: '25 min', description: 'Group anagrams together from a list.' },
  { id: 14, title: 'Binary Tree Traversal', difficulty: 'Medium', category: 'Trees', language: ['JavaScript', 'Python', 'Java'], xp: 125, completions: 42000, timeLimit: '20 min', description: 'Implement tree traversal methods.' },
  { id: 15, title: 'Spiral Matrix', difficulty: 'Medium', category: 'Arrays', language: ['JavaScript', 'Python'], xp: 150, completions: 25000, timeLimit: '25 min', description: 'Traverse matrix in spiral order.' },
  { id: 16, title: 'Product of Array', difficulty: 'Medium', category: 'Arrays', language: ['JavaScript', 'Python', 'Go'], xp: 125, completions: 48000, timeLimit: '20 min', description: 'Product of array except self.' },

  // Hard Challenges
  { id: 17, title: 'Merge K Sorted Lists', difficulty: 'Hard', category: 'Linked Lists', language: ['JavaScript', 'Python', 'Java'], xp: 200, completions: 15000, timeLimit: '40 min', description: 'Merge k sorted linked lists.' },
  { id: 18, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'Arrays', language: ['JavaScript', 'Python'], xp: 200, completions: 12000, timeLimit: '35 min', description: 'Calculate trapped rainwater.' },
  { id: 19, title: 'Word Ladder', difficulty: 'Hard', category: 'Graphs', language: ['JavaScript', 'Python', 'TypeScript'], xp: 225, completions: 9500, timeLimit: '45 min', description: 'Find shortest transformation sequence.' },
  { id: 20, title: 'Serialize Binary Tree', difficulty: 'Hard', category: 'Trees', language: ['JavaScript', 'Python', 'Java'], xp: 225, completions: 11000, timeLimit: '40 min', description: 'Serialize and deserialize a tree.' },
  { id: 21, title: 'Minimum Window Substring', difficulty: 'Hard', category: 'Sliding Window', language: ['JavaScript', 'Python'], xp: 250, completions: 8500, timeLimit: '45 min', description: 'Find minimum window containing all chars.' },
  { id: 22, title: 'Course Schedule', difficulty: 'Hard', category: 'Graphs', language: ['JavaScript', 'Python', 'Go'], xp: 200, completions: 14000, timeLimit: '35 min', description: 'Detect if courses can be completed.' },

  // Expert Challenges
  { id: 23, title: 'Regular Expression Matching', difficulty: 'Expert', category: 'Dynamic Programming', language: ['JavaScript', 'Python'], xp: 300, completions: 5000, timeLimit: '60 min', locked: true, description: 'Implement regex pattern matching.' },
  { id: 24, title: 'N-Queens', difficulty: 'Expert', category: 'Backtracking', language: ['JavaScript', 'Python', 'Java'], xp: 350, completions: 4200, timeLimit: '60 min', locked: true, description: 'Place N queens on an NxN board.' },
  { id: 25, title: 'Median of Two Sorted Arrays', difficulty: 'Expert', category: 'Binary Search', language: ['JavaScript', 'Python'], xp: 400, completions: 3800, timeLimit: '45 min', locked: true, description: 'Find median in O(log(m+n)) time.' },
  { id: 26, title: 'Sudoku Solver', difficulty: 'Expert', category: 'Backtracking', language: ['JavaScript', 'Python', 'TypeScript'], xp: 400, completions: 3500, timeLimit: '60 min', locked: true, description: 'Solve any valid Sudoku puzzle.' },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-success/20 text-success border-success/30';
    case 'Medium': return 'bg-warning/20 text-warning border-warning/30';
    case 'Hard': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'Expert': return 'bg-primary/20 text-primary border-primary/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function CodingChallenges() {
  const [filter, setFilter] = useState<string>('all');
  
  const completedCount = challenges.filter(c => c.completed).length;
  const totalXP = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.xp, 0);
  
  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => c.difficulty.toLowerCase() === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Coding Challenges</h1>
          <p className="text-muted-foreground mt-1">Sharpen your skills with algorithmic problems</p>
        </div>
        
        <div className="flex gap-4">
          <Card className="glass-card px-4 py-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-lg font-bold">{completedCount}/{challenges.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card px-4 py-2">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-warning" />
              <div>
                <p className="text-lg font-bold">{totalXP} XP</p>
                <p className="text-xs text-muted-foreground">Earned</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 max-w-lg">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
          <TabsTrigger value="easy" onClick={() => setFilter('easy')}>Easy</TabsTrigger>
          <TabsTrigger value="medium" onClick={() => setFilter('medium')}>Medium</TabsTrigger>
          <TabsTrigger value="hard" onClick={() => setFilter('hard')}>Hard</TabsTrigger>
          <TabsTrigger value="expert" onClick={() => setFilter('expert')}>Expert</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredChallenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`glass-card transition-all cursor-pointer group relative overflow-hidden
                  ${challenge.completed ? 'border-success/30 bg-success/5' : ''}
                  ${challenge.locked ? 'opacity-60' : 'hover:glow-primary'}
                `}
              >
                {challenge.completed && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                )}
                {challenge.locked && (
                  <div className="absolute top-3 right-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">{challenge.category}</span>
                  </div>
                  <CardTitle className="text-lg mt-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                    <Code className="h-5 w-5 text-primary" />
                    {challenge.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.language.map((lang) => (
                      <span key={lang} className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">
                        {lang}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" /> {challenge.xp} XP
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {challenge.timeLimit}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" /> {(challenge.completions / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                  
                  {!challenge.locked && !challenge.completed && (
                    <Button className="w-full gap-1" size="sm">
                      Start Challenge <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  {challenge.completed && (
                    <Button variant="outline" className="w-full gap-1" size="sm">
                      View Solution <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  {challenge.locked && (
                    <Button variant="secondary" className="w-full gap-1" size="sm" disabled>
                      <Lock className="h-4 w-4" /> Unlock at Level 10
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}