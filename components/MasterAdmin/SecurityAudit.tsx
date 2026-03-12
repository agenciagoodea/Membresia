import React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  History,
  Eye,
  Lock,
  Search,
  Download,
  Trash2,
  FileText,
  UserCheck
} from 'lucide-react';
import PageHeader from '../Shared/PageHeader';

const AuditLogItem = ({ user, action, target, date }: any) => (
  <div className="flex items-center gap-6 p-6 hover:bg-white/5 transition-all border-b border-white/5 last:border-0 group">
    <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-blue-500/30 transition-all shadow-2xl">
      <UserCheck size={20} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-sm font-black text-white uppercase tracking-tight">{user}</span>
        <span className="text-[9px] font-black uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-full tracking-widest">{action}</span>
      </div>
      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Alvo: <span className="text-zinc-300">{target}</span></p>
    </div>
    <div className="text-right shrink-0">
      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{date}</p>
      <button className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors">Detalhes JSON</button>
    </div>
  </div>
);

const SecurityAudit: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <PageHeader
        title="Segurança & Auditoria"
        subtitle="Monitoramento de acessos e conformidade com a LGPD."
        actions={
          <div className="flex items-center gap-3 px-6 py-3.5 bg-zinc-900 text-emerald-400 rounded-2xl border border-emerald-500/20 font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl">
            <ShieldCheck size={16} className="animate-pulse" /> STATUS: 100% CONFORME
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-950/30">
              <h3 className="font-black text-white flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                Logs de Atividades Críticas
              </h3>
              <div className="flex items-center gap-3">
                <button className="p-3 bg-zinc-950 text-zinc-500 hover:text-white rounded-xl border border-white/5 transition-all">
                  <Search size={18} />
                </button>
                <button className="p-3 bg-zinc-950 text-zinc-500 hover:text-white rounded-xl border border-white/5 transition-all">
                  <Download size={18} />
                </button>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              <AuditLogItem user="Admin Master" action="EXCLUSÃO" target="Tenant: Igreja Esperança" date="HÁ 2 HORAS" />
              <AuditLogItem user="Sistema (Auto)" action="BACKUP" target="Banco de Dados Global" date="HÁ 8 HORAS" />
              <AuditLogItem user="Dev Ops" action="CONFIGURAÇÃO" target="SSL Gateway" date="ONTEM ÀS 14:20" />
              <AuditLogItem user="Suporte" action="ACESSO" target="Painel Administrativo Vida Nova" date="12 JUN 2024" />
            </div>
          </div>

          <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Lock size={150} className="text-blue-600" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-white mb-4 flex items-center gap-4 uppercase tracking-tighter">
                <ShieldAlert size={28} className="text-amber-500" /> Gerenciamento de Consentimento
              </h3>
              <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-medium">
                Versão atual dos termos de uso e política de privacidade (v2.4.1). Exigir aceite no próximo login de todos os usuários?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-4 bg-blue-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">
                  Forçar Reaceite
                </button>
                <button className="px-10 py-4 bg-zinc-900 text-white rounded-[1.5rem] border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all">
                  Ver Histórico de Versões
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h3 className="font-black text-white mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em]">
              <Eye size={18} className="text-blue-500" /> Requisições LGPD
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-zinc-950 border border-white/5 rounded-3xl group">
                <div className="flex items-center gap-3 mb-4 text-rose-500 font-black text-[10px] uppercase tracking-widest">
                  <Trash2 size={16} /> Solicitação de Exclusão
                </div>
                <p className="text-[11px] text-zinc-400 font-bold mb-6">Usuário: Maria Santos <span className="text-zinc-600 ml-2">(ID: 2445)</span></p>
                <button className="w-full py-4 bg-rose-600/10 text-rose-500 border border-rose-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">Processar Exclusão Definitiva</button>
              </div>

              <div className="p-6 bg-zinc-950 border border-white/5 rounded-3xl group">
                <div className="flex items-center gap-3 mb-4 text-blue-500 font-black text-[10px] uppercase tracking-widest">
                  <FileText size={16} /> Relatório de Dados
                </div>
                <p className="text-[11px] text-zinc-400 font-bold mb-6">Usuário: João Silva <span className="text-zinc-600 ml-2">(ID: 1022)</span></p>
                <button className="w-full py-4 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Gerar & Enviar por E-mail</button>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={80} className="text-emerald-500" />
            </div>
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-emerald-500/20">
              <ShieldCheck size={32} />
            </div>
            <h4 className="font-black text-white text-base mb-2 uppercase tracking-tighter">Criptografia Ativa</h4>
            <p className="text-zinc-500 text-[10px] font-semibold mb-8 uppercase tracking-widest leading-relaxed">Todos os PII (Personally Identifiable Information) estão criptografados com AES-256.</p>
            <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-emerald-500 w-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SecurityAudit;
