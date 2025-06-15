
CREATE OR REPLACE FUNCTION public.create_organization_and_admin(
  org_name TEXT
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  new_org_id UUID;
  new_user_id UUID := auth.uid();
BEGIN
  -- Create the organization and get its ID
  INSERT INTO public.organizations (name)
  VALUES (org_name)
  RETURNING id INTO new_org_id;

  -- Link the user to the new organization as an admin
  INSERT INTO public.members (user_id, org_id, role)
  VALUES (new_user_id, new_org_id, 'admin');

  RETURN new_org_id;
END;
$$;
