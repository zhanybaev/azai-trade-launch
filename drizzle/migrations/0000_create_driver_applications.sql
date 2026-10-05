CREATE TABLE public.driver_applications (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
 email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
 company_name text NOT NULL DEFAULT '' CHECK (char_length(company_name) <= 150),
 mc_number text NOT NULL DEFAULT '' CHECK (char_length(mc_number) <= 12),
 dot_number text NOT NULL DEFAULT '' CHECK (char_length(dot_number) <= 12),
 truck_type text NOT NULL CHECK (truck_type IN ('Dry van','Reefer','Flatbed','Step deck','Power only','Box truck','Other')),
 number_of_trucks integer NOT NULL CHECK (number_of_trucks BETWEEN 1 AND 10000),
 truck_year integer CHECK (truck_year BETWEEN 1950 AND 2030),
 current_location text NOT NULL CHECK (char_length(current_location) BETWEEN 2 AND 150),
 preferred_lanes text NOT NULL DEFAULT '' CHECK (char_length(preferred_lanes) <= 500),
 freight_type text NOT NULL DEFAULT '' CHECK (char_length(freight_type) <= 150),
 years_experience integer CHECK (years_experience BETWEEN 0 AND 80),
 comments text NOT NULL DEFAULT '' CHECK (char_length(comments) <= 2000),
 contact_consent boolean NOT NULL CHECK (contact_consent = true)
);
GRANT INSERT ON public.driver_applications TO anon, authenticated;
GRANT ALL ON public.driver_applications TO service_role;
ALTER TABLE public.driver_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit consenting applications" ON public.driver_applications FOR INSERT TO anon, authenticated WITH CHECK (contact_consent = true);
CREATE INDEX driver_applications_created_at_idx ON public.driver_applications(created_at DESC);