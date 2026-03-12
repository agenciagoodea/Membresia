import React, { useState } from 'react';
import {
  Monitor,
  Type,
  DollarSign,
  Image as ImageIcon,
  Save,
  Eye,
  RefreshCw,
  Plus,
  Trash2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import PageHeader from '../Shared/PageHeader';

const LandingPageSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('HERO');

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <PageHeader
        title="Configuração da Landing Page"
        subtitle="Gerencie o conteúdo público e a vitrine do seu sistema."
        actions={
          <div className="flex items-center gap-4">
            <a href="#/" target="_blank" className="flex items-center gap-3 px-6 py-3.5 bg-zinc-900 border border-white/5 rounded-2xl text-[10px] font-black text-zinc-400 hover:text-white transition-all uppercase tracking-widest">
              <Eye size={16} /> Ver Ao Vivo
            </a>
            <button className="flex items-center gap-3 px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest">
              <Save size={18} /> Publicar Alterações
            </button>
          </div>
        }
      />

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-72 space-y-1.5 shrink-0">
          {[
            { id: 'HERO', label: 'Cabeçalho (Hero)', icon: <Monitor size={18} /> },
            { id: 'FEATURES', label: 'Funcionalidades', icon: <Sparkles size={18} /> },
            { id: 'PRICING', label: 'Tabela de Preços', icon: <DollarSign size={18} /> },
            { id: 'FAQ', label: 'Perguntas (FAQ)', icon: <Type size={18} /> },
            { id: 'IMAGERY', label: 'Imagens & Branding', icon: <ImageIcon size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === tab.id
                ? 'bg-zinc-900 text-white shadow-2xl border border-white/5'
                : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                }`}
            >
              <div className="flex items-center gap-4">
                {tab.icon} {tab.label}
              </div>
              {activeTab === tab.id && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-zinc-900 rounded-[3rem] border border-white/5 p-8 md:p-12 shadow-2xl">
          {activeTab === 'HERO' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Conteúdo Hero Section</h3>
                <Sparkles size={20} className="text-blue-500" />
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Título Principal (H1)</label>
                  <input className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all" defaultValue="Transforme sua Visão Celular em Crescimento Real." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Subtítulo Estratégico</label>
                  <textarea rows={4} className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none" defaultValue="A plataforma SaaS completa para gerenciar membros, células e discipulado. Tome decisões baseadas em dados e foque no que importa: vidas." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Call to Action (Primário)</label>
                    <input className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all" defaultValue="Começar Minha Igreja" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Tag de Destaque</label>
                    <input className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-blue-400 outline-none focus:ring-2 focus:ring-blue-600 transition-all" defaultValue="INSIGHTS PASTORAIS COM IA" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PRICING' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Preços na Vitrine</h3>
                <DollarSign size={20} className="text-emerald-500" />
              </div>
              <p className="text-xs text-zinc-500 font-bold mb-6 italic bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">Nota: As alterações aqui afetam apenas o visual da Landing Page. Os limites reais são configurados no módulo de Planos.</p>
              <div className="space-y-6">
                {['BASIC', 'PRO', 'ENTERPRISE'].map((p) => (
                  <div key={p} className="p-6 bg-zinc-950 border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-blue-500/30 transition-all shadow-xl">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center font-black text-zinc-600 text-[10px] group-hover:text-blue-500 transition-colors shadow-inner">SKU</div>
                      <div>
                        <p className="font-black text-white text-base tracking-tight uppercase">{p}</p>
                        <p className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.2em] mt-1">R$ {p === 'PRO' ? '247' : p === 'BASIC' ? '97' : 'Consultar'}</p>
                      </div>
                    </div>
                    <button className="p-3 bg-zinc-900 text-zinc-500 hover:text-white rounded-xl border border-white/5 transition-all"><Plus size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'FAQ' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Dúvidas Frequentes</h3>
                <button className="flex items-center gap-3 px-4 py-2 bg-blue-600/10 text-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                  <Plus size={14} /> Nova Pergunta
                </button>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-6 bg-zinc-950 border border-white/5 rounded-[2rem] hover:border-white/20 transition-all flex gap-6 group">
                    <div className="flex-1">
                      <input className="w-full bg-transparent border-none font-black text-white text-sm mb-2 outline-none uppercase tracking-tight" defaultValue={`Dúvida Exemplo #${i}?`} />
                      <textarea className="w-full bg-transparent border-none text-xs text-zinc-500 font-bold outline-none resize-none leading-relaxed" rows={2} defaultValue="A resposta para esta dúvida aparecerá aqui na landing page de forma expansível para o visitante." />
                    </div>
                    <button className="p-3 bg-zinc-900 text-zinc-700 hover:text-rose-500 rounded-xl border border-white/5 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'HERO' && activeTab !== 'PRICING' && activeTab !== 'FAQ' && (
            <div className="flex flex-col items-center justify-center py-32 text-zinc-800 space-y-6">
              <div className="relative">
                <RefreshCw size={64} className="animate-spin-slow opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={24} className="text-blue-500 animate-pulse" />
                </div>
              </div>
              <p className="font-black uppercase tracking-[0.5em] text-[10px] text-zinc-600 ml-4">Módulo em Desenvolvimento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LandingPageSettings;
