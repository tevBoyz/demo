import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, User, Package } from "lucide-react";
import logo from '@/assets/logo.png'

const Home = () => {
  const navigate = useNavigate();

  const dashboards = [
    {
      title: "Admin Dashboard",
      description: "Manage platform and users",
      icon: User,
      path: "/admin",
      color: "from-primary to-accent"
    },
    {
      title: "Truck Owner/Driver",
      description: "Monitor truck and its maintenance",
      icon: Truck,
      path: "/driver",
      color: "from-success to-emerald-500"
    },
    {
      title: "Cargo Owner",
      description: "Request deliveries and track shipments",
      icon: Package,
      path: "/shipper",
      color: "from-warning to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/")}>
              <img src={logo} width={80}/><span className="text-lg sm:text-xl font-bold hidden sm:block">Corridor</span>
              <h1 className="text-[#FF0000] font-bold text-[2em]">DEMO</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Prototype Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Freight hailing system Dashboards
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose role to access the relevant dashboard to explore features
            and functionalities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dashboards.map((dashboard) => {
            const Icon = dashboard.icon;
            return (
              <Card
                key={dashboard.path}
                className="cursor-pointer transition-all hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary group"
                onClick={() => navigate(dashboard.path)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dashboard.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{dashboard.title}</CardTitle>
                  <CardDescription className="text-base">
                    {dashboard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Access Dashboard
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        
      </main>
    </div>
  );
};

export default Home;