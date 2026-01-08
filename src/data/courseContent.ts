export interface Lesson {
  title: string;
  duration: string;
  type: "video" | "article" | "exercise";
  completed?: boolean;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  videoCount: number;
  progress?: number;
  modules: Module[];
}

export const courseContent: Course[] = [
  {
    id: "python-basics",
    title: "Python for Beginners",
    description: "Learn Python programming from scratch with hands-on projects",
    language: "Python",
    level: "Beginner",
    duration: "12 hours",
    videoCount: 45,
    progress: 0,
    modules: [
      { title: "Introduction to Python", lessons: [
        { title: "What is Python?", duration: "10 min", type: "video" },
        { title: "Installing Python", duration: "15 min", type: "video" },
        { title: "Your First Program", duration: "20 min", type: "exercise" },
      ]},
      { title: "Variables & Data Types", lessons: [
        { title: "Variables Explained", duration: "12 min", type: "video" },
        { title: "Numbers and Strings", duration: "18 min", type: "video" },
        { title: "Practice Exercises", duration: "25 min", type: "exercise" },
      ]},
    ],
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Master JavaScript from basics to advanced concepts",
    language: "JavaScript",
    level: "Beginner",
    duration: "15 hours",
    videoCount: 60,
    modules: [
      { title: "Getting Started", lessons: [
        { title: "Introduction to JS", duration: "10 min", type: "video" },
        { title: "Variables & Constants", duration: "15 min", type: "video" },
        { title: "First JS Program", duration: "20 min", type: "exercise" },
      ]},
    ],
  },
  {
    id: "html-css-basics",
    title: "HTML & CSS Fundamentals",
    description: "Build beautiful websites from scratch",
    language: "HTML",
    level: "Beginner",
    duration: "10 hours",
    videoCount: 40,
    modules: [
      { title: "HTML Basics", lessons: [
        { title: "HTML Structure", duration: "12 min", type: "video" },
        { title: "Tags & Elements", duration: "15 min", type: "video" },
      ]},
    ],
  },
  {
    id: "react-essentials",
    title: "React Essentials",
    description: "Build modern web apps with React",
    language: "React",
    level: "Intermediate",
    duration: "18 hours",
    videoCount: 55,
    modules: [
      { title: "React Fundamentals", lessons: [
        { title: "What is React?", duration: "10 min", type: "video" },
        { title: "Components & JSX", duration: "20 min", type: "video" },
        { title: "Build Your First Component", duration: "25 min", type: "exercise" },
      ]},
    ],
  },
  {
    id: "typescript-complete",
    title: "TypeScript Complete Guide",
    description: "Add type safety to your JavaScript projects",
    language: "TypeScript",
    level: "Intermediate",
    duration: "14 hours",
    videoCount: 48,
    modules: [
      { title: "TypeScript Basics", lessons: [
        { title: "Why TypeScript?", duration: "8 min", type: "video" },
        { title: "Types & Interfaces", duration: "18 min", type: "video" },
      ]},
    ],
  },
  {
    id: "sql-mastery",
    title: "SQL Database Mastery",
    description: "Master SQL for data management",
    language: "SQL",
    level: "Beginner",
    duration: "10 hours",
    videoCount: 35,
    modules: [
      { title: "SQL Fundamentals", lessons: [
        { title: "Introduction to Databases", duration: "12 min", type: "video" },
        { title: "SELECT Queries", duration: "20 min", type: "video" },
      ]},
    ],
  },
];
