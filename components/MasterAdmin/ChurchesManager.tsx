
import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Plus, 
  Search, 
  CheckCircle2, 
  Edit,
  Power,
  CreditCard,
  X,
  Save,
  MapPin,
  Building2,
  User,
  Phone,
  Mail,
  Loader2,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { MOCK_CHURCHES } from '../../constants';
import { ChurchStatus, PlanType, ChurchTenant } from '../../types';

const ChurchModal = ({ isOpen, onClose, church, onSave }: { isOpen: boolean, onClose: () => void, church?: ChurchTenant | null, onSave: (data: any) => void }) => {
  const [loadingCep, setLoadingCep] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<any>({
    name: '',
    slug: '',
    cnpj: '',
    responsibleName: '',
    email: '',
    phone: '',
    plan: PlanType.BASIC,
    status: ChurchStatus.ACTIVE,
    logo: '',
    addressDetails: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  });

  useEffect(() => {
    if (church) {
      setFormData(church);
    } else {
      setFormData({
        name: '',
        slug: '',
        cnpj: '',
        responsibleName: '',
        email: '',
        phone: '',
        plan: PlanType.BASIC,
        status: ChurchStatus.ACTIVE,
        logo: '',
        addressDetails: {
          cep: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: ''
        }
      });
    }
  }, [church, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCepBlur = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setFormData((prev: any) => ({
          ...prev,
          addressDetails: {
            ...prev.addressDetails,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
            cep: cleanCep
          }
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoadingCep(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{church ? 'Editar Instância White Label' : 'Novo Cliente SaaS'}</h3>
            <p className="text-sm text-slate-500 font-medium">Configure a identidade e os parâmetros operacionais da igreja.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-200 shadow-sm">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <form className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          
          {/* SEÇÃO 1: Identidade & Branding */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <Building2 size={16} /> Identidade & Branding (White Label)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Nome da Igreja</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium" 
                    placeholder="Ex: Igreja Metodista Central"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Subdomínio do Tenant</label>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                    <span className="text-slate-400 text-sm font-medium">ecclesia.com/</span>
                    <input 
                      required
                      value={formData.slug}
                      onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s/g, '-')})}
                      className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-blue-600" 
                      placeholder="igreja-exemplo"
                    />
                  </div>
                </div>
              </div>

              {/* Upload de Logo */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Logo da Instituição</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group border-2 border-dashed border-slate-200 rounded-3xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden bg-slate-50"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {formData.logo ? (
                    <>
                      <img src={formData.logo} className="w-full h-full object-contain p-4" alt="Preview" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Upload className="text-white" size={24} />
                        <span className="text-white text-xs font-bold uppercase">Trocar Logo</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm text-slate-400">
                        <ImageIcon size={24} />
                      </div>
                      <p className="text-xs font-bold text-slate-600">Enviar Logo</p>
                      <p className="text-[10px] text-slate-400 mt-1">PNG, JPG ou SVG (Máx. 2MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: Contato & Responsável */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
              <User size={16} /> Contato & Responsável
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Responsável</label>
                <input 
                  value={formData.responsibleName}
                  onChange={e => setFormData({...formData, responsibleName: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-medium" 
                  placeholder="Nome do Pastor/Admin"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">E-mail</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-medium" 
                  placeholder="adm@igreja.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Telefone</label>
                <input 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-medium" 
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </section>

          {/* SEÇÃO 3: Endereço (Automação CEP) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              <MapPin size={16} /> Localização (Automação de Endereço)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 bg-indigo-50/30 p-6 rounded-3xl border border-indigo-100/50">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">CEP</label>
                <div className="relative">
                  <input 
                    required
                    maxLength={9}
                    value={formData.addressDetails?.cep}
                    onBlur={(e) => handleCepBlur(e.target.value)}
                    onChange={e => setFormData({...formData, addressDetails: {...formData.addressDetails, cep: e.target.value}})}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold" 
                    placeholder="00000-000"
                  />
                  {loadingCep && <Loader2 className="absolute right-4 top-3.5 animate-spin text-indigo-600" size={18} />}
                </div>
              </div>
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Logradouro</label>
                <input 
                  required
                  value={formData.addressDetails?.street}
                  onChange={e => setFormData({...formData, addressDetails: {...formData.addressDetails, street: e.target.value}})}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium" 
                  placeholder="Rua, Avenida, etc."
                />
              </div>
              <div className="md:col-span-1 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Número</label>
                <input 
                  required
                  value={formData.addressDetails?.number}
                  onChange={e => setFormData({...formData, addressDetails: {...formData.addressDetails, number: e.target.value}})}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium" 
                  placeholder="123"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bairro</label>
                <input 
                  required
                  value={formData.addressDetails?.neighborhood}
                  onChange={e => setFormData({...formData, addressDetails: {...formData.addressDetails, neighborhood: e.target.value}})}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium" 
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cidade</label>
                <input 
                  required
                  value={formData.addressDetails?.city}
                  onChange={e => setFormData({...formData, addressDetails: {...formData.addressDetails, city: e.target.value}})}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium" 
                />
              </div>
              <div className="md:col-span-1 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">UF</label>
                <input 
                  required
                  maxLength={2}
                  value={formData.addressDetails?.state}
                  onChange={e => setFormData({...formData, addressDetails: {...formData.addressDetails, state: e.target.value.toUpperCase()}})}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-center" 
                />
              </div>
            </div>
          </section>

          {/* SEÇÃO 4: SaaS Config */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-widest">
              <CreditCard size={16} /> Configurações de Assinatura
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-900 rounded-[2.5rem] text-white">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Plano de Acesso</label>
                <select 
                  value={formData.plan}
                  onChange={e => setFormData({...formData, plan: e.target.value as PlanType})}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-white/10 transition-all font-bold"
                >
                  <option className="text-slate-900" value={PlanType.BASIC}>Basic (Lançamento)</option>
                  <option className="text-slate-900" value={PlanType.PRO}>Pro (Crescimento)</option>
                  <option className="text-slate-900" value={PlanType.ENTERPRISE}>Enterprise (Denominação)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Status da Conta</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as ChurchStatus})}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-white/10 transition-all font-bold"
                >
                  <option className="text-slate-900" value={ChurchStatus.ACTIVE}>Ativo</option>
                  <option className="text-slate-900" value={ChurchStatus.SUSPENDED}>Suspenso (Inadimplência)</option>
                  <option className="text-slate-900" value={ChurchStatus.PENDING}>Pendente (Aguardando Configuração)</option>
                </select>
              </div>
            </div>
          </section>
        </form>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all">
            Cancelar
          </button>
          <button onClick={() => onSave(formData)} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
            <Save size={20} /> {church ? 'Salvar Alterações White Label' : 'Finalizar e Ativar Instância'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChurchesManager: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChurch, setEditingChurch] = useState<ChurchTenant | null>(null);

  const handleEdit = (church: ChurchTenant) => {
    setEditingChurch(church);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingChurch(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Gestão de Clientes White Label</h2>
          <p className="text-slate-500 font-medium italic">Administre os tenants do seu ecossistema SaaS.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-2xl border border-blue-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
            <CheckCircle2 size={16} /> 124 Instâncias Ativas
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            Cadastrar Novo Cliente
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-[1.5rem] border border-slate-200 flex-1 max-w-md focus-within:ring-4 focus-within:ring-blue-100 transition-all">
            <Search size={20} className="text-slate-400" />
            <input type="text" placeholder="Buscar por igreja, responsável ou CNPJ..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase transition-all">
               <Globe size={18} /> Ver Subdomínios
             </button>
             <div className="w-px h-6 bg-slate-200"></div>
             <button className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 font-bold text-xs uppercase transition-all">
               <CreditCard size={18} /> Faturas em Aberto
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-10 py-6">Instituição (Framework White Label)</th>
                <th className="px-6 py-6 text-center">Status</th>
                <th className="px-6 py-6 text-center">Plano</th>
                <th className="px-6 py-6">Uso</th>
                <th className="px-6 py-6">Cidade</th>
                <th className="px-10 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CHURCHES.map((church) => (
                <tr key={church.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-[1.25rem] bg-white border border-slate-200 overflow-hidden shrink-0 shadow-sm p-1.5 flex items-center justify-center">
                        {church.logo ? (
                          <img src={church.logo} className="max-w-full max-h-full object-contain rounded-lg" alt="" />
                        ) : (
                          <ImageIcon size={24} className="text-slate-200" />
                        )}
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 mb-0.5">{church.name}</p>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] text-blue-600 font-black uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded">ecclesia.com/{church.slug}</span>
                           <span className="text-[10px] text-slate-400 font-bold">{church.cnpj || 'CNPJ não inf.'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      church.status === ChurchStatus.ACTIVE ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      church.status === ChurchStatus.SUSPENDED ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${church.status === ChurchStatus.ACTIVE ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                      {church.status}
                    </span>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg ${
                      church.plan === PlanType.ENTERPRISE ? 'bg-indigo-900 text-white shadow-lg shadow-indigo-100' : 
                      church.plan === PlanType.PRO ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {church.plan}
                    </span>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{church.stats.totalMembers}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">MEMBROS</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{church.stats.activeCells}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">CÉLULAS</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                      <MapPin size={16} className="text-rose-500" />
                      {church.addressDetails?.city || 'S. Paulo'}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(church)}
                        className="p-3 text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-all shadow-sm"
                        title="Configurar White Label"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-3 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl hover:bg-emerald-100 transition-all shadow-sm"
                        title="Acessar Dashboard"
                      >
                        <ExternalLink size={18} />
                      </button>
                      <button 
                        className="p-3 text-slate-400 bg-slate-50 border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm"
                        title="Gerenciar Status"
                      >
                        <Power size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ChurchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        church={editingChurch}
        onSave={(data) => { console.log('Saving church...', data); setIsModalOpen(false); }}
      />
    </div>
  );
};

export default ChurchesManager;
