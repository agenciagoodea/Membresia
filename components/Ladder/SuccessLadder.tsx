
import React, { useState } from 'react';
import { 
  UserPlus, 
  ChevronRight, 
  History, 
  MessageSquare, 
  MoreVertical,
  UserCheck,
  Zap,
  Send,
  Target,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Filter,
  Search as SearchIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_MEMBERS } from '../../constants';
import { LadderStage, Member } from '../../types';

interface LadderColumnProps {
  title: string;
  stage: LadderStage;
  icon: React.ReactNode;
  color: string;
  accentColor: string;
  description: string;
  members: Member[];
  onSelectMember: (member: Member) => void;
  onAdvance: (member: Member) => void;
}

const LadderColumn: React.FC<LadderColumnProps> = ({ 
  title, stage, icon, color, accentColor, description, members, onSelectMember, onAdvance 
}) => {
  return (
    <div className="flex flex-col h-full min-w-[320px] bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-5 transition-all hover:border-white/10">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg shadow-${accentColor}/20`}>
            {icon}
          </div>
          <div>
            <h3 className="font-black text-white text-lg tracking-tight flex items-center gap-2">
              {title}
              <span className="text-[10px] bg-white/10 text-zinc-400 px-2 py-0.5 rounded-full border border-white/5 font-bold">
                {members.length}
              </span>
            </h3>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">{description}</p>
          </div>
        </div>
        <button className="p-2 text-zinc-600 hover:text-white transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {members.map((member, index) => (
            <motion.div 
              key={member.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-800/50 p-4 rounded-3xl border border-white/5 hover:border-white/20 hover:bg-zinc-800 transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => onSelectMember(member)}
            >
              {/* Progress Bar Background */}
              <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full" />
              <div 
                className={`absolute bottom-0 left-0 h-1 ${color} opacity-50`} 
                style={{ width: `${Math.min(100, (member.stageHistory.length / 4) * 100)}%` }} 
              />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={member.avatar} className="w-10 h-10 rounded-2xl border border-white/10 object-cover" alt="" />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-900 ${color} flex items-center justify-center`}>
                      <CheckCircle2 size={8} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{member.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={10} className="text-zinc-500" />
                      <p className="text-[10px] text-zinc-500 font-medium">Há 12 dias nesta etapa</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Score</span>
                   <span className="text-xs font-bold text-white">85%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-zinc-800 flex items-center justify-center" title={`Atividade ${i}`}>
                      <MessageSquare size={10} className="text-zinc-400" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-500">
                    +2
                  </div>
                </div>
                
                {stage !== LadderStage.SEND && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAdvance(member);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white text-zinc-400 hover:text-zinc-950 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                  >
                    Avançar <ArrowUpRight size={12} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {members.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.02]">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <AlertCircle size={20} className="text-zinc-600" />
            </div>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Sem registros</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SuccessLadder: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStageMembers = (stage: LadderStage) => 
    members.filter(m => m.stage === stage && m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAdvance = (member: Member) => {
    const stages = [LadderStage.WIN, LadderStage.CONSOLIDATE, LadderStage.DISCIPLE, LadderStage.SEND];
    const currentIndex = stages.indexOf(member.stage);
    
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      const updatedMembers = members.map(m => {
        if (m.id === member.id) {
          return {
            ...m,
            stage: nextStage,
            stageHistory: [
              ...m.stageHistory,
              {
                stage: nextStage,
                date: new Date().toISOString(),
                recordedBy: 'Pr. André Lourenço',
                notes: `Avançou para a etapa de ${nextStage.toLowerCase()} via painel estratégico.`
              }
            ]
          };
        }
        return m;
      });
      setMembers(updatedMembers);
    }
  };

  const stats = [
    { label: 'Conversões Mês', value: '24', trend: '+12%', icon: <Target className="text-blue-500" /> },
    { label: 'Em Consolidação', value: '18', trend: '+5%', icon: <UserCheck className="text-emerald-500" /> },
    { label: 'Novos Líderes', value: '06', trend: '+2%', icon: <Zap className="text-amber-500" /> },
    { label: 'Taxa Retenção', value: '92%', trend: '+8%', icon: <TrendingUp className="text-rose-500" /> },
  ];

  return (
    <div className="h-full flex flex-col gap-8">
      {/* Header & Stats */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter">Escada do Sucesso</h2>
            </div>
            <p className="text-zinc-500 font-medium max-w-xl">
              Gestão estratégica do crescimento espiritual. Acompanhe cada discípulo desde a conversão até a liderança reprodutora.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar discípulo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all w-full sm:w-64"
              />
            </div>
            <button className="p-3 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-400 hover:text-white hover:border-white/10 transition-all">
              <Filter size={20} />
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
              <UserPlus size={18} />
              <span className="hidden sm:inline">Novo Visitante</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-900/50 border border-white/5 p-5 rounded-[2rem] flex items-center justify-between group hover:border-white/10 transition-all">
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-2xl font-black text-white">{stat.value}</h4>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ladder Columns */}
      <div className="flex-1 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-6 h-full min-w-max">
          <LadderColumn 
            title="Ganhar" 
            stage={LadderStage.WIN}
            icon={<Target size={24} />} 
            color="bg-blue-600"
            accentColor="blue"
            description="Novas Decisões"
            members={getStageMembers(LadderStage.WIN)}
            onSelectMember={setSelectedMember}
            onAdvance={handleAdvance}
          />
          <LadderColumn 
            title="Consolidar" 
            stage={LadderStage.CONSOLIDATE}
            icon={<UserCheck size={24} />} 
            color="bg-emerald-600"
            accentColor="emerald"
            description="Integração"
            members={getStageMembers(LadderStage.CONSOLIDATE)}
            onSelectMember={setSelectedMember}
            onAdvance={handleAdvance}
          />
          <LadderColumn 
            title="Discipular" 
            stage={LadderStage.DISCIPLE}
            icon={<Zap size={24} />} 
            color="bg-amber-600"
            accentColor="amber"
            description="Treinamento"
            members={getStageMembers(LadderStage.DISCIPLE)}
            onSelectMember={setSelectedMember}
            onAdvance={handleAdvance}
          />
          <LadderColumn 
            title="Enviar" 
            stage={LadderStage.SEND}
            icon={<Send size={24} />} 
            color="bg-rose-600"
            accentColor="rose"
            description="Multiplicação"
            members={getStageMembers(LadderStage.SEND)}
            onSelectMember={setSelectedMember}
            onAdvance={handleAdvance}
          />
        </div>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedMember(null)} 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-zinc-950 h-full shadow-2xl border-l border-white/10 overflow-y-auto scrollbar-hide"
            >
              <div className="sticky top-0 z-10 p-8 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">Dossiê do Discípulo</h3>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Histórico de Evolução</p>
                </div>
                <button 
                  onClick={() => setSelectedMember(null)} 
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-6 mb-12">
                  <div className="relative">
                    <img src={selectedMember.avatar} className="w-24 h-24 rounded-[2.5rem] border-4 border-white/5 shadow-2xl object-cover" alt="" />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white border-4 border-zinc-950">
                      <TrendingUp size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-white tracking-tighter mb-1">{selectedMember.name}</h4>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                        {selectedMember.stage}
                      </span>
                      <span className="text-zinc-500 text-xs font-medium">Desde {new Date(selectedMember.joinedDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-12">
                  <div className="bg-zinc-900 border border-white/5 p-5 rounded-3xl">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Célula Atual</p>
                    <p className="text-sm font-bold text-white">Célula Renovo</p>
                  </div>
                  <div className="bg-zinc-900 border border-white/5 p-5 rounded-3xl">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Discipulador</p>
                    <p className="text-sm font-bold text-white">Pr. André Lourenço</p>
                  </div>
                </div>

                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-white/5">
                  {selectedMember.stageHistory.map((entry, i) => (
                    <div key={i} className="relative flex gap-8 pl-12">
                      <div className={`absolute left-0 top-1 w-10 h-10 rounded-2xl border-4 border-zinc-950 shadow-xl flex items-center justify-center z-10 ${
                        entry.stage === LadderStage.SEND ? 'bg-rose-600' :
                        entry.stage === LadderStage.DISCIPLE ? 'bg-amber-600' :
                        entry.stage === LadderStage.CONSOLIDATE ? 'bg-emerald-600' :
                        'bg-blue-600'
                      }`}>
                        {entry.stage === LadderStage.SEND ? <Send size={16} className="text-white" /> :
                         entry.stage === LadderStage.DISCIPLE ? <Zap size={16} className="text-white" /> :
                         entry.stage === LadderStage.CONSOLIDATE ? <UserCheck size={16} className="text-white" /> :
                         <Target size={16} className="text-white" />}
                      </div>
                      <div className="flex-1 bg-zinc-900/50 border border-white/5 p-6 rounded-[2rem] hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-black text-white uppercase tracking-wider">{entry.stage}</span>
                          <span className="text-[10px] text-zinc-500 font-bold">{new Date(entry.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-4">{entry.notes || 'Progresso registrado automaticamente pelo sistema de visão celular.'}</p>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 bg-white/5 w-fit px-3 py-1.5 rounded-xl font-bold uppercase tracking-widest">
                           <UserCheck size={12} className="text-blue-500" /> {entry.recordedBy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                     <Zap size={120} />
                   </div>
                   <div className="relative z-10">
                     <h5 className="text-lg font-black text-white mb-2 flex items-center gap-3">
                       <Zap size={24} /> Próximo Nível
                     </h5>
                     <p className="text-sm text-blue-100/80 mb-8 font-medium leading-relaxed">
                       {selectedMember.stage === LadderStage.WIN ? 'O discípulo está pronto para iniciar o processo de consolidação e integração na vida da igreja.' : 
                        selectedMember.stage === LadderStage.CONSOLIDATE ? 'Maturidade identificada. Recomendado para o próximo ciclo da Escola de Líderes.' :
                        selectedMember.stage === LadderStage.DISCIPLE ? 'Potencial de liderança confirmado. Preparar para o envio e multiplicação da célula.' :
                        'Líder em plena operação. Focar em mentoria para formação de novos discipuladores.'}
                     </p>
                     <button className="w-full py-4 bg-white text-blue-600 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-100 transition-all shadow-xl active:scale-95">
                       Efetivar Transição
                     </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuccessLadder;
