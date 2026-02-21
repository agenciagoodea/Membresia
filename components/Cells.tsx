
import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  User,
  Users,
  ExternalLink,
  ChevronLeft,
  FileText,
  UserCheck,
  TrendingUp,
  Heart,
  MessageSquare,
  Lock,
  ChevronDown,
  // Fix: added missing X import
  X
} from 'lucide-react';
import { MOCK_CELLS, MOCK_MEMBERS, MOCK_MEETING_REPORTS, MOCK_CURRENT_USER, MOCK_TENANT, PLAN_CONFIGS } from '../constants';
import { Cell, UserRole } from '../types';
import UpgradeModal from './Shared/UpgradeModal';

const CellDetailView = ({ cell, onBack }: { cell: Cell, onBack: () => void }) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const cellMembers = MOCK_MEMBERS.filter(m => m.cellId === cell.id);
  const cellReports = MOCK_MEETING_REPORTS.filter(r => r.cellId === cell.id);
  const isLeader = MOCK_CURRENT_USER.role === UserRole.CELL_LEADER_DISCIPLE || MOCK_CURRENT_USER.role === UserRole.PASTOR;

  return (
    <div className="space-y-10 animate-in slide-in-from-right-10 duration-500">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white shadow-xl">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none mb-1">{cell.name}</h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] italic">Gestão Analítica & Cuidado Espiritual</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-zinc-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Membros</p>
              <h4 className="text-4xl font-black text-white tracking-tighter">{cell.membersCount}</h4>
            </div>
            <div className="bg-zinc-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Freq. Média</p>
              <h4 className="text-4xl font-black text-emerald-500 tracking-tighter">{cell.averageAttendance} <span className="text-lg">p.</span></h4>
            </div>
            <div className="bg-zinc-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Status</p>
              <span className={`inline-block w-fit text-[10px] font-black px-4 py-1.5 rounded-full border tracking-widest uppercase ${cell.status === 'MULTIPLYING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]'}`}>
                {cell.status === 'MULTIPLYING' ? 'Em Multiplicação' : 'Saudável'}
              </span>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-950/50">
              <h3 className="text-xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                <FileText size={22} className="text-blue-500" /> Relatórios do Mês
              </h3>
              {isLeader && (
                <button 
                  onClick={() => setShowReportForm(true)}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
                >
                  Novo Relatório
                </button>
              )}
            </div>
            <div className="divide-y divide-white/5">
              {cellReports.map((report) => (
                <div key={report.id} className="p-8 hover:bg-white/5 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-zinc-600" />
                      <span className="text-lg font-black text-zinc-100 tracking-tight">
                        {new Date(report.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest">R$ {report.offeringAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed italic group-hover:text-zinc-200 transition-colors">"{report.report}"</p>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      <UserCheck size={14} className="text-blue-500" /> {report.presentMemberIds.length} Membros
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      <Users size={14} className="text-indigo-500" /> {report.visitorCount} Visitantes
                    </div>
                  </div>
                </div>
              ))}
              {cellReports.length === 0 && (
                <div className="py-24 text-center text-zinc-600 font-black uppercase tracking-[0.3em] opacity-30 italic">Sem relatórios ativos</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-4 uppercase tracking-tighter">
              <Heart size={22} className="text-rose-500" /> Integrantes
            </h3>
            <div className="space-y-5">
              {cellMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between group p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={member.avatar} className="w-11 h-11 rounded-2xl ring-2 ring-white/10 group-hover:ring-rose-500 transition-all object-cover" alt="" />
                    <div>
                      <p className="text-sm font-black text-white uppercase tracking-tight">{member.name}</p>
                      <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">{member.stage}</p>
                    </div>
                  </div>
                  <button className="p-2.5 text-zinc-600 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <ExternalLink size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-100 p-10 rounded-[3rem] shadow-2xl text-zinc-950 relative overflow-hidden flex flex-col justify-between h-72 group">
            <div className="absolute -right-5 -top-5 opacity-5 group-hover:opacity-10 transition-opacity"><TrendingUp size={180} /></div>
            <div>
              <h4 className="text-2xl font-black flex items-center gap-3 mb-2 tracking-tighter uppercase">
                <div className="w-1.5 h-6 bg-zinc-950 rounded-full" /> Meta de Multiplicação
              </h4>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6">Status: 85% Capacidade</p>
              <div className="w-full bg-zinc-950/10 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
                <div className="bg-zinc-950 h-full rounded-full w-[85%] transition-all duration-1000"></div>
              </div>
            </div>
            <button className="w-full py-4 bg-zinc-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Conselho Pastoral</button>
          </div>
        </div>
      </div>

      {showReportForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowReportForm(false)} />
          <div className="relative bg-zinc-900 w-full max-w-xl rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-950/50">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Relatório Semanal</h3>
              <button onClick={() => setShowReportForm(false)} className="p-3 hover:bg-white rounded-2xl transition-all text-zinc-500">
                <X size={24} />
              </button>
            </div>
            <form className="p-10 space-y-8" onSubmit={(e) => { e.preventDefault(); setShowReportForm(false); }}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Data do Encontro</label>
                  <input type="date" className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 text-white font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Oferta (BRL)</label>
                  <input type="number" placeholder="0,00" className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 text-white font-bold" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Lista de Chamada</label>
                <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                  {cellMembers.map(m => (
                    <div key={m.id} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl border border-white/5 transition-all group">
                      <input type="checkbox" className="w-6 h-6 rounded-lg bg-zinc-950 border-white/10 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 transition-all cursor-pointer" />
                      <span className="text-xs font-black text-zinc-400 group-hover:text-white uppercase tracking-tight">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Relato Ministerial</label>
                <textarea rows={4} placeholder="Como o Espírito Santo moveu nesta reunião?" className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 text-white font-medium resize-none"></textarea>
              </div>

              <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                <MessageSquare size={20} /> ENVIAR RELATÓRIO AGORA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Cells: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const planLimit = PLAN_CONFIGS[MOCK_TENANT.plan].maxCells;
  const currentTotal = MOCK_TENANT.stats.activeCells;
  const isLimitReached = currentTotal >= planLimit;

  const handleAddCell = () => {
    if (isLimitReached) {
      setIsUpgradeModalOpen(true);
    } else {
      console.log('Opening add cell form...');
    }
  };

  if (selectedCell) {
    return <CellDetailView cell={selectedCell} onBack={() => setSelectedCell(null)} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Comunidades de Fé</h2>
          <p className="text-zinc-500 font-medium text-lg">
            Monitorando <span className="text-zinc-200 font-black">{currentTotal}</span> de <span className="text-zinc-200 font-black">{planLimit}</span> células.
          </p>
        </div>
        <button 
          onClick={handleAddCell}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.1em] transition-all shadow-xl ${
            isLimitReached 
              ? 'bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed opacity-50' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
          }`}
        >
          {isLimitReached ? <Lock size={18} /> : <Plus size={18} />}
          Nova Unidade
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_CELLS.map((cell) => (
          <div 
            key={cell.id} 
            onClick={() => setSelectedCell(cell)}
            className="bg-zinc-900 rounded-[2.5rem] border border-white/5 shadow-2xl hover:bg-zinc-800 hover:-translate-y-2 transition-all group overflow-hidden cursor-pointer flex flex-col h-full relative"
          >
            <div className="p-10 flex-1">
              <div className="flex justify-between items-start mb-10">
                <div className={`w-14 h-14 ${cell.status === 'MULTIPLYING' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl`}>
                  <Users size={28} />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest border ${cell.status === 'MULTIPLYING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                    {cell.status === 'MULTIPLYING' ? 'Em Expansão' : 'Operação Plena'}
                  </span>
                </div>
              </div>
              <h3 className="font-black text-white text-2xl mb-2 uppercase tracking-tight">{cell.name}</h3>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-10 italic">
                <User size={14} className="text-zinc-600" />
                Líder: {cell.leaderId === '1' ? 'João Silva' : 'Maria Santos'}
              </div>

              <div className="space-y-4 pt-10 border-t border-white/5">
                <div className="flex items-center gap-4 text-sm text-zinc-400 font-medium">
                  <MapPin size={18} className="text-rose-500" />
                  <span className="truncate">{cell.address}</span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-bold uppercase tracking-tight">
                    <Calendar size={18} className="text-blue-500" />
                    {cell.meetingDay}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-bold uppercase tracking-tight">
                    <Clock size={18} className="text-zinc-600" />
                    {cell.meetingTime}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 bg-zinc-950 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${cell.id}${i}`} 
                      className="w-10 h-10 rounded-[1rem] border-4 border-zinc-950 ring-1 ring-white/5 shadow-2xl" 
                      alt="Member" 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">
                  {cell.membersCount} Discípulos
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-tight">
                <TrendingUp size={14} />
                <span>88%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)}
        limitType="CELLS"
        currentLimit={planLimit}
      />
    </div>
  );
};

export default Cells;
