
CREATE TABLE public.delivery_zones (
  id text NOT NULL DEFAULT (gen_random_uuid())::text PRIMARY KEY,
  name_ar text NOT NULL,
  name_en text NOT NULL DEFAULT '',
  fee numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read delivery zones"
  ON public.delivery_zones FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert delivery zones"
  ON public.delivery_zones FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update delivery zones"
  ON public.delivery_zones FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete delivery zones"
  ON public.delivery_zones FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed with default zones
INSERT INTO public.delivery_zones (id, name_ar, name_en, fee, is_active, sort_order) VALUES
  ('maadi', 'المعادي', 'Maadi', 25, true, 0),
  ('nasr-city', 'مدينة نصر', 'Nasr City', 30, true, 1),
  ('haram', 'الهرم', 'Haram', 35, true, 2),
  ('zamalek', 'الزمالك', 'Zamalek', 40, true, 3),
  ('tagamoa', 'التجمع الخامس', 'New Cairo', 45, true, 4),
  ('october', 'أكتوبر', '6th of October', 50, true, 5),
  ('obour', 'العبور / الشروق', 'Obour / Shorouk', 55, true, 6),
  ('heliopolis', 'مصر الجديدة', 'Heliopolis', 30, true, 7),
  ('dokki', 'الدقي', 'Dokki', 35, true, 8),
  ('mohandessin', 'المهندسين', 'Mohandessin', 35, true, 9);
