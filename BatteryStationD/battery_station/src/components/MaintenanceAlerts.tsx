import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Wrench, Battery, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Alert {
  id: number;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  time: string;
  resolved: boolean;
}

const MaintenanceAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "critical",
      title: "Battery #B-087 Performance Degraded",
      description: "Battery capacity dropped to 75%. Immediate inspection required.",
      time: "2 hours ago",
      resolved: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Slot #12 Overdue Maintenance",
      description: "Scheduled maintenance was due 3 days ago.",
      time: "5 hours ago",
      resolved: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Temperature Alert - Slot #5",
      description: "Operating temperature 5°C above normal range.",
      time: "1 day ago",
      resolved: false,
    },
    {
      id: 4,
      type: "info",
      title: "Battery #B-045 Charge Cycles High",
      description: "Battery approaching recommended cycle limit. Schedule replacement.",
      time: "2 days ago",
      resolved: false,
    },
    {
      id: 5,
      type: "critical",
      title: "Slot #18 Connection Fault",
      description: "Charging connector not making proper contact.",
      time: "3 days ago",
      resolved: true,
    },
  ]);

  const resolveAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, resolved: true } : alert))
    );
    toast.success("Alert marked as resolved");
  };

  const getAlertConfig = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return {
          icon: XCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive",
        };
      case "warning":
        return {
          icon: AlertCircle,
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning",
        };
      case "info":
        return {
          icon: Wrench,
          color: "text-primary",
          bgColor: "bg-primary/10",
          borderColor: "border-primary",
        };
    }
  };

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const resolvedAlerts = alerts.filter((a) => a.resolved);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Maintenance & Alerts</h2>
        <p className="text-muted-foreground">Monitor system health and maintenance needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {activeAlerts.filter((a) => a.type === "critical").length}
                </p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {activeAlerts.filter((a) => a.type === "warning").length}
                </p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{resolvedAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-success" />
              <p>No active alerts. All systems operating normally.</p>
            </div>
          ) : (
            activeAlerts.map((alert) => {
              const config = getAlertConfig(alert.type);
              const Icon = config.icon;
              return (
                <Card key={alert.id} className={`border-2 ${config.borderColor}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${config.bgColor}`}>
                        <Icon className={`h-6 w-6 ${config.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-foreground">{alert.title}</h3>
                          <Badge
                            variant="outline"
                            className={`${config.color} border-current shrink-0`}
                          >
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                          <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                            <CheckCircle2 className="h-3 w-3 mr-2" />
                            Mark as Resolved
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </CardContent>
      </Card>

      {resolvedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Resolved</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resolvedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-4 bg-muted rounded-lg opacity-60"
              >
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <Badge variant="outline" className="text-success border-success">
                  Resolved
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceAlerts;