'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Plus, Trash2, Edit2, Check, Star } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
}

interface ExpertiseItem {
  _id: string;
  title: string;
  badge: string;
  description: string;
  isFeatured: boolean;
  metrics?: Metric[];
  tags?: string[];
  order: number;
}

const expertiseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  badge: z.string().min(1, 'Badge tag is required (e.g. EA, OFF, RT)'),
  description: z.string().min(1, 'Description is required'),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  order: z.number().default(0),
});

type ExpertiseFormValues = z.infer<typeof expertiseSchema>;

export default function AdminExpertisePage() {
  const [items, setItems] = useState<ExpertiseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Local state for metrics list in modal
  const [metrics, setMetrics] = useState<Metric[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm<ExpertiseFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(expertiseSchema) as any,
    defaultValues: { isFeatured: false, tags: [], order: 0 }
  });

  const fetchExpertise = async () => {
    try {
      const res = await api.get('/expertise');
      setItems(res.data.items || []);
    } catch (err) {
      console.error('Failed to fetch expertise items', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertise();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setMetrics([]);
    reset({
      title: '',
      badge: 'EA',
      description: '',
      isFeatured: false,
      tags: [],
      order: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ExpertiseItem) => {
    setEditingId(item._id);
    setMetrics(item.metrics || []);
    reset({
      title: item.title,
      badge: item.badge || 'EA',
      description: item.description,
      isFeatured: item.isFeatured || false,
      tags: item.tags || [],
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (data: ExpertiseFormValues) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        metrics: metrics.filter(m => m.label.trim() && m.value.trim()),
      };

      if (editingId) {
        await api.put(`/expertise/${editingId}`, payload);
      } else {
        await api.post('/expertise', payload);
      }
      setIsModalOpen(false);
      fetchExpertise();
      reset();
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save expertise item', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expertise highlight?')) return;
    try {
      await api.delete(`/expertise/${id}`);
      fetchExpertise();
    } catch (err) {
      console.error('Failed to delete expertise item', err);
    }
  };

  const addMetricRow = () => {
    setMetrics([...metrics, { value: '', label: '' }]);
  };

  const updateMetricRow = (index: number, field: 'label' | 'value', text: string) => {
    const updated = [...metrics];
    updated[index][field] = text;
    setMetrics(updated);
  };

  const removeMetricRow = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Technical Expertise</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Highlight your top technical expertise cards displayed on the homepage Bento grid.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all text-xs"
        >
          <Plus size={18} />
          Add Expertise Highlight
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className={`bg-zinc-900/40 border p-6 rounded-3xl flex flex-col justify-between group transition-all relative ${
              item.isFeatured ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/5' : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                  {item.badge}
                </div>
                <div className="flex items-center gap-2">
                  {item.isFeatured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      <Star size={11} className="fill-emerald-400" />
                      Featured Card
                    </span>
                  )}
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">{item.description}</p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-zinc-800 text-emerald-400 font-mono text-[10px] rounded">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Metrics */}
              {item.metrics && item.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800 mt-2">
                  {item.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-sm font-extrabold text-white">{m.value}</div>
                      <div className="text-[9px] font-mono text-zinc-500 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                {editingId ? 'Edit Expertise Highlight' : 'New Expertise Highlight'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Title</label>
                  <input {...register('title')} className="input-admin" placeholder="e.g. Enterprise Architecture" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Badge (Tag)</label>
                  <input {...register('badge')} className="input-admin" placeholder="EA / OFF / RT" />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Description</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="input-admin resize-none text-xs"
                  placeholder="Detailed description of your expertise, achievements, and impact..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register('isFeatured')}
                  id="isFeatured"
                  className="w-5 h-5 rounded-lg border-zinc-800 bg-zinc-950 text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="isFeatured" className="text-sm text-zinc-300 font-medium">
                  Set as Main Featured Bento Card (Spans 2 Columns on Homepage)
                </label>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Tags & Stack (Comma separated)</label>
                <input
                  className="input-admin"
                  placeholder="React Native, TypeScript, Enterprise Architecture"
                  defaultValue={watch('tags')?.join(', ')}
                  onChange={(e) => setValue('tags', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                />
              </div>

              {/* Metrics Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-zinc-400 text-xs uppercase font-bold">Metrics & Stats (Optional)</label>
                  <button
                    type="button"
                    onClick={addMetricRow}
                    className="text-emerald-400 text-xs font-mono font-bold hover:underline flex items-center gap-1"
                  >
                    + Add Metric
                  </button>
                </div>
                {metrics.map((m, idx) => (
                  <div key={idx} className="grid grid-cols-5 gap-2 items-center">
                    <input
                      className="input-admin col-span-2"
                      placeholder="Value (e.g. 10k+)"
                      value={m.value}
                      onChange={(e) => updateMetricRow(idx, 'value', e.target.value)}
                    />
                    <input
                      className="input-admin col-span-2"
                      placeholder="Label (e.g. Active Users)"
                      value={m.label}
                      onChange={(e) => updateMetricRow(idx, 'label', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeMetricRow(idx)}
                      className="text-red-400 hover:text-red-300 text-xs font-bold text-center"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-zinc-400 text-xs uppercase font-bold mb-1.5">Display Order</label>
                <input type="number" {...register('order', { valueAsNumber: true })} className="input-admin" placeholder="0" />
              </div>
            </div>

            <div className="p-6 border-t border-zinc-800 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl text-zinc-400 font-bold hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={submitting}
                className="bg-primary text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {submitting ? <Loader className="animate-spin" size={18} /> : <Check size={18} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
