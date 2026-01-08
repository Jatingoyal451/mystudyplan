import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Trophy, Target, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { challengeContent } from "@/data/challengeContent";

const languages = ["All", "Python", "JavaScript", "TypeScript", "React", "SQL"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

const CodingChallenges = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredChallenges = challengeContent.filter((challenge) => {
    const matchesLanguage = selectedLanguage === "All" || challenge.language === selectedLanguage;
    const matchesDifficulty = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
    return matchesLanguage && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Hard": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Coding Challenges</h1>
          <p className="text-muted-foreground text-lg">
            Practice your skills with interactive coding problems
          </p>
        </header>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{challengeContent.length}</p>
                <p className="text-sm text-muted-foreground">Total Challenges</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">0h</p>
                <p className="text-sm text-muted-foreground">Time Spent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Language</label>
            <div className="flex flex-wrap gap-2">
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
          <div>
            <label className="text-sm font-medium mb-2 block">Difficulty</label>
            <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="group hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline">{challenge.language}</Badge>
                </div>
                <CardTitle className="mt-4 text-lg group-hover:text-primary transition-colors">
                  {challenge.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link to={`/challenges/${challenge.id}`}>Start Challenge</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CodingChallenges;
