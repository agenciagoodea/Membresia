
import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  Plus, 
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Shield,
  Lock,
  ChevronRight,
  // Fix: added missing Users import
  Users
} from 'lucide-react';
import { MOCK_MEMBERS, MOCK_TENANT, PLAN_CONFIGS } from '../constants';
import { LadderStage, UserRole } from '../types';
import UpgradeModal from './Shared/UpgradeModal';

const Members: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const planLimit = PLAN_CONFIGS[MOCK_TENANT.plan].maxMembers;
  const currentTotal = MOCK_TENANT.stats.totalMembers;
  const isLimitReached = currentTotal >= planLimit;

  const filteredMembers = MOCK_MEMBERS.filter(m => 
    filter === 'ALL' ? true : m.stage === filter
  );

  const handleAddMember = () => {
    if (isLimitReached) {
      setIsUpgradeModalOpen(true);
    } else {
      console.log('Opening add member form...');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Membros & Discípulos</h2>
          <p className="text-zinc-500 font-medium text-lg">
            Monitorando <span className="text-zinc-300 font-black">{currentTotal}</span> de <span className="text-zinc-300 font-black">{planLimit}</span> vagas.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-zinc-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
            <Download size={16} /> Exportar
          </button>
          <button 
            onClick={handleAddMember}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.1em] transition-all shadow-xl ${
              isLimitReached 
                ? 'bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed opacity-50' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
            }`}
          >
            {isLimitReached ? <Lock size={18} /> : <Plus size={18} />}
            Novo Registro
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 bg-zinc-950 px-6 py-3.5 rounded-2xl border border-white/5 flex-1 max-w-md focus-within:ring-2 focus-within:ring-blue-600 transition-all group">
            <Search size={18} className="text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
            <input type="text" placeholder="Busca por nome, e-mail ou célula..." className="bg-transparent border-none outline-none text-sm w-full font-medium text-zinc-200" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-zinc-950 px-5 py-3 rounded-2xl border border-white/5">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Estágio:</span>
              <select 
                className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-zinc-300 focus:text-blue-400 cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option className="bg-zinc-900" value="ALL">Todos</option>
                {Object.values(LadderStage).map(stage => (
                  <option className="bg-zinc-900" key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            <button className="p-3.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left">
            <thead className="bg-zinc-950/50 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-10 py-6">Membro Principal</th>
                <th className="px-6 py-6 text-center">Perfil</th>
                <th className="px-6 py-6 text-center">Escada</th>
                <th className="px-6 py-6 text-center">Célula</th>
                <th className="px-6 py-6 text-center">Ações Rápidas</th>
                <th className="px-10 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <img src={member.avatar} alt="" className="w-14 h-14 rounded-2xl ring-2 ring-white/10 group-hover:ring-blue-600 transition-all shadow-xl" />
                      <div>
                        <p className="text-base font-black text-white tracking-tight uppercase leading-none mb-1">{member.name}</p>
                        <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Shield size={14} className={member.role === UserRole.CELL_LEADER_DISCIPLE ? 'text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-zinc-600'} />
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                      member.stage === LadderStage.SEND ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      member.stage === LadderStage.DISCIPLE ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      member.stage === LadderStage.CONSOLIDATE ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {member.stage}
                    </span>
                  </td>
                  <td className="px-6 py-8 text-center text-[10px] font-black text-zinc-300 uppercase tracking-widest italic">
                    {member.cellId === 'c1' ? 'Renovo' : member.cellId === 'c2' ? 'Esperança' : 'Alpha'}
                  </td>
                  <td className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                      <button title="E-mail" className="p-3 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all border border-white/5">
                        <Mail size={16} />
                      </button>
                      <button title="WhatsApp" className="p-3 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all border border-white/5">
                        <Phone size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-3 text-zinc-600 hover:text-white transition-all">
                      <MoreHorizontal size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMembers.length === 0 && (
          <div className="py-32 text-center text-zinc-600">
            <Users size={64} className="mx-auto mb-6 opacity-10" />
            <p className="text-sm font-black uppercase tracking-widest">Nenhum registro encontrado</p>
          </div>
        )}
      </div>

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)}
        limitType="MEMBERS"
        currentLimit={planLimit}
      />
    </div>
  );
};

export default Members;
