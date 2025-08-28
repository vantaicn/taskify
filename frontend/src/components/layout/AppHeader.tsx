import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NewBoardButton from "../boards/NewBoardButton";
import { ModeToggle } from "../darkmode/mode-toggle";

const AppHeader = () => {

  return (
    <header className="h-12 sticky top-0 z-50 border-b border-border bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors" />
          <ModeToggle />
          <div className="flex items-center gap-2 relative w-96 lg:w-120 xl:w-150 max-w-xl">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input 
              placeholder="Search boards, lists, tasks..." 
              className="pl-10 focus-visible:ring-2 focus-visible:ring-primary/20 border-white/20 bg-white/10 placeholder:text-muted-foreground/70" 
            />
            <NewBoardButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
