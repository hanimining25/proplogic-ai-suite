
-- Helper function to get the current user's organization ID securely
CREATE OR REPLACE FUNCTION public.get_my_org_id()
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  org_id_result UUID;
BEGIN
  SELECT org_id INTO org_id_result
  FROM public.members
  WHERE user_id = auth.uid()
  LIMIT 1;
  RETURN org_id_result;
END;
$$;

-- Enable Row Level Security (RLS) on organizations and members table
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Policies for organizations table
CREATE POLICY "Users can view their own organization" ON public.organizations
  FOR SELECT
  USING (id = public.get_my_org_id());

-- Policies for members table
CREATE POLICY "Users can view members of their own organization" ON public.members
  FOR SELECT
  USING (org_id = public.get_my_org_id());

-- Create a new type for RFP status
CREATE TYPE public.rfp_status AS ENUM ('new', 'in_progress', 'submitted', 'won', 'lost', 'archived');

-- Create the rfps table
CREATE TABLE public.rfps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  client_name TEXT,
  due_date TIMESTAMPTZ,
  status public.rfp_status NOT NULL DEFAULT 'new',
  document_url TEXT,
  summary TEXT,
  relevance_score INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on the rfps table
ALTER TABLE public.rfps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rfps table
CREATE POLICY "Organization members can view RFPs" ON public.rfps
  FOR SELECT
  USING (org_id = public.get_my_org_id());

CREATE POLICY "Organization members can insert RFPs" ON public.rfps
  FOR INSERT
  WITH CHECK (org_id = public.get_my_org_id());

CREATE POLICY "Organization members can update RFPs" ON public.rfps
  FOR UPDATE
  USING (org_id = public.get_my_org_id());

CREATE POLICY "Admins can delete RFPs" ON public.rfps
  FOR DELETE
  USING (
    org_id = public.get_my_org_id() AND
    EXISTS (
      SELECT 1 FROM public.members
      WHERE members.user_id = auth.uid() AND members.role = 'admin'
    )
  );

-- Create a storage bucket for RFP documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('rfp-documents', 'rfp-documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for storage objects in the rfp-documents bucket
CREATE POLICY "Org members can view their documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'rfp-documents' AND
  public.get_my_org_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Org members can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'rfp-documents' AND
  public.get_my_org_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Org members can update their documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'rfp-documents' AND
  public.get_my_org_id()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Org admins can delete documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'rfp-documents' AND
  public.get_my_org_id()::text = (storage.foldername(name))[1] AND
  EXISTS (
      SELECT 1 FROM public.members
      WHERE members.user_id = auth.uid() AND members.role = 'admin'
    )
);

