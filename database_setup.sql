-- 20260825213000_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Municipalities Table
CREATE TABLE public.municipalities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_mr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    logo_url TEXT,
    primary_color VARCHAR(20) DEFAULT '#000000',
    ward_count INT DEFAULT 1,
    helpline_number VARCHAR(20),
    toll_free_number VARCHAR(20),
    whatsapp_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    municipality_id UUID REFERENCES public.municipalities(id) ON DELETE SET NULL,
    full_name VARCHAR(255),
    mobile VARCHAR(15),
    address TEXT,
    ward_number INT,
    role VARCHAR(50) DEFAULT 'citizen' CHECK (role IN ('citizen', 'ward_officer', 'municipality_admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Properties Table
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipality_id UUID REFERENCES public.municipalities(id) ON DELETE CASCADE,
    property_number VARCHAR(100) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    address TEXT,
    ward INT,
    property_type VARCHAR(100),
    built_up_area NUMERIC(10, 2),
    annual_tax_amount NUMERIC(10, 2) DEFAULT 0,
    outstanding_amount NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(municipality_id, property_number)
);

-- 4. Tax Payments Table
CREATE TABLE public.tax_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    citizen_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    amount_paid NUMERIC(10, 2) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    payment_mode VARCHAR(50),
    receipt_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'Success',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Complaints Table
CREATE TABLE public.complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipality_id UUID REFERENCES public.municipalities(id) ON DELETE CASCADE,
    complaint_number VARCHAR(100) UNIQUE NOT NULL,
    citizen_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    ward INT,
    address TEXT,
    photo_url TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    admin_remark TEXT,
    sla_days INT DEFAULT 7,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Certificate Applications Table
CREATE TABLE public.certificate_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipality_id UUID REFERENCES public.municipalities(id) ON DELETE CASCADE,
    application_number VARCHAR(100) UNIQUE NOT NULL,
    citizen_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    type VARCHAR(50) CHECK (type IN ('birth', 'death')),
    applicant_name VARCHAR(255) NOT NULL,
    event_date DATE,
    event_place TEXT,
    related_person_details JSONB,
    document_url TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    certificate_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Water Bills Table
CREATE TABLE public.water_bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipality_id UUID REFERENCES public.municipalities(id) ON DELETE CASCADE,
    consumer_number VARCHAR(100) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    address TEXT,
    outstanding_amount NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(municipality_id, consumer_number)
);

-- 8. Water Payments Table
CREATE TABLE public.water_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    water_bill_id UUID REFERENCES public.water_bills(id) ON DELETE CASCADE,
    amount_paid NUMERIC(10, 2) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    receipt_number VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Trade Licenses Table
CREATE TABLE public.trade_licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipality_id UUID REFERENCES public.municipalities(id) ON DELETE CASCADE,
    application_number VARCHAR(100) UNIQUE NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    address TEXT,
    document_url TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Status History Table
CREATE TABLE public.status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) CHECK (entity_type IN ('complaint', 'certificate', 'trade_license')),
    entity_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL,
    remark TEXT,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Feedback Table
CREATE TABLE public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE,
    citizen_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Notifications Table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    citizen_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    entity_type VARCHAR(50),
    entity_id UUID,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Officials Table
CREATE TABLE public.officials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipality_id UUID REFERENCES public.municipalities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(100) CHECK (designation IN ('mayor', 'deputy_mayor', 'commissioner')),
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Emergency Contacts Table
CREATE TABLE public.emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipality_id UUID REFERENCES public.municipalities(id) ON DELETE CASCADE,
    department VARCHAR(100) NOT NULL,
    ward_zone VARCHAR(100),
    phone_numbers JSONB,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.municipalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Draft for Demo Purposes)

-- Municipalities: anyone can read
CREATE POLICY "Public read municipalities" ON public.municipalities FOR SELECT USING (true);

-- Profiles: Citizens read/update their own, admins read all in their municipality
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can read municipality profiles" ON public.profiles FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.profiles admin_p
        WHERE admin_p.id = auth.uid() AND admin_p.role IN ('super_admin', 'municipality_admin')
        AND (admin_p.municipality_id = public.profiles.municipality_id OR admin_p.role = 'super_admin')
    )
);

-- Properties: Anyone can search properties (since public tax payment flow exists)
CREATE POLICY "Public read properties" ON public.properties FOR SELECT USING (true);

-- Complaints: Citizens read own, admins read based on scope
CREATE POLICY "Citizens read own complaints" ON public.complaints FOR SELECT USING (citizen_id = auth.uid());
CREATE POLICY "Admins read complaints" ON public.complaints FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.profiles admin_p
        WHERE admin_p.id = auth.uid() AND admin_p.role IN ('super_admin', 'municipality_admin', 'ward_officer')
        AND (
            admin_p.role = 'super_admin' OR 
            (admin_p.municipality_id = public.complaints.municipality_id AND (admin_p.role = 'municipality_admin' OR (admin_p.role = 'ward_officer' AND admin_p.ward_number = public.complaints.ward)))
        )
    )
);
CREATE POLICY "Citizens can insert complaints" ON public.complaints FOR INSERT WITH CHECK (true); -- allow guest

