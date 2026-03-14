-- Migration para adicionar colunas faltantes de endereço e logo às Células
ALTER TABLE cells ADD COLUMN IF NOT EXISTS logo TEXT;
ALTER TABLE cells ADD COLUMN IF NOT EXISTS cep TEXT;
ALTER TABLE cells ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE cells ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE cells ADD COLUMN IF NOT EXISTS neighborhood TEXT;
ALTER TABLE cells ADD COLUMN IF NOT EXISTS street TEXT;
ALTER TABLE cells ADD COLUMN IF NOT EXISTS number TEXT;
ALTER TABLE cells ADD COLUMN IF NOT EXISTS complement TEXT;

-- Migration para adicionar colunas faltantes aos Relatórios de Reunião
ALTER TABLE meeting_reports ADD COLUMN IF NOT EXISTS children_count INTEGER DEFAULT 0;
ALTER TABLE meeting_reports ADD COLUMN IF NOT EXISTS photo_url TEXT;
