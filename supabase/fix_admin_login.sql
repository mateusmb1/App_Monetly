-- Enable required extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Use a DO block to handle conditional logic safely
DO $$
DECLARE
  -- Fixed ID for the admin to ensure consistency across environments
  v_user_id uuid := '00000000-0000-0000-0000-000000000001'; 
  v_group_id uuid;
BEGIN
  -- 1. Ensure any stale auth data for this email is cleared
  DELETE FROM auth.users WHERE email = 'admin@admin.com';
  DELETE FROM auth.identities WHERE user_id = v_user_id;

  -- 2. Insert into auth.users (Managed by Supabase Auth)
  -- We include all critical fields to mirror a "properly confirmed" user
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    v_user_id,
    'authenticated',
    'authenticated',
    'admin@admin.com',
    -- 'admin123' hashed with Bcrypt (Standard for Supabase)
    crypt('admin123', gen_salt('bf')),
    now(),
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Admin", "full_name": "Admin User"}',
    false,
    now(),
    now(),
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL,
    false,
    NULL
  );

  -- 3. Create Identity entry (Essential for Auth logic to find the user)
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    v_user_id, -- Unique ID for identity
    v_user_id,
    format('{"sub":"%s","email":"%s"}', v_user_id, 'admin@admin.com')::jsonb,
    'email',
    now(),
    now(),
    now()
  );

  -- 4. Sync Public Data (Profiles & Groups)
  -- The trigger 'on_auth_user_created' in schema.sql should fire, 
  -- but we manually ensure coherence here.
  INSERT INTO public.profiles (id, name, email)
  VALUES (v_user_id, 'Admin', 'admin@admin.com')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

  -- Create a default group for the admin if they don't have one
  -- Check if they already have one to avoid duplicates
  SELECT id INTO v_group_id FROM public.groups WHERE owner_id = v_user_id LIMIT 1;

  IF v_group_id IS NULL THEN
    INSERT INTO public.groups (name, owner_id)
    VALUES ('Cofre Monetly', v_user_id)
    RETURNING id INTO v_group_id;
    
    INSERT INTO public.group_members (group_id, user_id, role)
    VALUES (v_group_id, v_user_id, 'owner');
  END IF;

  RAISE NOTICE 'Admin user recreated successfully with email: admin@admin.com';

END $$;
