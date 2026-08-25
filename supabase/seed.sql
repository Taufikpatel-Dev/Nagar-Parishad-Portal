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
