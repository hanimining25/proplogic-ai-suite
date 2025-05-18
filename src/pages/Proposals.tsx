
import React from "react";
import { 
  Button,
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FileText, Plus, Search } from "lucide-react";

const Proposals = () => {
  // Sample data
  const proposals = [
    {
      id: "1",
      title: "IT Infrastructure Upgrade Proposal",
      client: "Ministry of Education",
      created: "May 10, 2025",
      status: "Draft",
      type: "Technical",
      author: "Ahmed Hassan"
    },
    {
      id: "2",
      title: "Digital Transformation Strategy",
      client: "Saudi Telecom",
      created: "May 8, 2025",
      status: "In Review",
      type: "Technical & Commercial",
      author: "Sara Al-Farsi"
    },
    {
      id: "3",
      title: "ERP Implementation Plan",
      client: "SABIC",
      created: "May 15, 2025",
      status: "Approved",
      type: "Technical",
      author: "Mohammed Adel"
    },
    {
      id: "4",
      title: "Cloud Migration Services Offer",
      client: "Saudi Aramco",
      created: "May 5, 2025",
      status: "Submitted",
      type: "Commercial",
      author: "Layla Mahmoud"
    },
    {
      id: "5",
      title: "Cybersecurity Assessment Proposal",
      client: "Saudi Airlines",
      created: "Apr 28, 2025",
      status: "Won",
      type: "Technical & Commercial",
      author: "Faisal Al-Otaibi"
    },
    {
      id: "6",
      title: "AI & Machine Learning Development",
      client: "KAUST",
      created: "May 12, 2025",
      status: "Draft",
      type: "Technical",
      author: "Nada Al-Qahtani"
    }
  ];

  const statusColors = {
    Draft: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "In Review": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    Approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Submitted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Won: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    Lost: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <h1 className="text-3xl font-bold mb-6">Proposal Management</h1>
        <div className="spotlight animate-spotlight bg-primary/20" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search proposals..."
            className="pl-10 py-2 pr-4 w-full bg-muted/50 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button className="w-full sm:w-auto">
          <FileText className="mr-2 h-4 w-4" /> Create New Proposal
        </Button>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Proposals</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="review">In Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Author</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposals.map((proposal) => (
                  <TableRow key={proposal.id}>
                    <TableCell className="font-medium">{proposal.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{proposal.client}</TableCell>
                    <TableCell className="hidden lg:table-cell">{proposal.created}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusColors[proposal.status as keyof typeof statusColors]}
                      >
                        {proposal.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{proposal.type}</TableCell>
                    <TableCell className="hidden lg:table-cell">{proposal.author}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Proposals;
