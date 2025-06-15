
import { supabase } from '@/integrations/supabase/client';
import { TablesUpdate } from '@/integrations/supabase/types';
import { toast } from 'sonner';

export const getOrganization = async () => {
  const { data: orgId, error: orgIdError } = await supabase.rpc('get_my_org_id');

  if (orgIdError || !orgId) {
    console.error('Error getting organization ID:', orgIdError);
    toast.error('Could not determine your organization.');
    throw new Error('Could not determine your organization.');
  }

  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', orgId)
    .single();
  
  if (error) {
    console.error('Error fetching organization:', error);
    toast.error('Failed to fetch organization details.');
    throw error;
  }

  return data;
};

export const updateOrganization = async (orgData: TablesUpdate<'organizations'>) => {
    const { data: orgId, error: orgIdError } = await supabase.rpc('get_my_org_id');

    if (orgIdError || !orgId) {
      console.error('Error getting organization ID:', orgIdError);
      toast.error('Could not determine your organization.');
      throw new Error('Could not determine your organization.');
    }
    
    const { data, error } = await supabase
        .from('organizations')
        .update(orgData)
        .eq('id', orgId)
        .select()
        .single();
    
    if (error) {
        console.error('Error updating organization:', error);
        toast.error('Failed to update organization details.');
        throw error;
    }

    toast.success('Organization details updated successfully.');
    return data;
};
