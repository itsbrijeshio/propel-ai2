import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  User
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'motion/react';

const sidebarItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Generate', path: '/generate', icon: PlusCircle },
  { name: 'Proposals', path: '/proposals', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Shell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const pageTitle = sidebarItems.find(item => item.path === location.pathname)?.name || 'Proposal Details';

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 0, 
          opacity: isSidebarOpen ? 1 : 0,
          x: isSidebarOpen ? 0 : -280 
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed top-0 left-0 z-50 h-screen border-r bg-card overflow-hidden flex flex-col shadow-2xl lg:shadow-none",
          !isSidebarOpen && "pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full p-4 w-[280px]">
          <div className="flex items-center justify-between px-2 py-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <PlusCircle className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">PropelAI</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 mt-6 space-y-1">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebarOnMobile}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start mt-auto px-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start scale-90 origin-left">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Pro Plan</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className={cn(
        "flex flex-col transition-all duration-300",
        isSidebarOpen ? "lg:ml-[280px]" : "ml-0"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold tracking-tight">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <input 
                type="search" 
                placeholder="Search proposals..." 
                className="pl-9 pr-4 py-2 text-sm bg-secondary rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-border"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
