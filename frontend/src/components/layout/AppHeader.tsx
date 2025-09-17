import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import NewBoardButton from "../boards/NewBoardButton";
import { ModeToggle } from "../darkmode/mode-toggle";
import { useAuthStore } from "@/stores/authStore";

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();
  const currentPath = location.pathname;

  console.log('user full name:', user);

  const showSidebarTrigger = currentPath === '/boards';
  
  const showSearchAndCreate = !!user;
  
  const showAuthButtons = currentPath === '/' && !user;

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  return (
    <header className="h-12 sticky top-0 z-50 border-b border-border bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          {showSidebarTrigger && (
            <SidebarTrigger className="hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors" />
          )}
          <ModeToggle />
          
          {showSearchAndCreate && (
            <div className="flex items-center gap-2 relative w-96 lg:w-120 xl:w-150 max-w-xl">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input 
                placeholder="Search boards, lists, tasks..." 
                className="pl-10 focus-visible:ring-2 focus-visible:ring-primary/20 border-white/20 bg-white/10 placeholder:text-muted-foreground/70" 
              />
              <NewBoardButton />
            </div>
          )}
        </div>
        
        {showAuthButtons && (
          <div className="flex items-center gap-1">
            <Button 
              onClick={() => navigate('/login')}
              className="text-sm font-medium"
            >
              Login
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/register')}
              className="text-sm font-medium"
            >
              Register
            </Button>
          </div>
        )}

        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              Hello, {user.fullName}
            </span>
            <span className="text-sm font-medium text-foreground">|</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hover:bg-white/20 dark:hover:bg-black/20 text-sm font-medium"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
