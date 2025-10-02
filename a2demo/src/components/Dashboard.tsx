import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from '@/assets/logo.png';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={logo} width={80}/><span className="text-lg sm:text-xl font-bold hidden sm:block">Corridor</span>
                            <h1 className="text-[#FF0000] font-bold text-[2em]">DEMO</h1>

            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                className="text-primary-foreground cursor-pointer hover:bg-primary-foreground/20 hover:text-primary-foreground"
                onClick={() => navigate("/")}
              >
                Go Back
              </Button>
              {/* <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    Switch Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
