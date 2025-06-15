
import { supabase } from '@/integrations/supabase/client';
import { TablesInsert } from '@/integrations/supabase/types';
import { toast } from 'sonner';

export type NewRFPFormValues = {
  title: string;
  client_name?: string;
  due_date?: Date;
}

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
        ...values,
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
