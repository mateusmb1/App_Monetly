-- Enable pgcrypto for password hashing
create extension if not exists "pgcrypto";

DO $$
DECLARE
  v_user_id uuid;
  v_group_id uuid;
BEGIN
  -- 1. Create User (if not exists)
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@admin.com';
  
  IF v_user_id IS NULL THEN
    v_user_id := uuid_generate_v4();
    
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role
    ) VALUES (
      v_user_id,
      'admin@admin.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Admin"}',
      'authenticated',
      'authenticated'
    );
  END IF;

  -- 2. Create Group (if user has no group)
  -- Verify if profile exists (managed by trigger), wait a tiny bit or just insert if missing to be safe regarding race conditions in script
  INSERT INTO public.profiles (id, name, email)
  VALUES (v_user_id, 'Admin', 'admin@admin.com')
  ON CONFLICT (id) DO NOTHING;

  -- Check if group exists for this user
  SELECT id INTO v_group_id FROM public.groups WHERE owner_id = v_user_id LIMIT 1;
  
  IF v_group_id IS NULL THEN
    INSERT INTO public.groups (name, owner_id)
    VALUES ('Minhas Finanças', v_user_id)
    RETURNING id INTO v_group_id;
    
    -- Add Member
    INSERT INTO public.group_members (group_id, user_id, role)
    VALUES (v_group_id, v_user_id, 'owner');
    
    -- Add Default Accounts
    INSERT INTO public.accounts (group_id, name, type, balance)
    VALUES 
      (v_group_id, 'Carteira', 'cash', 100.00),
      (v_group_id, 'Banco Principal', 'bank', 1000.00);
      
  END IF;

END $$;
