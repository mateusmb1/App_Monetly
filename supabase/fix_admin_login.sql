-- Enable required extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Use a DO block to handle conditional logic safely
DO $$
DECLARE
  v_user_id uuid;
  v_group_id uuid;
BEGIN
  -- 1. Get or Create User
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@admin.com';

  IF v_user_id IS NULL THEN
    v_user_id := '00000000-0000-0000-0000-000000000001';
    
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      'admin@admin.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  ELSE
    -- User exists, reset password
    UPDATE auth.users 
    SET encrypted_password = crypt('admin123', gen_salt('bf')),
        updated_at = now(),
        email_confirmed_at = COALESCE(email_confirmed_at, now())
    WHERE id = v_user_id;
  END IF;

  -- 2. Sync Profile (Trigger usually does this, but let's be safe)
  INSERT INTO public.profiles (id, name, email)
  VALUES (v_user_id, 'Admin', 'admin@admin.com')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

  -- 3. Ensure Default Group
  SELECT id INTO v_group_id FROM public.groups WHERE owner_id = v_user_id LIMIT 1;

  IF v_group_id IS NULL THEN
    INSERT INTO public.groups (name, owner_id)
    VALUES ('Cofre Monetly', v_user_id)
    RETURNING id INTO v_group_id;
    
    INSERT INTO public.group_members (group_id, user_id, role)
    VALUES (v_group_id, v_user_id, 'owner');
  END IF;

  RAISE NOTICE 'Admin credentials (admin@admin.com / admin123) verified and restored.';

END $$;
