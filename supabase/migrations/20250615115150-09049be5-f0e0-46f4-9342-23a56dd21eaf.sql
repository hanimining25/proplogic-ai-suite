
-- Create enum types for CRM module
CREATE TYPE public.client_status AS ENUM ('active', 'inactive', 'prospect');
CREATE TYPE public.contact_role AS ENUM ('primary', 'secondary', 'stakeholder');
CREATE TYPE public.comm_preference AS ENUM ('email', 'phone', 'linkedin', 'in-person');
CREATE TYPE public.activity_type AS ENUM ('meeting', 'call', 'email', 'proposal', 'contract', 'note');
CREATE TYPE public.opportunity_stage AS ENUM ('discovery', 'proposal', 'negotiation', 'closed-won', 'closed-lost');

-- Create clients table
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    industry TEXT,
    website TEXT,
    logo_url TEXT,
    status public.client_status NOT NULL DEFAULT 'prospect',
    health_score INT NOT NULL DEFAULT 80 CHECK (health_score >= 0 AND health_score <= 100),
    annual_revenue NUMERIC,
    employee_count INT,
    location TEXT,
    last_contact_date TIMESTAMPTZ,
    tags TEXT[],
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comments to columns for clarity
COMMENT ON COLUMN public.clients.health_score IS 'Client health score from 0 to 100';
COMMENT ON COLUMN public.clients.annual_revenue IS 'Estimated annual revenue of the client';

-- RLS for clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow org members to access clients" ON public.clients
    FOR ALL
    USING (org_id = public.get_my_org_id())
    WITH CHECK (org_id = public.get_my_org_id());

-- Create contacts table
CREATE TABLE public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    title TEXT,
    department TEXT,
    role public.contact_role NOT NULL DEFAULT 'secondary',
    linkedin_url TEXT,
    last_contact_date TIMESTAMPTZ,
    communication_preference public.comm_preference,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS for contacts
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow org members to access contacts" ON public.contacts
    FOR ALL
    USING ((SELECT org_id FROM public.clients WHERE id = contacts.client_id) = public.get_my_org_id())
    WITH CHECK ((SELECT org_id FROM public.clients WHERE id = contacts.client_id) = public.get_my_org_id());

-- Create client_activities table
CREATE TABLE public.client_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    type public.activity_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    date TIMESTAMPTZ NOT NULL,
    team_member TEXT,
    outcome TEXT,
    next_steps TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS for client_activities
ALTER TABLE public.client_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow org members to access activities" ON public.client_activities
    FOR ALL
    USING ((SELECT org_id FROM public.clients WHERE id = client_activities.client_id) = public.get_my_org_id())
    WITH CHECK ((SELECT org_id FROM public.clients WHERE id = client_activities.client_id) = public.get_my_org_id());

-- Create opportunities table
CREATE TABLE public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    value NUMERIC,
    stage public.opportunity_stage NOT NULL,
    probability INT CHECK (probability >= 0 AND probability <= 100),
    expected_close_date TIMESTAMPTZ,
    team_member TEXT,
    tags TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS for opportunities
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow org members to access opportunities" ON public.opportunities
    FOR ALL
    USING ((SELECT org_id FROM public.clients WHERE id = opportunities.client_id) = public.get_my_org_id())
    WITH CHECK ((SELECT org_id FROM public.clients WHERE id = opportunities.client_id) = public.get_my_org_id());

-- Link RFPs to clients
ALTER TABLE public.rfps ADD COLUMN client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL;
COMMENT ON COLUMN public.rfps.client_id IS 'Link to the client this RFP belongs to.';

-- Add trigger to update 'updated_at' timestamp on modification for all new tables
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER set_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER set_client_activities_updated_at
BEFORE UPDATE ON public.client_activities
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER set_opportunities_updated_at
BEFORE UPDATE ON public.opportunities
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

-- Also add the trigger to the existing rfps table for consistency
CREATE TRIGGER set_rfps_updated_at
BEFORE UPDATE ON public.rfps
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();
