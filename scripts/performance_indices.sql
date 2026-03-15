-- PERFORMANCE INDEXES 🚀
-- Adiciona índices nas colunas de chave estrangeira e campos de busca frequente

-- 1. Índices de Tenant (cruciais para isolamento e velocidade)
CREATE INDEX IF NOT EXISTS idx_members_church_id ON members(church_id);
CREATE INDEX IF NOT EXISTS idx_cells_church_id ON cells(church_id);
CREATE INDEX IF NOT EXISTS idx_prayers_church_id ON prayers(church_id);
CREATE INDEX IF NOT EXISTS idx_financial_records_church_id ON financial_records(church_id);

-- 2. Índices de Busca e Filtro
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_role ON members(role);
CREATE INDEX IF NOT EXISTS idx_prayers_status ON prayers(status);
CREATE INDEX IF NOT EXISTS idx_cells_leader_id ON cells(leader_id);

-- 3. Índices de Escada do Sucesso (M12)
CREATE INDEX IF NOT EXISTS idx_members_stage ON members(stage);

-- CONSOLIDAÇÃO DE SEGURANÇA (RLS)
-- Garante que RLS esteja habilitado em tabelas críticas
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE cells ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE churches ENABLE ROW LEVEL SECURITY;

-- Nota: Políticas complexas de RLS devem ser aplicadas via Dashboard Supabase ou migrations robustas.
