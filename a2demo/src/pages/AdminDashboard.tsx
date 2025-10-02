import DashboardLayout from "@/components/Dashboard";
import KPICard from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Users, AlertTriangle, DollarSign, Search, MoreVertical, TrendingUp, Activity, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import trendImg from '@/assets/trend.png';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


const AdminDashboard = () => {
  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "Driver", status: "Active", trucks: 2 },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Shipper", status: "Active", trucks: 0 },
    { id: 3, name: "Mike Williams", email: "mike@example.com", role: "Driver", status: "Inactive", trucks: 1 },
    { id: 4, name: "Emma Davis", email: "emma@example.com", role: "Station Operator", status: "Active", trucks: 0 },
  ];

  const alerts = [
    { id: 1, type: "Critical", message: "Truck #1234 battery low - 15%", time: "5 min ago" },
    { id: 2, type: "Warning", message: "Delivery delayed on Route A", time: "20 min ago" },
    { id: 3, type: "Info", message: "New user registered", time: "1 hour ago" },
  ];

const pendingOrders = [
  { id: 101, customer: "Alice Johnson", details: "Shipment awaiting pickup" },
  { id: 102, customer: "Bob Smith", details: "Order created, pending approval" },
];

const activeOrders = [
  { id: 201, customer: "Daniel Lee", details: "Truck en route to destination", location: "Addis Ababa" },
  { id: 202, customer: "Maria Gomez", details: "Shipment in transit", location: "Adama" },
];

const completedOrders = [
  { id: 301, customer: "James Carter", details: "Delivered successfully" },
  { id: 302, customer: "Sophia Brown", details: "Shipment completed" },
];


const [openAddUser, setOpenAddUser] = useState(false);
const [trucks, setTrucks] = useState<string[]>([""]);

const addTruckField = () => setTrucks([...trucks, ""]);
const updateTruckField = (i: number, value: string) => {
  const newTrucks = [...trucks];
  newTrucks[i] = value;
  setTrucks(newTrucks);
};

  return (
    <DashboardLayout title="Admin Dashboard">
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total Trucks"
              value="48"
              icon={Truck}
              trend="+12% from last month"
              trendUp={true}
              color="primary"
            />
            <KPICard
              title="Active Routes"
              value="23"
              icon={Activity}
              trend="+8% from last month"
              trendUp={true}
              color="success"
            />
            <KPICard
              title="Active Alerts"
              value="5"
              icon={AlertTriangle}
              trend="-3 from yesterday"
              trendUp={true}
              color="warning"
            />
            <KPICard
              title="Monthly Revenue"
              value="$248K"
              icon={DollarSign}
              trend="+28% from last month"
              trendUp={true}
              color="success"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Analytics Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue & Utilization Trends</CardTitle>
                <CardDescription>Monthly overview of fleet performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <img src={trendImg} alt="Trend Img" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>System notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'Critical' ? 'bg-red-500' :
                        alert.type === 'Warning' ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full cursor-not-allowed">View All Alerts</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
  {/* Pending Orders */}
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>Pending Orders</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Pending Order ID..." className="pl-10" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.details}</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>

  {/* Active Orders */}
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>Active Orders</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Active Order ID..." className="pl-10" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>s
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.details}</TableCell>
              <TableCell className="flex items-center gap-1">
                <Button className="w-30 cursor-not-allowed"><MapPin className="h-4 w-4 text-red-500" /> {order.location}</Button>
              </TableCell>
              <TableCell>
                <Badge variant="default">Active</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>

  {/* Completed Orders */}
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>Completed Orders</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Completed Order ID..." className="pl-10" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {completedOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.details}</TableCell>
              <TableCell>
                <Badge variant="default">Completed</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
        </TabsContent>



        <TabsContent value="users" className="space-y-6">
          {/* Users Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users Management</CardTitle>
                  <CardDescription>Manage all system users and roles</CardDescription>
                </div>
                <Button onClick={() => setOpenAddUser(true)}>Add User</Button>

              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Trucks</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.trucks}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Dialog open={openAddUser} onOpenChange={setOpenAddUser}>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>Add New User</DialogTitle>
      <DialogDescription>Fill in user details below</DialogDescription>
    </DialogHeader>
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>First Name</Label>
          <Input placeholder="Enter first name" />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input placeholder="Enter last name" />
        </div>
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" placeholder="Enter email address" />
      </div>
      <div>
        <Label>Address</Label>
        <Input placeholder="Enter address" />
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
            <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
        </Select>
       </div>

      <div>
        <Label>Birth Date</Label>
        <Input type="date" />
      </div>

      {/* Dynamic Truck Fields */}
      <div>
        <Label>Trucks</Label>
        <div className="space-y-2">
          {trucks.map((truck, i) => (
            <Input
              key={i}
              placeholder={`Truck #${i + 1}`}
              value={truck}
              onChange={(e) => updateTruckField(i, e.target.value)}
            />
          ))}
          <Button type="button" variant="outline" onClick={addTruckField}>
            + Add Another Truck
          </Button>
        </div>
      </div>
    </form>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpenAddUser(false)}>Cancel</Button>
      <Button type="submit">Save User</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex flex-col gap-2 cursor-not-allowed">
                  <AlertTriangle className="h-6 w-6" />
                  <span>Alert Configuration</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2 cursor-not-allowed">
                  <Users className="h-6 w-6" />
                  <span>User Permissions</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2 cursor-not-allowed">
                  <Truck className="h-6 w-6" />
                  <span>Fleet Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;