import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, BookOpen, Users, Calendar, Code, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/courses', icon: BookOpen, label: 'Courses' },
  { path: '/groups', icon: Users, label: 'Groups' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/challenges', icon: Code, label: 'Challenges' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function Layout() {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:top-0 md:bottom-auto md:border-b md:border-t-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="hidden md:block text-xl font-bold text-gradient">
              StudyHub
            </Link>
            <div className="flex items-center justify-around w-full md:w-auto md:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col md:flex-row items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs md:text-sm">{item.label}</span>
                </Link>
              ))}
              <Button variant="ghost" size="icon" onClick={signOut} className="hidden md:flex">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 pt-4 pb-20 md:pt-20 md:pb-4">
        <Outlet />
      </main>
    </div>
  );
}
