
-- Phase 1: Database Schema Updates for Dashboard & CRM Insights (Corrected)

-- Create custom types (enums) for status, priority, etc.
-- Note: These types might already exist from a partial run of the previous script.
-- The IF NOT EXISTS clause will prevent errors if they do.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'proposal_status') THEN
        CREATE TYPE public.proposal_status AS ENUM ('draft', 'submitted', 'pending', 'won', 'lost', 'archived');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'dashboard_activity_type') THEN
        CREATE TYPE public.dashboard_activity_type AS ENUM ('proposal_created', 'deadline_approaching', 'status_changed', 'rfp_discovered', 'ai_suggestion');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_priority') THEN
        CREATE TYPE public.activity_priority AS ENUM ('high', 'medium', 'low');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'insight_type') THEN
        CREATE TYPE public.insight_type AS ENUM ('opportunity', 'risk', 'optimization');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'client_risk_level') THEN
        CREATE TYPE public.client_risk_level AS ENUM ('low', 'medium', 'high');
    END IF;
END$$;


-- Table for proposals (related to RFPs and dashboard)
CREATE TABLE IF NOT EXISTS public.proposals (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    rfp_id UUID REFERENCES public.rfps(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    value NUMERIC,
    status proposal_status NOT NULL DEFAULT 'draft',
    probability INTEGER,
    deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Add a trigger to automatically update the 'updated_at' timestamp
DROP TRIGGER IF EXISTS handle_proposal_updated_at ON public.proposals;
CREATE TRIGGER handle_proposal_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
-- Enable Row Level Security and set policy
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage proposals for their own org" ON public.proposals;
CREATE POLICY "Users can manage proposals for their own org" ON public.proposals FOR ALL USING (org_id = public.get_my_org_id());


-- Table for general activities (dashboard activity feed)
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    type dashboard_activity_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_name TEXT,
    priority activity_priority NOT NULL DEFAULT 'medium'
);
-- Enable Row Level Security and set policy
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view activities for their own org" ON public.activities;
CREATE POLICY "Users can view activities for their own org" ON public.activities FOR ALL USING (org_id = public.get_my_org_id());


-- Table for AI insights
CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    type insight_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    confidence INTEGER,
    priority activity_priority NOT NULL DEFAULT 'medium',
    actionable BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Enable Row Level Security and set policy
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view AI insights for their own org" ON public.ai_insights;
CREATE POLICY "Users can view AI insights for their own org" ON public.ai_insights FOR ALL USING (org_id = public.get_my_org_id());


-- Table for Client Health (CRM)
CREATE TABLE IF NOT EXISTS public.client_health (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE UNIQUE,
    overall_score INTEGER,
    engagement_score INTEGER,
    satisfaction_score INTEGER,
    revenue_score INTEGER,
    risk_level client_risk_level,
    last_updated TIMESTAMPTZ,
    factors JSONB,
    recommendations JSONB
);
-- Enable Row Level Security and set policy
ALTER TABLE public.client_health ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage client health for their own org" ON public.client_health;
CREATE POLICY "Users can manage client health for their own org" ON public.client_health FOR ALL USING (org_id = public.get_my_org_id());


-- Table for Client Insights (CRM)
CREATE TABLE IF NOT EXISTS public.client_insights (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE UNIQUE,
    revenue JSONB,
    engagement JSONB,
    satisfaction JSONB,
    opportunities JSONB,
    risks JSONB,
    strengths JSONB,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Enable Row Level Security and set policy
ALTER TABLE public.client_insights ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage client insights for their own org" ON public.client_insights;
CREATE POLICY "Users can manage client insights for their own org" ON public.client_insights FOR ALL USING (org_id = public.get_my_org_id());

