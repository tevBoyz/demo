import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Calendar, Battery } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TruckBooking = () => {
  const [truckId, setTruckId] = useState("");
  const [batteryModel, setBatteryModel] = useState("");
  const [checkResult, setCheckResult] = useState<{
    available: boolean;
    type: "slot" | "battery" | null;
    details: string;
  } | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const { toast } = useToast();

  const handleCheckAvailability = () => {
    if (!truckId || !batteryModel) {
      toast({
        title: "Missing Information",
        description: "Please enter both Truck ID and Battery Model",
        variant: "destructive",
      });
      return;
    }

    // Simulate availability check
    const hasSlot = Math.random() > 0.3;
    const hasBattery = Math.random() > 0.4;

    if (hasSlot) {
      setCheckResult({
        available: true,
        type: "slot",
        details: `Slot #${Math.floor(Math.random() * 20) + 1} is available for charging`,
      });
    } else if (hasBattery) {
      setCheckResult({
        available: true,
        type: "battery",
        details: `Charged battery (Model: ${batteryModel}) is available for swap`,
      });
    } else {
      setCheckResult({
        available: false,
        type: null,
        details: "No slots or charged batteries available at the moment",
      });
    }
    setBookingConfirmed(false);
  };

  const handleBooking = () => {
    setBookingConfirmed(true);
    toast({
      title: "Booking Confirmed",
      description: `Booking confirmed for Truck ${truckId}`,
    });
  };

  const handleReset = () => {
    setTruckId("");
    setBatteryModel("");
    setCheckResult(null);
    setBookingConfirmed(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Truck Booking Request</h2>
        <p className="text-muted-foreground">Request a charging slot or battery swap</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="truckId">Truck ID</Label>
              <Input
                id="truckId"
                placeholder="Enter Truck ID (e.g., TRK-001)"
                value={truckId}
                onChange={(e) => setTruckId(e.target.value)}
                disabled={bookingConfirmed}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batteryModel">Battery Model</Label>
              <Input
                id="batteryModel"
                placeholder="Enter Battery Model (e.g., BT-500kWh)"
                value={batteryModel}
                onChange={(e) => setBatteryModel(e.target.value)}
                disabled={bookingConfirmed}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCheckAvailability}
                className="flex-1"
                disabled={bookingConfirmed}
              >
                Check Availability
              </Button>
              {(checkResult || bookingConfirmed) && (
                <Button onClick={handleReset} variant="outline">
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability Status</CardTitle>
          </CardHeader>
          <CardContent>
            {!checkResult && !bookingConfirmed && (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter truck details and check availability</p>
              </div>
            )}

            {checkResult && !bookingConfirmed && (
              <div className="space-y-4">
                <div
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    checkResult.available ? "bg-success/10" : "bg-destructive/10"
                  }`}
                >
                  {checkResult.available ? (
                    <CheckCircle2 className="h-6 w-6 text-success mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      {checkResult.available ? "Available!" : "Not Available"}
                    </h3>
                    <p className="text-sm text-muted-foreground">{checkResult.details}</p>
                  </div>
                </div>

                {checkResult.available && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      {checkResult.type === "slot" ? (
                        <Calendar className="h-4 w-4 text-primary" />
                      ) : (
                        <Battery className="h-4 w-4 text-primary" />
                      )}
                      <span className="text-muted-foreground">
                        Service Type:{" "}
                        <Badge variant="outline">
                          {checkResult.type === "slot" ? "Charging Slot" : "Battery Swap"}
                        </Badge>
                      </span>
                    </div>
                    <Button onClick={handleBooking} className="w-full">
                      Confirm Booking
                    </Button>
                  </div>
                )}
              </div>
            )}

            {bookingConfirmed && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-6 w-6 text-success mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Booking Confirmed!</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your booking has been successfully confirmed.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Truck ID:</span>
                        <span className="font-medium">{truckId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Battery Model:</span>
                        <span className="font-medium">{batteryModel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <Badge variant="outline">
                          {checkResult?.type === "slot" ? "Charging Slot" : "Battery Swap"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TruckBooking;
