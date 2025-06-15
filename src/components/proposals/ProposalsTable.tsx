import React from 'react';
import { Proposal } from '@/types/dashboard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

const statusVariantMap: { [key in Proposal['status']]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    draft: 'secondary',
    submitted: 'default',
    pending: 'default',
    won: 'outline',
    lost: 'destructive',
};

const wonClass = 'border-green-600 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-500 dark:bg-green-950 dark:text-green-400';

interface ProposalsTableProps {
  proposals: Proposal[];
}

export const ProposalsTable: React.FC<ProposalsTableProps> = ({ proposals }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Client</TableHead>
          <TableHead className="text-right">Value</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Probability</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposals.map((proposal) => (
          <TableRow key={proposal.id}>
            <TableCell className="font-medium">{proposal.title}</TableCell>
            <TableCell>{proposal.client}</TableCell>
            <TableCell className="text-right">{formatCurrency(proposal.value)}</TableCell>
            <TableCell>
              <Badge 
                variant={statusVariantMap[proposal.status]}
                className={cn(proposal.status === 'won' && wonClass)}
              >
                {proposal.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{proposal.probability}%</TableCell>
            <TableCell>{format(new Date(proposal.deadline), 'PP')}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => console.log('View proposal details for:', proposal.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
