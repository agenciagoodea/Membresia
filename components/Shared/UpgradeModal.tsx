
import React from 'react';
import { X, Zap, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  limitType: 'MEMBERS' | 'CELLS' | 'LEADERS';
  currentLimit: number;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, limitType, currentLimit }) => {
  if (!isOpen) return null;

  const limitName = {
    MEMBERS: 'Membros',
    CELLS: 'Células',
    LEADERS: 'Líderes'
  }[limitType];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 text-center bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded-full transition-colors">
            <X size={24} />
          </button>

          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
            <Zap size={32} fill="white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-2">Limite Atingido!</h2>
          <p className="text-indigo-100 text-sm font-medium">
            Você atingiu o limite de {currentLimit} {limitName} do seu plano atual.
          </p>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <p className="text-slate-500 text-sm mb-6 text-center">
              Dê o próximo passo na sua visão. Faça upgrade para o plano <strong className="text-indigo-600">PRO</strong> e tenha:
            </p>
            <div className="space-y-4">
              {[
                'Até 500 Membros e 50 Células',
                'IA Insights para Gestão Pastoral',
                'Módulo Financeiro Completo',
                'Suporte Prioritário'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group">
            FAZER UPGRADE AGORA <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-emerald-500" /> Sem perda de dados na migração
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
