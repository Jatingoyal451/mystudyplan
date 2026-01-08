export interface Challenge {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  constraints?: string[];
  examples?: { input: string; output: string; explanation?: string }[];
  hints?: string[];
  starterCode?: string;
}

export const challengeContent: Challenge[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: "Given an array of integers, return indices of the two numbers that add up to a target.",
    language: "Python",
    difficulty: "Easy",
    topics: ["Arrays", "Hash Tables"],
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" }],
    hints: ["Use a hash map to store seen values"],
    starterCode: "def two_sum(nums, target):\n    pass",
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description: "Write a function that reverses a string.",
    language: "JavaScript",
    difficulty: "Easy",
    topics: ["Strings", "Two Pointers"],
    examples: [{ input: '"hello"', output: '"olleh"' }],
    starterCode: "function reverseString(s) {\n  \n}",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description: "Determine if the input string has valid parentheses.",
    language: "TypeScript",
    difficulty: "Medium",
    topics: ["Stack", "Strings"],
    examples: [{ input: '"()[]{}"', output: "true" }],
    starterCode: "function isValid(s: string): boolean {\n  \n}",
  },
  {
    id: "react-counter",
    title: "Build a Counter",
    description: "Create a React counter component with increment and decrement.",
    language: "React",
    difficulty: "Easy",
    topics: ["useState", "Components"],
    starterCode: "function Counter() {\n  return <div>Counter</div>\n}",
  },
  {
    id: "sql-select",
    title: "Employee Salaries",
    description: "Write a query to find employees earning more than average salary.",
    language: "SQL",
    difficulty: "Medium",
    topics: ["SELECT", "Subqueries"],
    starterCode: "SELECT * FROM employees\nWHERE salary > ...",
  },
];
