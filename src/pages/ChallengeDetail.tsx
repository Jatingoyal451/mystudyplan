import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, Lightbulb, BookOpen, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { challengeContent } from "@/data/challengeContent";

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const challenge = challengeContent.find((c) => c.id === challengeId);
  const [code, setCode] = useState(challenge?.starterCode || "");
  const [showHints, setShowHints] = useState(false);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
          <Button asChild>
            <Link to="/challenges">Back to Challenges</Link>
          </Button>
        </div>
      </div>
    );
  }

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
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/challenges" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Challenges
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Problem Description */}
          <div>
            <div className="flex gap-2 mb-4">
              <Badge className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline">{challenge.language}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">{challenge.title}</h1>
            
            <Tabs defaultValue="description">
              <TabsList className="mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">{challenge.description}</p>
                    
                    <h3 className="font-semibold mb-2">Topics</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {challenge.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary">{topic}</Badge>
                      ))}
                    </div>

                    {challenge.constraints && (
                      <>
                        <h3 className="font-semibold mb-2">Constraints</h3>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {challenge.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                {challenge.examples?.map((example, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">Example {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 font-mono text-sm">
                        <p><span className="text-muted-foreground">Input:</span> {example.input}</p>
                        <p><span className="text-muted-foreground">Output:</span> {example.output}</p>
                        {example.explanation && (
                          <p className="text-muted-foreground">{example.explanation}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="hints">
                <Card>
                  <CardContent className="pt-6">
                    {!showHints ? (
                      <Button onClick={() => setShowHints(true)} variant="outline" className="gap-2">
                        <Lightbulb className="h-4 w-4" /> Show Hints
                      </Button>
                    ) : (
                      <ul className="space-y-2">
                        {challenge.hints?.map((hint, index) => (
                          <li key={index} className="flex gap-2 text-muted-foreground">
                            <Lightbulb className="h-4 w-4 text-yellow-500 shrink-0 mt-1" />
                            {hint}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card className="h-[500px]">
              <CardHeader className="border-b">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Code Editor</span>
                  <Badge variant="outline">{challenge.language}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-60px)]">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 bg-muted font-mono text-sm resize-none focus:outline-none"
                  placeholder="Write your code here..."
                />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1 gap-2">
                <Play className="h-4 w-4" /> Run Code
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <CheckCircle className="h-4 w-4" /> Submit
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm min-h-[100px]">
                  <p className="text-muted-foreground">Run your code to see the output...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChallengeDetail;
