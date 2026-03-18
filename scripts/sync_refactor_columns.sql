
-- ==========================================================
-- SCRIPT DE SINCRONIZAÇÃO: REFORMA DE MÓDULOS (MEMBROS & CÉLULAS)
-- Execute este script no SQL Editor do seu Supabase para corrigir os erros de coluna.
-- ==========================================================

-- 1. CORREÇÃO NA TABELA DE MEMBROS
ALTER TABLE IF EXISTS public.members 
ADD COLUMN IF NOT EXISTS birth_date DATE,
ADD COLUMN IF NOT EXISTS cpf TEXT,
ADD COLUMN IF NOT EXISTS marital_status TEXT DEFAULT 'Solteiro(a)',
ADD COLUMN IF NOT EXISTS spouse_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS pastor_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS sex TEXT DEFAULT 'MASCULINO',
ADD COLUMN IF NOT EXISTS has_children BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS children JSONB DEFAULT '[]'::JSONB,
ADD COLUMN IF NOT EXISTS leading_cell_ids UUID[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS login TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS password TEXT;

-- 2. CORREÇÃO NA TABELA DE CÉLULAS
ALTER TABLE IF EXISTS public.cells
ADD COLUMN IF NOT EXISTS leader_ids UUID[] DEFAULT '{}';

-- 3. MIGRAÇÃO DE ROLES (OPCIONAL - CASO OS VALORES ANTIGOS ESTEJAM EM INGLÊS)
UPDATE public.members SET role = 'ADMINISTRADOR DA IGREJA' WHERE role IN ('ADMIN', 'CHURCH_ADMIN', 'CHURCH ADMIN');
UPDATE public.members SET role = 'PASTOR' WHERE role IN ('PASTOR');
UPDATE public.members SET role = 'LÍDER DE CÉLULA / DISCIPULADOR' WHERE role IN ('LEADER', 'CELL_LEADER', 'CELL_LEADER_DISCIPLE', 'Lider de Célula');
UPDATE public.members SET role = 'MEMBRO / VISITANTE' WHERE role IN ('MEMBER', 'VISITOR', 'MEMBER_VISITOR', 'Membro');

-- 4. GARANTIR PERMISSÕES (RLS)
-- Permitir que usuários autenticados vejam todos os membros para seleção de hierarquia
DROP POLICY IF EXISTS "Allow authenticated select all members" ON public.members;
CREATE POLICY "Allow authenticated select all members" 
ON public.members FOR SELECT 
TO authenticated 
USING (true);

-- Recarregar cache de esquema
NOTIFY pgrst, 'reload schema';
