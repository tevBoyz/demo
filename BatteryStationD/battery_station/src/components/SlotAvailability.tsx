import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Wrench } from "lucide-react";

type SlotStatus = "available" | "occupied" | "maintenance";

interface Slot {
  id: number;
  status: SlotStatus;
}

const SlotAvailability = () => {
  const [slots, setSlots] = useState<Slot[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      status: i < 12 ? "available" : i < 18 ? "occupied" : "maintenance",
    }))
  );

  const toggleSlotStatus = (id: number) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              status: slot.status === "available" ? "occupied" : "available",
            }
          : slot
      )
    );
  };

  const getStatusConfig = (status: SlotStatus) => {
    switch (status) {
      case "available":
        return {
          label: "Available",
          color: "bg-success",
          icon: CheckCircle2,
          textColor: "text-success",
        };
      case "occupied":
        return {
          label: "Occupied",
          color: "bg-destructive",
          icon: XCircle,
          textColor: "text-destructive",
        };
      case "maintenance":
        return {
          label: "Maintenance",
          color: "bg-warning",
          icon: Wrench,
          textColor: "text-warning",
        };
    }
  };

  const availableCount = slots.filter((s) => s.status === "available").length;
  const occupiedCount = slots.filter((s) => s.status === "occupied").length;
  const maintenanceCount = slots.filter((s) => s.status === "maintenance").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Slot Availability Management</h2>
        <p className="text-muted-foreground">Monitor and manage charging slot status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{availableCount}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{occupiedCount}</p>
                <p className="text-sm text-muted-foreground">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Wrench className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{maintenanceCount}</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Charging Slots Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {slots.map((slot) => {
              const config = getStatusConfig(slot.status);
              const Icon = config.icon;
              return (
                <div key={slot.id} className="flex flex-col gap-2">
                  <Card
                    className={`relative overflow-hidden border-2 ${
                      slot.status === "available"
                        ? "border-success"
                        : slot.status === "occupied"
                        ? "border-destructive"
                        : "border-warning"
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="mb-2">
                        <Icon className={`h-8 w-8 ${config.textColor} mx-auto`} />
                      </div>
                      <p className="font-bold text-lg">#{slot.id}</p>
                      <Badge
                        variant="outline"
                        className={`mt-2 ${config.textColor} border-current`}
                      >
                        {config.label}
                      </Badge>
                    </CardContent>
                  </Card>
                  {slot.status !== "maintenance" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleSlotStatus(slot.id)}
                      className="text-xs"
                    >
                      Toggle
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlotAvailability;
