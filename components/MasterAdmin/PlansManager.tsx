
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Zap, 
  Users, 
  Layers, 
  CheckCircle2, 
  Settings, 
  Plus,
  DollarSign,
  TrendingUp,
  BarChart3,
  X,
  Save,
  ShieldCheck,
  Crown,
  Trash2
} from 'lucide-react';
import { PlanType, PlanLimits } from '../../types';
import { PLAN_CONFIGS } from '../../constants';

const FEATURE_OPTIONS = [
  { id: 'DASHBOARD', label: 'Painéis Analíticos' },
  { id: 'MEMBERS', label: 'Gestão de Membros' },
  { id: 'CELLS', label: 'Gestão de Células' },
  { id: 'LADDER', label: 'Escada do Sucesso' },
  { id: 'PRAYER_SYSTEM', label: 'Sistema de Orações' },
  { id: 'FINANCE', label: 'Gestão Financeira' },
  { id: 'IA_INSIGHTS', label: 'Inteligência Artificial' },
  { id: 'WHITE_LABEL', label: 'White Label Personalizado' }
];

const PlanModal = ({ 
  isOpen, 
  onClose, 
  planType, 
  config, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  planType?: string | null; 
  config?: PlanLimits | null; 
  onSave: (type: string, data: PlanLimits) => void; 
}) => {
  const [formData, setFormData] = useState<any>({
    type: '',
    price: 0,
    maxMembers: 0,
    maxCells: 0,
    maxLeaders: 0,
    features: [] as string[]
  });

  useEffect(() => {
    if (planType && config) {
      setFormData({
        type: planType,
        ...config
      });
    } else {
      setFormData({
        type: '',
        price: 0,
        maxMembers: 100,
        maxCells: 10,
        maxLeaders: 5,
        features: ['DASHBOARD', 'MEMBERS']
      });
    }
  }, [planType, config, isOpen]);

  if (!isOpen) return null;

  const toggleFeature = (featureId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f: string) => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{planType ? `Editar SKU: ${planType}` : 'Criar Novo Plano SaaS'}</h3>
            <p className="text-sm text-slate-500 font-medium">Defina limites, preços e funcionalidades do pacote.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-200 shadow-sm">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <form className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide" onSubmit={(e) => { e.preventDefault(); onSave(formData.type, formData); }}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Identificador do Plano (SKU)</label>
              <input 
                required
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value.toUpperCase()})}
                disabled={!!planType}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold disabled:opacity-50" 
                placeholder="Ex: PREMIUM"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Preço Mensal (BRL)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="number"
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-bold" 
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Limite de Membros</label>
              <div className="relative">
                <Users className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="number"
                  value={formData.maxMembers}
                  onChange={e => setFormData({...formData, maxMembers: Number(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Limite de Células</label>
              <div className="relative">
                <Layers className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="number"
                  value={formData.maxCells}
                  onChange={e => setFormData({...formData, maxCells: Number(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Líderes Ativos</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="number"
                  value={formData.maxLeaders}
                  onChange={e => setFormData({...formData, maxLeaders: Number(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Recursos Habilitados</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURE_OPTIONS.map((feature) => (
                <div 
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.features.includes(feature.id) 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    formData.features.includes(feature.id) ? 'bg-blue-600 border-blue-600' : 'border-slate-200'
                  }`}>
                    {formData.features.includes(feature.id) && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <span className="text-sm font-bold">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all">
            Descartar
          </button>
          <button onClick={() => onSave(formData.type, formData)} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
            <Save size={20} /> {planType ? 'Salvar SKU Atual' : 'Publicar Novo Plano'}
          </button>
        </div>
      </div>
    </div>
  );
};

const PlanCard: React.FC<{ type: PlanType | string; config: PlanLimits; onEdit: () => void }> = ({ type, config, onEdit }) => (
  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
    {type === PlanType.ENTERPRISE && (
      <div className="absolute top-0 right-0 p-4">
        <Crown className="text-indigo-200" size={40} />
      </div>
    )}
    
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${
        type === PlanType.ENTERPRISE ? 'bg-indigo-50 text-indigo-600' : 
        type === PlanType.PRO ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
      }`}>
        <CreditCard size={28} />
      </div>
      <button 
        onClick={onEdit}
        className="p-3 text-slate-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 shadow-sm"
      >
        <Settings size={20} />
      </button>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-bold text-slate-800">{type}</h3>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-black text-slate-900">R$ {config.price}</span>
        <span className="text-slate-400 text-[10px] font-black uppercase">/ mês</span>
      </div>
    </div>
    
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-slate-500 flex items-center gap-2"><Users size={16} className="text-blue-500" /> Membros</span>
        <span className="text-slate-900">{config.maxMembers >= 99999 ? 'Ilimitado' : config.maxMembers}</span>
      </div>
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-slate-500 flex items-center gap-2"><Layers size={16} className="text-indigo-500" /> Células</span>
        <span className="text-slate-900">{config.maxCells >= 9999 ? 'Ilimitado' : config.maxCells}</span>
      </div>
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-slate-500 flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> Líderes</span>
        <span className="text-slate-900">{config.maxLeaders >= 9999 ? 'Ilimitado' : config.maxLeaders}</span>
      </div>
    </div>

    <div className="space-y-2.5 pt-6 border-t border-slate-100">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Diferenciais</p>
      {config.features.map(f => (
        <div key={f} className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-tighter">
          <CheckCircle2 size={12} className="text-emerald-500" /> {f.replace('_', ' ')}
        </div>
      ))}
    </div>
  </div>
);

const PlansManager: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<{type: string, config: PlanLimits} | null>(null);

  const handleEditPlan = (type: string, config: PlanLimits) => {
    setEditingPlan({ type, config });
    setIsModalOpen(true);
  };

  const handleAddPlan = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleSavePlan = (type: string, data: any) => {
    console.log(`Guardando plano ${type}:`, data);
    // Em um sistema real aqui atualizaríamos o backend ou estado global
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Planos & Assinaturas</h2>
          <p className="text-slate-500 font-medium italic">Defina a precificação e os limites técnicos do ecossistema SaaS.</p>
        </div>
        <button 
          onClick={handleAddPlan}
          className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Criar Novo SKU
        </button>
      </div>

      {/* Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <TrendingUp className="opacity-50" size={32} />
            <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-black">+12% vs m.a.</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">MRR Atual Global</p>
            <h3 className="text-3xl font-black">R$ 42.500</h3>
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-200 flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <BarChart3 className="opacity-50" size={32} />
            <span className="text-[10px] bg-blue-500 px-3 py-1 rounded-full font-black">OTIMIZAR</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Conversão SaaS</p>
            <h3 className="text-3xl font-black">24.5%</h3>
          </div>
        </div>
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <Zap className="opacity-50" size={32} />
            <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-black">124 ATIVAS</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Distribuição Pro</p>
            <h3 className="text-3xl font-black">84% de adesão</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 pb-12">
        {Object.entries(PLAN_CONFIGS).map(([type, config]) => (
          <PlanCard 
            key={type} 
            type={type} 
            config={config} 
            onEdit={() => handleEditPlan(type, config)} 
          />
        ))}
      </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planType={editingPlan?.type}
        config={editingPlan?.config}
        onSave={handleSavePlan}
      />
    </div>
  );
};

export default PlansManager;
