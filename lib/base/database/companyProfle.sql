create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  country text,
  trade_role text,
  company_name text,
  first_name text,
  last_name text,
  phone_number text,
  accept_terms boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);