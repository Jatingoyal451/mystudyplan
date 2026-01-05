import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Lightbulb } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const challengeData: Record<string, { title: string; difficulty: string; description: string; examples: { input: string; output: string }[]; hints: string[] }> = {
  "two-sum": {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    hints: ["Try using a hash map to store values you've seen.", "For each number, check if target - number exists in the map."],
  },
  "reverse-string": {
    title: "Reverse String",
    difficulty: "Easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    examples: [
      { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
    ],
    hints: ["Use two pointers: one at the start and one at the end.", "Swap characters and move pointers toward the center."],
  },
};

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const challenge = challengeId ? challengeData[challengeId] : null;

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/challenges" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Link>
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Challenge not found.</p>
              <Button className="mt-4" asChild>
                <Link to="/challenges">Browse Challenges</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

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
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/challenges" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Challenges
        </Link>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{challenge.title}</CardTitle>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{challenge.description}</p>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Examples:</h3>
                  {challenge.examples.map((example, index) => (
                    <div key={index} className="bg-muted p-4 rounded-lg">
                      <p className="font-mono text-sm"><strong>Input:</strong> {example.input}</p>
                      <p className="font-mono text-sm"><strong>Output:</strong> {example.output}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Hints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {challenge.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Code editor coming soon!<br />
                  <span className="text-sm">Write and test your solution here.</span>
                </p>
              </div>
              <Button className="w-full mt-4">
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ChallengeDetail;
