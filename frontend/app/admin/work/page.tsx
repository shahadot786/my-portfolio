'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Plus, Trash2, Edit2, X, Check, Briefcase } from 'lucide-react';

interface Experience {
  _id: string;
  company: string;
  location: string;
  title: string;
  period: string;
  isCurrent: boolean;
  description?: string;
  achievements: string[];
  technologies: string[];
  order: number;
}

const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  title: z.string().min(1, 'Title is required'),
  period: z.string().min(1, 'Period is required'),
  isCurrent: z.boolean().default(false),
  description: z.string().optional(),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  order: z.number().default(0),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function AdminWorkPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm<ExperienceFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(experienceSchema) as any,
    defaultValues: { achievements: [], technologies: [], isCurrent: false }
  });

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experiences');
      setExperiences(res.data.experiences);
    } catch (err) {
      console.error('Failed to fetch experiences', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const onSubmit = async (data: ExperienceFormValues) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/experiences/${editingId}`, data);
      } else {
        await api.post('/experiences', data);
      }
      setIsModalOpen(false);
      fetchExperiences();
      reset();
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save experience', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp._id);
    reset({
      company: exp.company,
      location: exp.location,
      title: exp.title,
      period: exp.period,
      isCurrent: exp.isCurrent,
      description: exp.description,
      achievements: exp.achievements,
      technologies: exp.technologies,
      order: exp.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      await api.delete(`/experiences/${id}`);
      fetchExperiences();
    } catch (err) {
      console.error('Failed to delete experience', err);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Work Experience</h1>
          <p className="text-zinc-500 mt-1">Manage your professional career timeline.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            reset({ achievements: [], technologies: [], isCurrent: false });
            setIsModalOpen(true);
          }}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex items-center justify-between group hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold">{exp.title}</h3>
                <p className="text-zinc-500 text-sm">{exp.company} • {exp.period}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => handleEdit(exp)}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Company</label>
                  <input {...register('company')} className="input-admin" placeholder="Google" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Location</label>
                  <input {...register('location')} className="input-admin" placeholder="Remote / City" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Title</label>
                  <input {...register('title')} className="input-admin" placeholder="Senior Developer" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Period</label>
                  <input {...register('period')} className="input-admin" placeholder="Jan 2023 - Present" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" {...register('isCurrent')} id="isCurrent" className="w-5 h-5 rounded-lg border-zinc-800 bg-zinc-950 text-primary focus:ring-primary" />
                <label htmlFor="isCurrent" className="text-sm text-zinc-300">I am currently working here</label>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Description</label>
                <textarea {...register('description')} rows={3} className="input-admin resize-none" placeholder="Short overview of your role..." />
              </div>

              {/* Tag inputs would be better here, but for now we'll use comma separation for simplicity in this demo */}
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Achievements (One per line)</label>
                <textarea
                  className="input-admin resize-none"
                  rows={4}
                  placeholder="Built X using Y..."
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter(l => l.trim());
                    setValue('achievements', lines);
                  }}
                  defaultValue={watch('achievements').join('\n')}
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Technologies (Comma separated)</label>
                <input
                  className="input-admin"
                  placeholder="React, Node.js, AWS..."
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                    setValue('technologies', tags);
                  }}
                  defaultValue={watch('technologies').join(', ')}
                />
              </div>
            </div>

            <div className="p-6 bg-zinc-800/50 border-t border-zinc-800 flex justify-end gap-3">
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
                Save Experience
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
