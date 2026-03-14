import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, AlignLeft, Save } from 'lucide-react';
import { ChurchEvent } from '../../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Partial<ChurchEvent>) => Promise<void>;
  event: ChurchEvent | null;
  churchId: string;
  userId: string;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, event, churchId, userId }) => {
  const [formData, setFormData] = useState<Partial<ChurchEvent>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        church_id: churchId,
        created_by: userId
      });
    }
  }, [event, churchId, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSave(formData);
      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar evento:', error);
      alert(error?.message || 'Erro ao salvar os dados do evento.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              {event ? 'Editar Evento' : 'Novo Evento'}
            </h3>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">
              Agenda Ministerial
            </p>
          </div>
          <button onClick={onClose} className="p-3 text-zinc-500 hover:text-white bg-white/5 rounded-2xl transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Título do Evento</label>
              <input
                required
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Culto de Celebração, Encontro de Células..."
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all font-black uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Data</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input
                    type="date"
                    required
                    value={formData.date || ''}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-black uppercase appearance-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Horário</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input
                    type="time"
                    value={formData.time || ''}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-black uppercase appearance-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Local</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input
                  value={formData.location || ''}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Templo Principal, Sítio..."
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-black uppercase"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Descrição (Opcional)</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 text-zinc-600" size={18} />
                <textarea
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalhes adicionais do evento..."
                  rows={3}
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500 transition-all resize-none font-medium"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Save size={16} />
              {saving ? 'Salvando...' : 'Salvar Evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
