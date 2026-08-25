-- ===================================================================================
-- SUPABASE DATABASE SETUP & SEED SCRIPT
-- Copy and paste this entire file into the Supabase SQL Editor and click "RUN"
-- ===================================================================================

-- 1. Create Tables

-- Properties Table (For Property Tax)
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    municipality_id TEXT NOT NULL,
    property_number TEXT NOT NULL UNIQUE,
    owner_name TEXT NOT NULL,
    address TEXT NOT NULL,
    property_type TEXT DEFAULT 'Residential',
    ward INTEGER NOT NULL,
    outstanding_amount NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Complaints Table (For Grievances)
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    municipality_id TEXT NOT NULL,
    user_id UUID, -- Can be null for guest complaints
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    ward INTEGER NOT NULL,
    address TEXT NOT NULL,
    mobile TEXT,
    photo_url TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Property Tax Payments Table (To record transactions)
CREATE TABLE IF NOT EXISTS public.property_tax_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    transaction_id TEXT NOT NULL UNIQUE,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ===================================================================================
-- 2. Seed Data (Dummy Data for Demo)
-- ===================================================================================

-- Clear existing data (optional, useful for resetting)
TRUNCATE TABLE public.property_tax_payments CASCADE;
TRUNCATE TABLE public.properties CASCADE;
TRUNCATE TABLE public.complaints CASCADE;

-- Insert Seed Data into Properties
INSERT INTO public.properties (municipality_id, property_number, owner_name, address, property_type, ward, outstanding_amount)
VALUES 
    ('pandharpur', 'PDH-PROP-001', 'Amol Deshmukh', '101, Vithhal Nagar, Pandharpur', 'Residential', 3, 1250.00),
    ('pandharpur', 'PDH-PROP-002', 'Sunita Kulkarni', '45, Station Road, Pandharpur', 'Commercial', 1, 4500.00),
    ('sangola', 'SGL-PROP-001', 'Rajesh Patil', '12, Main Market, Sangola', 'Commercial', 2, 3200.00),
    ('mangalwedha', 'MGL-PROP-001', 'Suresh Mane', 'A-4, Fort Area, Mangalwedha', 'Residential', 4, 850.00),
    ('mohol', 'MHL-PROP-001', 'Ganesh Kadam', 'Pune-Solapur Highway, Mohol', 'Commercial', 1, 5600.00);

-- Insert Seed Data into Complaints
INSERT INTO public.complaints (municipality_id, category, description, ward, address, status, created_at)
VALUES 
    ('pandharpur', 'Water Supply', 'No water supply for the last 3 days.', 3, 'Vithhal Nagar', 'Pending', now() - interval '3 days'),
    ('pandharpur', 'Garbage', 'Garbage not collected near the temple area.', 1, 'Temple Road', 'In Process', now() - interval '1 day'),
    ('pandharpur', 'Roads/Potholes', 'Huge pothole on the main road causing traffic.', 2, 'Main Road', 'Resolved', now() - interval '10 days'),
    ('sangola', 'Streetlights', 'Streetlights not working in market area.', 2, 'Main Market', 'Pending', now() - interval '5 hours'),
    ('mangalwedha', 'Drainage', 'Drainage overflow near school.', 4, 'Fort Area', 'In Process', now() - interval '2 days');


-- ===================================================================================
-- 3. Storage Bucket Configuration (Required for Photos)
-- ===================================================================================
-- To allow users to upload photos for complaints, you must run this insert statement
-- to create the bucket (if it doesn't exist).
-- Note: You will still need to manually configure RLS policies in the Supabase UI 
-- (Storage -> Policies) to allow Public uploads if you face upload errors.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('complaint_photos', 'complaint_photos', true)
ON CONFLICT (id) DO NOTHING;

-- Done!
