import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Home, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/challenges", label: "Challenges", icon: Code },
    { path: "/dashboard", label: "Dashboard", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <BookOpen className="h-6 w-6 text-primary" />
          StudyHub
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              asChild
            >
              <Link to={item.path} className="gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
