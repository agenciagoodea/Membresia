import { supabase } from './supabaseClient';
import { ChurchEvent } from '../types';

export const eventService = {
  async getAll(churchId: string): Promise<ChurchEvent[]> {
    if (!churchId) return [];
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('church_id', churchId)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getUpcoming(churchId: string, limit: number = 5): Promise<ChurchEvent[]> {
    if (!churchId) return [];
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('church_id', churchId)
      .gte('date', today)
      .order('date', { ascending: true })
      .order('time', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async create(eventData: Omit<ChurchEvent, 'id' | 'created_at'>): Promise<ChurchEvent> {
    const { data, error } = await supabase
      .from('events')
      .insert([{
        ...eventData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<ChurchEvent>): Promise<ChurchEvent> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
