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
import { DollarSign, CheckCircle2, Clock, Send } from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: number;
  truckId: string;
  service: string;
  amount: number;
  status: "paid" | "pending";
  date: string;
}

const PaymentBilling = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      truckId: "TRK-8901",
      service: "Battery Swap",
      amount: 350,
      status: "paid",
      date: "2025-10-03 08:30",
    },
    {
      id: 2,
      truckId: "TRK-7823",
      service: "Fast Charge",
      amount: 280,
      status: "pending",
      date: "2025-10-03 09:15",
    },
    {
      id: 3,
      truckId: "TRK-6745",
      service: "Battery Swap",
      amount: 350,
      status: "pending",
      date: "2025-10-03 10:45",
    },
    {
      id: 4,
      truckId: "TRK-5667",
      service: "Standard Charge",
      amount: 180,
      status: "paid",
      date: "2025-10-03 11:20",
    },
    {
      id: 5,
      truckId: "TRK-4523",
      service: "Battery Swap",
      amount: 350,
      status: "pending",
      date: "2025-10-03 12:00",
    },
  ]);

  const sendReminder = (truckId: string) => {
    toast.success(`Payment reminder sent to ${truckId}`);
  };

  const totalPending = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPaid = transactions
    .filter((t) => t.status === "paid")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Payment & Billing</h2>
        <p className="text-muted-foreground">Track transactions and manage payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalPaid}</p>
                <p className="text-sm text-muted-foreground">Total Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalPending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalPaid + totalPending}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Truck ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono font-semibold">
                      {transaction.truckId}
                    </TableCell>
                    <TableCell>{transaction.service}</TableCell>
                    <TableCell className="font-semibold">${transaction.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                    <TableCell>
                      {transaction.status === "paid" ? (
                        <Badge className="bg-success text-success-foreground">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-warning border-warning">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendReminder(transaction.truckId)}
                        >
                          <Send className="h-3 w-3 mr-2" />
                          Send Reminder
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

export default PaymentBilling;