
-- Enable Row Level Security on the organizations table to protect its data.
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- This policy allows any authenticated user to create a new organization.
CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- This policy ensures users can only see the organizations they are members of.
CREATE POLICY "Users can view organizations they belong to"
  ON public.organizations FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT org_id FROM public.members WHERE user_id = auth.uid()
  ));

-- This policy allows a user to create their own membership record,
-- which is necessary when they sign up and create their first organization.
CREATE POLICY "Users can create their own membership"
  ON public.members FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
