-- SQL Fix for Meeting Reports RLS
-- Este script garante que usuários autenticados possam editar e excluir relatórios de encontro

-- 1. Habilitar RLS (caso não esteja)
ALTER TABLE public.meeting_reports ENABLE ROW LEVEL SECURITY;

-- 2. Limpar políticas incompletas
DROP POLICY IF EXISTS "Allow public insert" ON public.meeting_reports;
DROP POLICY IF EXISTS "Allow public select" ON public.meeting_reports;
DROP POLICY IF EXISTS "Allow public update" ON public.meeting_reports;
DROP POLICY IF EXISTS "Allow public delete" ON public.meeting_reports;

-- 3. Criar nova política abrangente (FOR ALL)
-- Usando a mesma lógica simplificada do script de fix anterior, mas incluindo DELETE/UPDATE
CREATE POLICY "Allow authenticated manage reports" 
ON public.meeting_reports 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Alternativa mais segura se o church_id estivesse na tabela (mas meeting_reports usa cell_id)
-- Para deletar, precisamos que o usuário tenha permissão na célula vinculada.

-- 4. Garantir permissões de acesso
GRANT ALL ON public.meeting_reports TO authenticated, service_role;
