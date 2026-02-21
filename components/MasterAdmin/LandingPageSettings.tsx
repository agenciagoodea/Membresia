
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

const LandingPageSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('HERO');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Configuração da Landing Page</h2>
          <p className="text-slate-500 font-medium">Gerencie o conteúdo público e a vitrine do seu sistema.</p>
        </div>
        <div className="flex items-center gap-3">
           <a href="#/" target="_blank" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Eye size={16} /> Ver Ao Vivo
          </a>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
            <Save size={18} /> Publicar Alterações
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 space-y-1">
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
          {activeTab === 'HERO' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Conteúdo Principal (Hero Section)</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Título Principal (H1)</label>
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" defaultValue="Transforme sua Visão Celular em Crescimento Real." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtítulo (P)</label>
                  <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" defaultValue="A plataforma SaaS completa para gerenciar membros, células e discipulado. Tome decisões baseadas em dados e foque no que importa: vidas." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Texto do Botão Primário</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" defaultValue="Começar Minha Igreja" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tag de Novidade</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" defaultValue="INSIGHTS PASTORAIS COM IA" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PRICING' && (
            <div className="space-y-6">
               <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Gerenciador de Preços Visuais</h3>
               <p className="text-xs text-slate-400 font-medium mb-6 italic">Nota: As alterações aqui afetam apenas o visual da Landing Page, os limites técnicos são configurados no módulo de Planos.</p>
               <div className="space-y-4">
                  {['BASIC', 'PRO', 'ENTERPRISE'].map((p) => (
                    <div key={p} className="p-5 border border-slate-100 bg-slate-50 rounded-2xl flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-xs">SKU</div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{p}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">R$ {p === 'PRO' ? '247' : p === 'BASIC' ? '97' : 'Consultar'}</p>
                          </div>
                       </div>
                       <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors"><ChevronRight size={20} /></button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'FAQ' && (
            <div className="space-y-6">
               <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-800">Perguntas Frequentes</h3>
                  <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-blue-600 hover:text-blue-700"><Plus size={14} /> Adicionar Pergunta</button>
               </div>
               <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="p-4 border border-slate-100 rounded-2xl hover:border-slate-300 transition-colors flex gap-4">
                       <div className="flex-1">
                          <input className="w-full bg-transparent border-none font-bold text-slate-800 text-sm mb-2 outline-none" defaultValue={`Dúvida Exemplo #${i}?`} />
                          <textarea className="w-full bg-transparent border-none text-xs text-slate-500 font-medium outline-none resize-none" rows={2} defaultValue="A resposta para esta dúvida aparecerá aqui na landing page." />
                       </div>
                       <button className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab !== 'HERO' && activeTab !== 'PRICING' && activeTab !== 'FAQ' && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
               <RefreshCw size={48} className="animate-spin-slow mb-4 opacity-50" />
               <p className="font-bold uppercase tracking-widest text-xs">Módulo em Desenvolvimento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPageSettings;
