-- Create quotes table for project quotes
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT,
  description TEXT NOT NULL,
  timeline TEXT,
  source VARCHAR(50) DEFAULT 'website',
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Create policies for quotes access
CREATE POLICY "Anyone can submit quotes" 
ON public.quotes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admin can view quotes" 
ON public.quotes 
FOR SELECT 
USING ((auth.uid() IS NOT NULL) AND (EXISTS ( SELECT 1
  FROM auth.users
  WHERE ((users.id = auth.uid()) AND ((users.email)::text = 'kktjunior911@gmail.com'::text) AND (users.email_confirmed_at IS NOT NULL)))));

CREATE POLICY "Only admin can update quotes" 
ON public.quotes 
FOR UPDATE 
USING ((auth.uid() IS NOT NULL) AND (EXISTS ( SELECT 1
  FROM auth.users
  WHERE ((users.id = auth.uid()) AND ((users.email)::text = 'kktjunior911@gmail.com'::text) AND (users.email_confirmed_at IS NOT NULL)))));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();