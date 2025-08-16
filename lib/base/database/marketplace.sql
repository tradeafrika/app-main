create table products (
    id uuid primary key default gen_random_uuid(), -- better than VARCHAR
    name text not null,
    description text,
    price numeric(12,2) not null,
    category text,
    country text,
    image text,
    seller_id uuid not null references profiles(id) on delete cascade, -- tie to profiles
    in_stock boolean default true,
    min_order_quantity int default 2,
    created_at timestamp with time zone default now()
);

--bucket name For Image is ="AFINX-jj"


-- Product specifications table
create table product_specifications (
    id serial primary key,
    product_id uuid not null references products(id) on delete cascade,
    spec_key text not null,
    spec_value text
);