-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  template_id INT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  ats_score INT,
  analysis_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes
CREATE INDEX resumes_user_id_idx ON resumes(user_id);
CREATE INDEX resumes_created_at_idx ON resumes(created_at DESC);
CREATE INDEX analyses_user_id_idx ON analyses(user_id);
CREATE INDEX analyses_created_at_idx ON analyses(created_at DESC);

-- Enable RLS
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for resumes
CREATE POLICY "Users can view their own resumes" ON resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create resumes" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes" ON resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for analyses
CREATE POLICY "Users can view their own analyses" ON analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create analyses" ON analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses" ON analyses
  FOR DELETE USING (auth.uid() = user_id);
