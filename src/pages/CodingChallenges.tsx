import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Code } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const challenges = [
  { id: "two-sum", title: "Two Sum", difficulty: "Easy", language: "Python", topics: ["Arrays", "Hash Tables"], solved: false },
  { id: "reverse-string", title: "Reverse String", difficulty: "Easy", language: "Python", topics: ["Strings"], solved: false },
  { id: "palindrome", title: "Valid Palindrome", difficulty: "Easy", language: "JavaScript", topics: ["Strings", "Two Pointers"], solved: false },
  { id: "fizzbuzz", title: "FizzBuzz", difficulty: "Easy", language: "JavaScript", topics: ["Loops"], solved: false },
  { id: "binary-search", title: "Binary Search", difficulty: "Medium", language: "Python", topics: ["Arrays", "Binary Search"], solved: false },
  { id: "merge-sort", title: "Merge Sort", difficulty: "Medium", language: "Python", topics: ["Sorting", "Recursion"], solved: false },
  { id: "typescript-generics", title: "Generic Functions", difficulty: "Medium", language: "TypeScript", topics: ["Generics", "Types"], solved: false },
  { id: "react-counter", title: "Counter Component", difficulty: "Easy", language: "React", topics: ["Hooks", "State"], solved: false },
  { id: "sql-join", title: "Employee Joins", difficulty: "Medium", language: "SQL", topics: ["Joins", "Queries"], solved: false },
];

const CodingChallenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || challenge.difficulty === selectedDifficulty;
    const matchesLanguage = !selectedLanguage || challenge.language === selectedLanguage;
    return matchesSearch && matchesDifficulty && matchesLanguage;
  });

  const difficulties = ["Easy", "Medium", "Hard"];
  const languages = ["Python", "JavaScript", "TypeScript", "React", "SQL"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Coding Challenges</h1>
          <p className="text-muted-foreground">Practice your skills with coding problems</p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium mr-2">Difficulty:</span>
            <Button
              variant={selectedDifficulty === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(null)}
            >
              All
            </Button>
            {difficulties.map((diff) => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium mr-2">Language:</span>
            <Button
              variant={selectedLanguage === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLanguage(null)}
            >
              All
            </Button>
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
        </div>

        {/* Challenges List */}
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.language}</CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {challenge.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/challenges/${challenge.id}`}>Solve</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No challenges found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CodingChallenges;
