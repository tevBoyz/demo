import { useState } from "react";
import DashboardLayout from "@/components/Dashboard";
import KPICard from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, MapPin, Clock, CheckCircle, Plus, Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import mapp from '@/assets/eth-dji-map-2.png'

const ShipperDashboard = () => {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [showSupportDialog, setShowSupportDialog] = useState<string | null>(null);

  const orders = [
    { id: "ORD-001", item: "Electronics", from: "Warehouse A", to: "Store B", status: "In Transit", date: "Mar 1, 2025" },
    { id: "ORD-002", item: "Furniture", from: "Warehouse C", to: "Store D", status: "Pending", date: "Mar 2, 2025" },
    { id: "ORD-003", item: "Clothing", from: "Warehouse E", to: "Store F", status: "Delivered", date: "Feb 28, 2025" },
    { id: "ORD-004", item: "Food Items", from: "Warehouse G", to: "Store H", status: "In Transit", date: "Mar 1, 2025" },
  ];

  return (
    <DashboardLayout title="Item Owner/Shipper Dashboard">
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total Orders"
              value="48"
              icon={Package}
              trend="+5 this week"
              trendUp={true}
              color="primary"
            />
            <KPICard
              title="In Transit"
              value="12"
              icon={Clock}
              color="warning"
            />
            <KPICard
              title="Delivered"
              value="34"
              icon={CheckCircle}
              color="success"
            />
            <KPICard
              title="Pending"
              value="2"
              icon={MapPin}
              color="danger"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-primary/20 hover:border-primary transition-colors cursor-pointer" onClick={() => setShowRequestDialog(true)}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Request New Delivery</h3>
                    <p className="text-sm text-muted-foreground">Schedule a new shipment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="border-2 border-primary/20 hover:border-primary transition-colors cursor-pointer" onClick={() => setShowLocationDialog(true)}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Show Item Location</h3>
                    <p className="text-sm text-muted-foreground">Track your shipments in real-time</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Track Shipment */}
          <Card className="cursor-not-allowed">
            <CardHeader>
              <CardTitle>Track Shipment</CardTitle>
              <CardDescription>Enter order ID to track your delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input placeholder="Enter Order ID (e.g., ORD-001)" className="flex-1 cursor-not-allowed" />
                <Button className="cursor-not-allowed">Track</Button>
              </div>
              <div className="mt-6 p-6 rounded-lg bg-muted/30 border-2 border-dashed">
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <Map className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Enter an order ID to view tracking information</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {/* My Orders */}
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>View and manage your shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{order.id}</h4>
                        <p className="text-sm text-muted-foreground">{order.item}</p>
                      </div>
                      <Badge variant={
                        order.status === "Delivered" ? "outline" :
                        order.status === "In Transit" ? "default" : "secondary"
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">From: </span>
                        <span className="font-medium">{order.from}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">To: </span>
                        <span className="font-medium">{order.to}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date: </span>
                        <span className="font-medium">{order.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>View Details</Button>
                      <Button variant="outline" size="sm" onClick={() => setShowLocationDialog(true)}>
                        <MapPin className="h-4 w-4 mr-1" />
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          {/* Support Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Support & Helpdesk</CardTitle>
              <CardDescription>Get assistance with your deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setShowSupportDialog('issue')}>
                  <Package className="h-5 w-5" />
                  <span>Report Issue</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setShowSupportDialog('status')}>
                  <Clock className="h-5 w-5" />
                  <span>Delivery Status</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setShowSupportDialog('contact')}>
                  <MapPin className="h-5 w-5" />
                  <span>Contact Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Request Delivery Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Request New Delivery</DialogTitle>
            <DialogDescription>Fill in the details to schedule a new shipment</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Item Description</Label>
              <Input placeholder="Enter item description" />
            </div>
            <div className="space-y-2">
              <Label>Pickup Location</Label>
              <Input placeholder="Enter pickup address" />
            </div>
            <div className="space-y-2">
              <Label>Delivery Location</Label>
              <Input placeholder="Enter delivery address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Delivery Date</Label>
                <Input type="date" />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowRequestDialog(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => {
              setShowRequestDialog(false);
              // Show success toast here
            }}>
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={selectedOrder !== null} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Complete information about your order</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Item</p>
                <p className="font-medium">{selectedOrder?.item}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge>{selectedOrder?.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium">{selectedOrder?.from}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium">{selectedOrder?.to}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{selectedOrder?.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tracking ID</p>
                <p className="font-medium">{selectedOrder?.id}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-2">Delivery Timeline</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Placed</span>
                  <span>{selectedOrder?.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span>Mar 5, 2025</span>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => setSelectedOrder(null)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* Show Location Dialog */}
<Dialog open={showLocationDialog} onOpenChange={(open) => setShowLocationDialog(open)}>
  <DialogContent className="sm:max-w-2xl">
    <DialogHeader>
      <DialogTitle>Item Location Tracking</DialogTitle>
      <DialogDescription>Real-time location of your shipment (static preview)</DialogDescription>
    </DialogHeader>

    {/* You can update these coords to whatever location you want */}
    {/* Example: lat/lng for San Francisco: 37.7749,-122.4194 */}
    {/* If you have dynamic coords, replace these constants with your state/props */}
    {(() => {
      const lat = 37.7749;
      const lng = -122.4194;
      const zoom = 13;
      const size = "1200x600"; // width x height in px (service limits apply)
      // OpenStreetMap static tile-based service that supports a marker param
      return (
        <div className="py-4">
          <div className="relative h-96 w-full rounded-lg overflow-hidden border">
            <img
              src={mapp}
              alt={`Map showing location at ${lat}, ${lng}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Optional small overlay showing text about the location */}
            <div className="absolute bottom-4 left-4 bg-white/80 text-sm rounded-md px-3 py-2 shadow-sm">
              <div className="font-medium">Current Location</div>
              <div className="text-xs text-muted-foreground">{`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`}</div>
            </div>
          </div>
        </div>
      );
    })()}

    <div className="mt-4 flex justify-end">
      <Button onClick={() => setShowLocationDialog(false)}>Close</Button>
    </div>
  </DialogContent>
</Dialog>




      {/* Support Dialogs */}
      <Dialog open={showSupportDialog !== null} onOpenChange={() => setShowSupportDialog(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {showSupportDialog === 'issue' && 'Report an Issue'}
              {showSupportDialog === 'status' && 'Check Delivery Status'}
              {showSupportDialog === 'contact' && 'Contact Support'}
            </DialogTitle>
            <DialogDescription>
              {showSupportDialog === 'issue' && 'Describe the issue you\'re experiencing'}
              {showSupportDialog === 'status' && 'Get updates on your delivery'}
              {showSupportDialog === 'contact' && 'Reach out to our support team'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {showSupportDialog === 'issue' && (
              <>
                <div>
                  <Label>Order ID</Label>
                  <Input placeholder="Enter order ID" />
                </div>
                <div>
                  <Label>Issue Description</Label>
                  <Input placeholder="Describe your issue" />
                </div>
              </>
            )}
            {showSupportDialog === 'status' && (
              <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                <p className="text-sm font-medium">Recent Orders</p>
                {orders.slice(0, 2).map((order) => (
                  <div key={order.id} className="flex justify-between items-center">
                    <span className="text-sm">{order.id}</span>
                    <Badge variant={order.status === "In Transit" ? "default" : "outline"}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            {showSupportDialog === 'contact' && (
              <>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Input placeholder="How can we help?" />
                </div>
              </>
            )}
          </div>
          <Button onClick={() => setShowSupportDialog(null)}>
            {showSupportDialog === 'issue' ? 'Submit Issue' : 
             showSupportDialog === 'status' ? 'Close' : 'Send Message'}
          </Button>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ShipperDashboard;