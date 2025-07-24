import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="h-16 sticky top-0 z-50 border-b border-border">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2 relative w-96">
            <Search className="w-5 h-5 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" />
            <Input placeholder="Search..." className="pl-10 focus-visible:ring-1" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