-- Allow public tracker to access status_history using a secure function
CREATE OR REPLACE FUNCTION public.get_public_status_timeline(lookup_number VARCHAR)
RETURNS TABLE (
    entity_type VARCHAR,
    status VARCHAR,
    remark TEXT,
    changed_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    found_entity_id UUID;
    found_entity_type VARCHAR;
BEGIN
    -- Try complaint
    SELECT id, 'complaint' INTO found_entity_id, found_entity_type FROM public.complaints WHERE complaint_number = lookup_number;
    
    IF found_entity_id IS NULL THEN
        -- Try certificate
        SELECT id, 'certificate' INTO found_entity_id, found_entity_type FROM public.certificate_applications WHERE application_number = lookup_number;
    END IF;

    IF found_entity_id IS NULL THEN
        -- Try trade license
        SELECT id, 'trade_license' INTO found_entity_id, found_entity_type FROM public.trade_licenses WHERE application_number = lookup_number;
    END IF;

    RETURN QUERY
    SELECT sh.entity_type, sh.status, sh.remark, sh.changed_at
    FROM public.status_history sh
    WHERE sh.entity_id = found_entity_id
    ORDER BY sh.changed_at ASC;
END;
$$;
-- seed.sql

-- Insert 4 Municipalities
INSERT INTO public.municipalities (id, code, name_mr, name_en, logo_url, primary_color, ward_count, helpline_number, toll_free_number, whatsapp_number, address)
VALUES 
('11111111-1111-1111-1111-111111111111', 'pandharpur', 'पंढरपूर नगरपरिषद', 'Pandharpur Municipal Council', '/logos/pandharpur.png', '#8B0000', 33, '02186-222222', '1800-222-1111', '9876543210', 'Navi Peth, Pandharpur, Maharashtra 413304'),
('22222222-2222-2222-2222-222222222222', 'sangola', 'सांगोला नगरपरिषद', 'Sangola Municipal Council', '/logos/sangola.png', '#004B87', 20, '02187-223344', '1800-222-2222', '9876543211', 'Main Road, Sangola, Maharashtra 413307'),
('33333333-3333-3333-3333-333333333333', 'mangalwedha', 'मंगळवेढा नगरपरिषद', 'Mangalwedha Municipal Council', '/logos/mangalwedha.png', '#2E8B57', 17, '02188-224455', '1800-222-3333', '9876543212', 'Bazar Peth, Mangalwedha, Maharashtra 413305'),
('44444444-4444-4444-4444-444444444444', 'mohol', 'मोहोळ नगरपरिषद', 'Mohol Municipal Council', '/logos/mohol.png', '#FF8C00', 17, '02189-225566', '1800-222-4444', '9876543213', 'Shivaji Chowk, Mohol, Maharashtra 413213')
ON CONFLICT (id) DO NOTHING;

-- Insert Officials for Pandharpur
INSERT INTO public.officials (municipality_id, name, designation) VALUES
('11111111-1111-1111-1111-111111111111', 'Shri. Example Mayor', 'mayor'),
('11111111-1111-1111-1111-111111111111', 'Shri. Example Deputy Mayor', 'deputy_mayor'),
('11111111-1111-1111-1111-111111111111', 'Shri. Arvind Machale', 'commissioner');

-- Insert dummy properties for Pandharpur
INSERT INTO public.properties (municipality_id, property_number, owner_name, address, ward, property_type, built_up_area, annual_tax_amount, outstanding_amount) VALUES
('11111111-1111-1111-1111-111111111111', 'PDH-PROP-001', 'Rahul Deshmukh', 'Shivaji Nagar, Pandharpur', 1, 'Residential', 1200, 2500, 0),
('11111111-1111-1111-1111-111111111111', 'PDH-PROP-002', 'Sneha Patil', 'Station Road, Pandharpur', 2, 'Commercial', 800, 4500, 1500),
('11111111-1111-1111-1111-111111111111', 'PDH-PROP-003', 'Anil Kadam', 'Isbavi, Pandharpur', 3, 'Residential', 1500, 3000, 3000);

-- Insert dummy complaints for Pandharpur
INSERT INTO public.complaints (municipality_id, complaint_number, category, description, ward, address, status, sla_days) VALUES
('11111111-1111-1111-1111-111111111111', 'PDH-CMP-001', 'Water Supply', 'No water supply for the last 2 days.', 1, 'Shivaji Nagar', 'Pending', 2),
('11111111-1111-1111-1111-111111111111', 'PDH-CMP-002', 'Streetlights', 'Streetlight is not working near the main chowk.', 2, 'Station Road', 'In Process', 3),
('11111111-1111-1111-1111-111111111111', 'PDH-CMP-003', 'Garbage', 'Garbage not collected for 3 days.', 3, 'Isbavi', 'Resolved', 1);

-- Note: In a real environment with Auth, you would insert profiles corresponding to auth.users.
-- Since this is a demo, we will insert seed users via Supabase auth API or handle it in the app.
INSERT INTO storage.buckets (id, name, public) VALUES ('complaint_photos', 'complaint_photos', true) ON CONFLICT (id) DO NOTHING;
