
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteRfp, updateRfpStatus } from '@/data/rfps';
import { Tables } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type RFP = Tables<'rfps'>;

interface RFPTableRowActionsProps {
  rfp: RFP;
}

const statuses = ['new', 'in_progress', 'submitted', 'won', 'lost', 'archived'];
const capitalize = (s: string) => {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
};

export function RFPTableRowActions({ rfp }: RFPTableRowActionsProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteRfp,
    onSuccess: () => {
      toast.success(`RFP "${rfp.title}" has been deleted.`);
      queryClient.invalidateQueries({ queryKey: ['rfps'] });
      setIsDeleteDialogOpen(false);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateRfpStatus,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['rfps'] });
        queryClient.invalidateQueries({ queryKey: ['rfp', rfp.id] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(rfp.id);
  };

  const handleStatusChange = (status: string) => {
    if (status !== rfp.status) {
        updateStatusMutation.mutate({ id: rfp.id, status: status as Tables<'rfps'>['status'] });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate(`/rfps/${rfp.id}`)}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Edit className="mr-2 h-4 w-4" />
            Edit RFP
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <span>Change Status</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={rfp.status} onValueChange={handleStatusChange}>
                        {statuses.map(status => (
                            <DropdownMenuRadioItem key={status} value={status}>
                                {capitalize(status)}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete RFP
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the RFP "{rfp.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
