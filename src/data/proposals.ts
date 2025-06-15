
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Proposal } from '@/types/dashboard';
import { Tables } from '@/integrations/supabase/types';

type ProposalWithClient = Tables<'proposals'> & {
  clients: { name: string } | null;
};

export const getProposals = async (): Promise<Proposal[]> => {
  const { data, error } = await supabase
    .from('proposals')
    .select(`
      *,
      clients ( name )
    `);

  if (error) {
    console.error('Error fetching proposals:', error);
    toast.error("Failed to fetch proposals", { description: error.message });
    throw error;
  }

  if (!data) {
    return [];
  }

  const proposals: Proposal[] = (data as ProposalWithClient[]).map((p) => ({
    id: p.id,
    title: p.title,
    client: p.clients?.name ?? 'Unknown Client',
    value: p.value ?? 0,
    status: p.status as Proposal['status'],
    probability: p.probability ?? 0,
    deadline: p.deadline ?? new Date().toISOString(),
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    rfpId: p.rfp_id ?? undefined,
  }));

  return proposals;
};
