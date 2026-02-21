
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

const AuditLogItem = ({ user, action, target, date }: any) => (
  <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
      <UserCheck size={18} className="text-slate-500" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-sm font-bold text-slate-800">{user}</span>
        <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{action}</span>
      </div>
      <p className="text-xs text-slate-500 truncate">Alvo: <span className="font-semibold text-slate-700">{target}</span></p>
    </div>
    <div className="text-right shrink-0">
      <p className="text-[10px] font-bold text-slate-400 uppercase">{date}</p>
      <button className="text-[10px] font-bold text-blue-600 hover:underline">Ver Detalhes JSON</button>
    </div>
  </div>
);

const SecurityAudit: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Segurança & Auditoria</h2>
          <p className="text-slate-500 font-medium">Monitoramento de acessos e conformidade com a LGPD.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-bold text-xs uppercase tracking-widest">
          <ShieldCheck size={16} /> Status: 100% Conforme
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><History size={20} /> Logs de Atividades Críticas</h3>
              <div className="flex items-center gap-2">
                <Search size={18} className="text-slate-300" />
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><Download size={18} /></button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              <AuditLogItem user="Admin Master" action="Exclusão" target="Tenant: Igreja Esperança" date="Há 2 horas" />
              <AuditLogItem user="Sistema (Auto)" action="Backup" target="Banco de Dados Global" date="Há 6 horas" />
              <AuditLogItem user="Dev Ops" action="Configuração" target="SSL Gateway" date="Ontem às 14:20" />
              <AuditLogItem user="Suporte" action="Acesso" target="Painel Administrativo Vida Nova" date="12 Jun 2024" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Lock size={120} /></div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldAlert className="text-amber-400" /> Gerenciamento de Consentimento</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">Versão atual dos termos de uso e política de privacidade (v2.4.1). Exigir aceite no próximo login de todos os usuários?</p>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-blue-600 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">Forçar Reaceite</button>
              <button className="px-6 py-2.5 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">Ver Histórico de Versões</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm"><Eye size={18} className="text-indigo-500" /> Requisições LGPD</h3>
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-rose-700 font-bold text-xs uppercase">
                  <Trash2 size={14} /> Solicitação de Exclusão
                </div>
                <p className="text-[10px] text-rose-600 font-medium mb-3">Usuário: Maria Santos (ID: 2445)</p>
                <button className="w-full py-2 bg-rose-600 text-white rounded-xl text-[10px] font-bold">Processar Exclusão Definitiva</button>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold text-xs uppercase">
                  <FileText size={14} /> Relatório de Dados
                </div>
                <p className="text-[10px] text-blue-600 font-medium mb-3">Usuário: João Silva (ID: 1022)</p>
                <button className="w-full py-2 bg-blue-600 text-white rounded-xl text-[10px] font-bold">Gerar & Enviar por E-mail</button>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] text-center">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={28} />
            </div>
            <h4 className="font-bold text-emerald-800 text-sm mb-1">Criptografia Ativa</h4>
            <p className="text-emerald-600 text-[10px] font-medium mb-4">Todos os PII (Personally Identifiable Information) estão criptografados com AES-256.</p>
            <div className="h-1.5 w-full bg-emerald-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAudit;
