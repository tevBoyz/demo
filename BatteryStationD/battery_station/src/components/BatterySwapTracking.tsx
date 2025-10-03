import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

interface BatterySwap {
  id: number;
  truckId: string;
  batteryGiven: string;
  originalBattery: string;
  swapTime: string;
  chargeStatus: "charging" | "charged";
}

const BatterySwapTracking = () => {
  const [swaps, setSwaps] = useState<BatterySwap[]>([
    {
      id: 1,
      truckId: "TRK-8901",
      batteryGiven: "BAT-3456",
      originalBattery: "BAT-1234",
      swapTime: "2025-10-03 08:30",
      chargeStatus: "charging",
    },
    {
      id: 2,
      truckId: "TRK-7823",
      batteryGiven: "BAT-3457",
      originalBattery: "BAT-2345",
      swapTime: "2025-10-03 09:15",
      chargeStatus: "charged",
    },
    {
      id: 3,
      truckId: "TRK-6745",
      batteryGiven: "BAT-3458",
      originalBattery: "BAT-3456",
      swapTime: "2025-10-03 10:45",
      chargeStatus: "charging",
    },
    {
      id: 4,
      truckId: "TRK-5667",
      batteryGiven: "BAT-3459",
      originalBattery: "BAT-4567",
      swapTime: "2025-10-03 11:20",
      chargeStatus: "charging",
    },
  ]);

  const markAsCharged = (id: number) => {
    setSwaps((prev) =>
      prev.map((swap) =>
        swap.id === id ? { ...swap, chargeStatus: "charged" as const } : swap
      )
    );
    toast.success("Battery marked as fully charged");
  };

  const returnToTruck = (truckId: string) => {
    toast.success(`Battery returned to ${truckId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Battery Swap Tracking</h2>
        <p className="text-muted-foreground">Track battery exchanges and charging status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Battery Swaps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Truck ID</TableHead>
                  <TableHead>Battery Given</TableHead>
                  <TableHead>Original Battery</TableHead>
                  <TableHead>Swap Time</TableHead>
                  <TableHead>Charge Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {swaps.map((swap) => (
                  <TableRow key={swap.id}>
                    <TableCell className="font-mono font-semibold">{swap.truckId}</TableCell>
                    <TableCell className="font-mono">{swap.batteryGiven}</TableCell>
                    <TableCell className="font-mono">{swap.originalBattery}</TableCell>
                    <TableCell className="text-muted-foreground">{swap.swapTime}</TableCell>
                    <TableCell>
                      {swap.chargeStatus === "charged" ? (
                        <Badge className="bg-success text-success-foreground">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Charged
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-warning border-warning">
                          <Clock className="h-3 w-3 mr-1" />
                          Charging
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {swap.chargeStatus === "charging" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsCharged(swap.id)}
                        >
                          Mark Charged
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => returnToTruck(swap.truckId)}
                        >
                          Return to Truck
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatterySwapTracking;