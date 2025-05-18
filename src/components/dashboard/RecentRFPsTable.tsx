
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RFP {
  id: string;
  title: string;
  client: string;
  deadline: string;
  status: "New" | "Reviewing" | "In Progress" | "Submitted" | "Won" | "Lost";
  relevance: number;
  value: string;
}

interface RecentRFPsTableProps {
  rfps: RFP[];
  className?: string;
}

const statusColors = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Reviewing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Submitted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Won: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  Lost: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const RecentRFPsTable = ({ rfps, className }: RecentRFPsTableProps) => {
  return (
    <Card className={cn("col-span-full", className)}>
      <CardHeader>
        <CardTitle>Recent RFPs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="hidden md:table-cell">Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Relevance</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rfps.map((rfp) => (
              <TableRow key={rfp.id}>
                <TableCell className="font-medium">{rfp.title}</TableCell>
                <TableCell>{rfp.client}</TableCell>
                <TableCell className="hidden md:table-cell">{rfp.deadline}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusColors[rfp.status]}
                  >
                    {rfp.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full",
                          rfp.relevance >= 80
                            ? "bg-emerald-500"
                            : rfp.relevance >= 60
                            ? "bg-green-500"
                            : rfp.relevance >= 40
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        )}
                        style={{ width: `${rfp.relevance}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs">{rfp.relevance}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{rfp.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentRFPsTable;
