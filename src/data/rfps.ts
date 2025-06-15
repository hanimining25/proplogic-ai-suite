import { supabase } from '@/integrations/supabase/client';
import { TablesInsert } from '@/integrations/supabase/types';
import { toast } from 'sonner';
import * as z from 'zod';

export const newRfpFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  client_name: z.string().optional(),
  due_date: z.date().optional(),
});

export type NewRFPFormValues = z.infer<typeof newRfpFormSchema>;

export const getRfps = async () => {
  const { data, error } = await supabase
    .from('rfps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching RFPs:', error);
    toast.error("Failed to fetch RFPs", { description: error.message });
    throw error;
  }

  return data;
};

export const createRfp = async (values: NewRFPFormValues, file: File | null) => {
    const { data: orgId, error: orgIdError } = await supabase.rpc('get_my_org_id');
    if (orgIdError || !orgId) {
        console.error('Error getting organization ID:', orgIdError);
        throw new Error('Could not determine your organization.');
    }

    let documentUrl: string | null = null;
    
    if (file) {
        const filePath = `${orgId}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
            .from('rfp-documents')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            throw new Error('Failed to upload RFP document.');
        }

        const { data: urlData } = supabase.storage
            .from('rfp-documents')
            .getPublicUrl(filePath);
        
        documentUrl = urlData.publicUrl;
    }

    const newRfpData: TablesInsert<'rfps'> = {
        title: values.title,
        client_name: values.client_name,
        due_date: values.due_date?.toISOString(),
        org_id: orgId,
        document_url: documentUrl,
    };
    
    const { data, error } = await supabase
        .from('rfps')
        .insert(newRfpData)
        .select()
        .single();
    
    if (error) {
        console.error('Error creating RFP:', error);
        throw error;
    }

    return data;
};

export const getRfpById = async (id: string) => {
  const { data, error } = await supabase
    .from('rfps')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching RFP with id ${id}:`, error);
    toast.error("Failed to fetch RFP details", { description: error.message });
    throw error;
  }

  return data;
};

export const deleteRfp = async (id: string) => {
  const { error } = await supabase.from('rfps').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting RFP with id ${id}:`, error);
    toast.error("Failed to delete RFP", { description: error.message });
    throw error;
  }
  
  // No success toast here, it will be handled in the component
  // to provide better context to the user.
  return { success: true };
};

export const updateRfpStatus = async ({ id, status }: { id: string, status: string }) => {
  const { data, error } = await supabase
    .from('rfps')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating RFP status for id ${id}:`, error);
    toast.error("Failed to update RFP status", { description: error.message });
    throw error;
  }
  
  toast.success("RFP status updated successfully.");
  return data;
};
