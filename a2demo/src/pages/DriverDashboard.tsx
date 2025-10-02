import { useState } from "react";
import DashboardLayout from "@/components/Dashboard";
import KPICard from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Battery, Package, AlertCircle, MapPin, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Switch } from "@radix-ui/react-switch";

const DriverDashboard = () => {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [open, setOpen] = useState(false)

  const myTrucks = [
    { id: "TR-1234", model: "Tesla Semi", status: "Active", battery: 85, location: "Highway 101" },
    { id: "TR-5678", model: "Rivian EDV", status: "Charging", battery: 45, location: "Station A" },
  ];

  const deliveries = [
    { id: "DEL-001", from: "Warehouse A", to: "Store B", status: "In Transit", progress: 65, eta: "2:30 PM" },
    { id: "DEL-002", from: "Warehouse C", to: "Store D", status: "Pending", progress: 0, eta: "5:00 PM" },
    { id: "DEL-003", from: "Warehouse E", to: "Store F", status: "Completed", progress: 100, eta: "Delivered" },
  ];

  const notifications = [
    { type: "Warning", message: "Truck TR-5678 requires maintenance check", time: "30 min ago" },
    { type: "Info", message: "New delivery assigned to TR-1234", time: "1 hour ago" },
  ];



  return (
    <DashboardLayout title="Truck Owner/Driver Dashboard">
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="My Trucks"
              value="2"
              icon={Truck}
              color="primary"
            />
            <KPICard
              title="Active Deliveries"
              value="2"
              icon={Package}
              color="success"
            />
            <KPICard
              title="Avg Battery Level"
              value="65%"
              icon={Battery}
              color="warning"
            />
            <KPICard
              title="Alerts"
              value="1"
              icon={AlertCircle}
              color="danger"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Trucks */}
            <Card>
              <CardHeader>
                <CardTitle>My Trucks</CardTitle>
                <CardDescription>Monitor your fleet status</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {myTrucks.map((truck) => (
                    <div key={truck.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{truck.id}</h4>
                          <p className="text-sm text-muted-foreground">{truck.model}</p>
                        </div>
                        <Badge variant={truck.status === "Active" ? "default" : "secondary"}>
                          {truck.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Battery Level</span>
                          <span className="font-medium">{truck.battery}%</span>
                        </div>
                        <Progress value={truck.battery} className="h-2" />
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <MapPin className="h-4 w-4" />
                          <span>{truck.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedTruck(truck.id)}>
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="cursor-not-allowed">
                          <Settings className="h-4 w-4 "/>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Battery & Maintenance Status */}
            <Card>
              <CardHeader>
                <CardTitle>Battery & Maintenance</CardTitle>
                <CardDescription>Vehicle health overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Battery Health</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">TR-1234</span>
                        <Badge>Excellent</Badge>
                      </div>
                      <Progress value={95} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">TR-5678</span>
                        <Badge variant="secondary">Good</Badge>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Maintenance Schedule</h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">TR-5678 Service Due</span>
                          <Badge variant="outline">Upcoming</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Next service in 500 km</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">TR-1234 Inspection</span>
                          <Badge variant="outline">Scheduled</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Due: March 15, 2025</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => setShowMaintenanceDialog(true)}>Schedule Maintenance</Button>
                </div>
              </CardContent>
            </Card> 

            <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Truck / Device</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Truck & Configure IoT Device</DialogTitle>
        </DialogHeader>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* User Info */}
          <div>
            <Label>Full Name</Label>
            <Input placeholder="John Doe" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="john@example.com" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input type="tel" placeholder="+251-9-123-4567" />
          </div>
          <div>
            <Label>Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="shipper">Shipper</SelectItem>
                <SelectItem value="operator">Station Operator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Vehicle Plate</Label>
            <Input placeholder="ABC-12345" />
          </div>

          {/* IoT Config */}
          <div>
            <Label>Device ID</Label>
            <Input placeholder="Enter IoT Device ID" />
          </div>
          <div>
            <Label>Device Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gps">GPS Tracker</SelectItem>
                <SelectItem value="sensor">Cargo Sensor</SelectItem>
                <SelectItem value="camera">Camera Module</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Installation Date</Label>
            <Input type="date" />
          </div>
          <div className="flex items-center gap-2">
            <Label>Device Status</Label>
            <Switch />
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={() => setOpen(false)}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>


          </div>
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-6">
          {/* Active Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries</CardTitle>
              <CardDescription>Track ongoing and upcoming shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{delivery.id}</h4>
                        <p className="text-sm text-muted-foreground">
                          {delivery.from} → {delivery.to}
                        </p>
                      </div>
                      <Badge variant={
                        delivery.status === "In Transit" ? "default" :
                        delivery.status === "Completed" ? "outline" : "secondary"
                      }>
                        {delivery.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{delivery.progress}%</span>
                      </div>
                      <Progress value={delivery.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-muted-foreground">ETA</span>
                        <span className="font-medium">{delivery.eta}</span>
                        <Button className="cursor-not-allowed"><MapPin />Current Location</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notifications Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Important updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notif.type === 'Warning' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button size="lg" className="h-20 cursor-not-allowed">
              <Package className="mr-2 h-5 w-5 " />
              Start New Delivery
            </Button>
            <Button size="lg" variant="outline" className="h-20 cursor-not-allowed">
              <Battery className="mr-2 h-5 w-5" />
              Find Charging Station
            </Button>
            <Button size="lg" variant="outline" className="h-20 cursor-not-allowed">
              <AlertCircle className="mr-2 h-5 w-5" />
              Report Issue
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Truck Details Dialog */}
      <Dialog open={selectedTruck !== null} onOpenChange={() => setSelectedTruck(null)}>
       <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Truck Details - {selectedTruck}</DialogTitle>
            <DialogDescription>Detailed information about the truck</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Model</p>
                <p className="font-medium">{myTrucks.find(t => t.id === selectedTruck)?.model}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge>{myTrucks.find(t => t.id === selectedTruck)?.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Battery</p>
                <p className="font-medium">{myTrucks.find(t => t.id === selectedTruck)?.battery}%</p>
              </div>
              <div>
  <p className="text-sm text-muted-foreground">Location</p>
  <p className="font-medium flex items-center gap-1">
    {myTrucks.find(t => t.id === selectedTruck)?.location}
    <MapPin className="h-8 w-8 text-red-500 cursor-not-allowed" />
  </p>
</div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">Battery Level</p>
              <Progress value={myTrucks.find(t => t.id === selectedTruck)?.battery || 0} className="h-3" />
            </div>
          </div>
          <Button onClick={() => setSelectedTruck(null)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* Maintenance Dialog */}
      <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
            <DialogDescription>Request maintenance for your truck</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-2">Select Truck</p>
              <div className="space-y-2">
                {myTrucks.map((truck) => (
                  <Button key={truck.id} variant="outline" className="w-full justify-start">
                    {truck.id} - {truck.model}
                  </Button>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-2">Maintenance Type</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">Regular Service</Button>
                <Button variant="outline" className="w-full justify-start">Battery Check</Button>
                <Button variant="outline" className="w-full justify-start">Tire Inspection</Button>
              </div>
            </div>
          </div>
          <Button onClick={() => setShowMaintenanceDialog(false)}>Submit Request</Button>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DriverDashboard;
