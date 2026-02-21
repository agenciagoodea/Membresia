
import React, { useState } from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Database, 
  Bell, 
  Globe, 
  CreditCard,
  Save,
  Camera,
  LogOut,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';
import { MOCK_CURRENT_USER, MOCK_TENANT } from '../constants';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('PROFILE');

  const tabs = [
    { id: 'PROFILE', label: 'Meu Perfil', icon: <User size={18} /> },
    { id: 'CHURCH', label: 'Dados da Igreja', icon: <Globe size={18} /> },
    { id: 'SECURITY', label: 'Segurança & API', icon: <Lock size={18} /> },
    { id: 'NOTIFICATIONS', label: 'Notificações', icon: <Bell size={18} /> },
    { id: 'BILLING', label: 'Assinatura', icon: <CreditCard size={18} /> },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Configurações</h2>
          <p className="text-zinc-500 font-medium text-lg italic">Console de controle da sua instância e perfil pessoal.</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
          <Save size={18} /> Salvar Alterações
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-72 space-y-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-zinc-900 text-white shadow-xl border border-white/5' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-4">
                {tab.icon}
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight size={14} className="text-blue-500" />}
            </button>
          ))}
          <div className="pt-8 mt-8 border-t border-white/5">
             <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all">
                <LogOut size={18} /> Sair da Conta
             </button>
          </div>
        </div>

        <div className="flex-1 bg-zinc-900 rounded-[3rem] border border-white/5 p-10 shadow-2xl">
          {activeTab === 'PROFILE' && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="relative group cursor-pointer">
                  <img src={MOCK_CURRENT_USER.avatar} className="w-32 h-32 rounded-[2rem] ring-4 ring-zinc-950 shadow-2xl object-cover transition-transform group-hover:scale-105" alt="" />
                  <div className="absolute inset-0 bg-black/40 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{MOCK_CURRENT_USER.name}</h3>
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-1">{MOCK_CURRENT_USER.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Nome de Exibição</label>
                  <input defaultValue={MOCK_CURRENT_USER.name} className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">E-mail Ministerial</label>
                  <input defaultValue="pastor@igreja.com" className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'SECURITY' && (
             <div className="space-y-10">
                <div className="p-8 bg-zinc-950 rounded-[2rem] border border-white/5 shadow-inner">
                   <div className="flex items-center gap-4 mb-6">
                      <Zap size={24} className="text-amber-500" />
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">API Key - Gemini Pro</h4>
                   </div>
                   <p className="text-zinc-500 text-sm mb-6 leading-relaxed italic">Esta chave habilita os módulos de Neural Insights e Sermão IA. Mantenha-a em sigilo absoluto.</p>
                   <div className="flex items-center gap-4">
                      <input type="password" value="••••••••••••••••••••••••••••••" readOnly className="flex-1 bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono text-zinc-400" />
                      <button className="px-6 py-4 bg-zinc-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-700 transition-all">Redefinir</button>
                   </div>
                </div>
             </div>
          )}

          {activeTab !== 'PROFILE' && activeTab !== 'SECURITY' && (
            <div className="py-20 flex flex-col items-center justify-center text-zinc-800 italic uppercase font-black tracking-[0.5em] animate-pulse">
              Em Desenvolvimento
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
