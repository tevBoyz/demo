import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, XCircle, Info } from "lucide-react";

const TruckCompatibility = () => {
  const [truckId, setTruckId] = useState("");
  const [checkResult, setCheckResult] = useState<{
    compatible: boolean;
    truckModel?: string;
    batteryModel?: string;
  } | null>(null);

  const compatibleTrucks = ["TRK-8901", "TRK-7823", "TRK-6745", "TRK-5667"];
  const supportedBatteries = [
    "BAT-Series-3000 (400kWh)",
    "BAT-Series-3500 (450kWh)",
    "BAT-Series-4000 (500kWh)",
  ];

  const checkCompatibility = () => {
    const isCompatible = compatibleTrucks.includes(truckId.toUpperCase());
    setCheckResult({
      compatible: isCompatible,
      truckModel: isCompatible ? "Volvo FH Electric" : "Unknown Model",
      batteryModel: isCompatible ? "BAT-Series-3500" : "N/A",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Truck Compatibility Check</h2>
        <p className="text-muted-foreground">Verify truck compatibility with station equipment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Check Truck Compatibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter Truck ID (e.g., TRK-8901)"
              value={truckId}
              onChange={(e) => setTruckId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={checkCompatibility} disabled={!truckId}>
              <Search className="h-4 w-4 mr-2" />
              Check
            </Button>
          </div>

          {checkResult && (
            <Card className={`border-2 ${checkResult.compatible ? "border-success" : "border-destructive"}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {checkResult.compatible ? (
                    <div className="p-3 rounded-full bg-success/10">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                  ) : (
                    <div className="p-3 rounded-full bg-destructive/10">
                      <XCircle className="h-8 w-8 text-destructive" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      {checkResult.compatible ? "✅ Compatible" : "❌ Not Compatible"}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <span className="text-sm text-muted-foreground">Truck ID:</span>
                        <span className="text-sm font-mono font-semibold">{truckId.toUpperCase()}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-sm text-muted-foreground">Truck Model:</span>
                        <span className="text-sm font-semibold">{checkResult.truckModel}</span>
                      </div>
                      {checkResult.compatible && (
                        <div className="flex gap-2">
                          <span className="text-sm text-muted-foreground">Recommended Battery:</span>
                          <Badge variant="outline" className="text-primary border-primary">
                            {checkResult.batteryModel}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Supported Battery Models
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This charging station supports the following battery models:
          </p>
          <div className="space-y-2">
            {supportedBatteries.map((battery, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium">{battery}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compatible Truck IDs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {compatibleTrucks.map((truck) => (
              <Badge key={truck} variant="outline" className="justify-center py-2 text-sm font-mono">
                {truck}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TruckCompatibility;