# Nagar Parishad Digital Seva Portal

A powerful, multi-tenant web application for municipal councils in Maharashtra. Built with React (Vite) and Supabase.

## Features

- **Multi-tenant Architecture:** Serve multiple municipalities (Pandharpur, Sangola, Mangalwedha, Mohol) from a single codebase with dynamic theming.
- **Citizen Services:** Property Tax (with PDF receipts and QR codes), Complaints, Certificates.
- **Admin Dashboard:** Recharts analytics, activity logs, and SLA escalation tracking.
- **Bilingual:** Marathi & English support out of the box.

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Go to the SQL Editor in your Supabase dashboard.
3. Run the SQL in `supabase/migrations/20260825213000_initial_schema.sql` to create tables and RLS policies.
4. Run the SQL in `supabase/seed.sql` to populate demo data for the 4 municipalities.
5. Get your `Project URL` and `anon public` API key from Project Settings > API.

### 2. Frontend Setup

1. Open the `frontend` folder: `cd frontend`
2. Create a `.env` file in the `frontend` folder:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Install dependencies (if not already done): `npm install`
4. Start the development server: `npm run dev`

### 3. Demo

Use the `Demo_Script.md` for a guided 5-minute presentation path to show off the portal's features.
