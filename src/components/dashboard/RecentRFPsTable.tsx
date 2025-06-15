
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
import { Tables } from "@/integrations/supabase/types";
import { format } from "date-fns";

type RFP = Tables<'rfps'>;

interface RecentRFPsTableProps {
  rfps: RFP[];
  className?: string;
}

const statusColors: { [key: string]: string } = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  in_progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  submitted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  won: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  lost: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

const RecentRFPsTable = ({ rfps, className }: RecentRFPsTableProps) => {
  const capitalize = (s: string) => {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
  }

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {rfps.map((rfp) => (
              <TableRow key={rfp.id}>
                <TableCell className="font-medium">{rfp.title}</TableCell>
                <TableCell>{rfp.client_name || 'N/A'}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {rfp.due_date ? format(new Date(rfp.due_date), 'PP') : 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(statusColors[rfp.status] || "")}
                  >
                    {capitalize(rfp.status)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {rfp.relevance_score ? (
                    <div className="flex items-center">
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full",
                            rfp.relevance_score >= 80
                              ? "bg-emerald-500"
                              : rfp.relevance_score >= 60
                              ? "bg-green-500"
                              : rfp.relevance_score >= 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${rfp.relevance_score}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs">{rfp.relevance_score}%</span>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentRFPsTable;
