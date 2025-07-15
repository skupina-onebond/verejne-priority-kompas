
-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('contract-documents', 'contract-documents', true);

-- Create documents table to store metadata
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id TEXT NOT NULL,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by TEXT
);

-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (since documents are public)
CREATE POLICY "Anyone can view documents" 
  ON public.documents 
  FOR SELECT 
  USING (true);

-- Create policy for insert (you can restrict this later if needed)
CREATE POLICY "Anyone can upload documents" 
  ON public.documents 
  FOR INSERT 
  WITH CHECK (true);

-- Create storage policy for public access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'contract-documents' );

CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'contract-documents' );
