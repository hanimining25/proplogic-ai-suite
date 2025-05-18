
import React from "react";
import { 
  Button,
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Plus, Search, User } from "lucide-react";

const CRM = () => {
  // Sample data
  const clients = [
    {
      id: "1",
      name: "Saudi Aramco",
      contact: "Ahmed Al-Ghamdi",
      email: "ahmed.ghamdi@aramco.com",
      phone: "+966 50 123 4567",
      status: "Active",
      healthScore: 85,
      lastContact: "2 days ago"
    },
    {
      id: "2",
      name: "SABIC",
      contact: "Fatima Mohammed",
      email: "fatima.m@sabic.com",
      phone: "+966 55 987 6543",
      status: "Active",
      healthScore: 92,
      lastContact: "Today"
    },
    {
      id: "3",
      name: "Saudi Telecom",
      contact: "Khalid Al-Saud",
      email: "k.alsaud@stc.com.sa",
      phone: "+966 59 456 7890",
      status: "Inactive",
      healthScore: 45,
      lastContact: "3 weeks ago"
    },
    {
      id: "4",
      name: "Ministry of Education",
      contact: "Norah Al-Yahya",
      email: "n.alyahya@moe.gov.sa",
      phone: "+966 54 789 0123",
      status: "Active",
      healthScore: 78,
      lastContact: "1 week ago"
    },
    {
      id: "5",
      name: "Saudi Airlines",
      contact: "Omar Saeed",
      email: "omar.saeed@saudia.com",
      phone: "+966 56 321 4567",
      status: "Active",
      healthScore: 63,
      lastContact: "4 days ago"
    }
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <h1 className="text-3xl font-bold mb-6">CRM</h1>
        <div className="spotlight animate-spotlight bg-primary/20" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients..."
            className="pl-10 py-2 pr-4 w-full bg-muted/50 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add New Client
        </Button>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead className="hidden md:table-cell">Last Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{client.contact}</TableCell>
                  <TableCell className="hidden lg:table-cell">{client.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">{client.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        client.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      )}
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full max-w-[100px] h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full",
                            getHealthScoreColor(client.healthScore)
                          )}
                          style={{ width: `${client.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs">{client.healthScore}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{client.lastContact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRM;
