import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardOverview from "@/components/DashboardOverview";
import SlotAvailability from "@/components/SlotAvailability";
import TruckBooking from "@/components/TruckBooking";
import BatterySwapTracking from "@/components/BatterySwapTracking";
import TruckCompatibility from "@/components/TruckCompatibility";
import PaymentBilling from "@/components/PaymentBilling";
import MaintenanceAlerts from "@/components/MaintenanceAlerts";
import Settings from "@/components/Settings";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "slots":
        return <SlotAvailability />;
      case "booking":
        return <TruckBooking />;
      case "battery":
        return <BatterySwapTracking />;
      case "compatibility":
        return <TruckCompatibility />;
      case "payment":
        return <PaymentBilling />;
      case "maintenance":
        return <MaintenanceAlerts />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 ml-64 p-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
