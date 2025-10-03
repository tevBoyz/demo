import { LayoutDashboard, Zap, Battery, Truck, CreditCard, Wrench, Settings } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "slots", label: "Slot Availability", icon: Zap },
    { id: "booking", label: "Truck Compatibility", icon: Truck },
    { id: "battery", label: "Battery Swap Tracking", icon: Battery },
    { id: "compatibility", label: "Truck Booking", icon: Truck },
    { id: "payment", label: "Payment & Billing", icon: CreditCard },
    { id: "maintenance", label: "Maintenance / Alerts", icon: Wrench },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-[1.5em] font-bold text-foreground">A2 Corridor</h1>
            <h2 className="text-md font-bold text-blue">Station AAA</h2>
            <p className="text-xs text-muted-foreground">Charging Station Operator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Station ID: <span className="font-mono font-semibold text-foreground">A2C-001</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;