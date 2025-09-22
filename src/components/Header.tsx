import { FileText, MessageCircle, Upload, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header = ({ currentView, onViewChange }: HeaderProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload RFP', icon: Upload },
    { id: 'inquiry', label: 'Inquiry Bot', icon: MessageCircle },
  ];

  return (
    <header className="bg-card border-b shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">RFP Evaluation Portal</h1>
              <p className="text-sm text-muted-foreground">UAE Ministry of Finance</p>
            </div>
          </div>
          <nav className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};