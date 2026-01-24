'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  featured: boolean;
  order: number;
  technologies: string[];
  metrics: { label: string; value: string }[];
  links: { type: string; url: string }[];
}

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  technologies: z.array(z.string()).default([]),
  links: z.array(z.object({ type: z.string(), url: z.string() })).default([]),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<ProjectFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(projectSchema) as any,
    defaultValues: { metrics: [], technologies: [], links: [], featured: false }
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.projects);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data: ProjectFormValues) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, data);
      } else {
        await api.post('/projects', data);
      }
      setIsModalOpen(false);
      fetchProjects();
      reset();
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save project', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (proj: Project) => {
    setEditingId(proj._id);
    reset(proj);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-zinc-500 mt-1">Manage your portfolio showcase items.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            reset({ metrics: [], technologies: [], links: [], featured: false });
            setIsModalOpen(true);
          }}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl group hover:border-zinc-700 transition-all flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">{proj.title}</h3>
                <div className="flex gap-2 mt-2">
                  {proj.featured && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Featured</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => handleEdit(proj)} className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(proj._id)} className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="text-zinc-500 text-sm line-clamp-2">{proj.description}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Project' : 'Create Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Project Title</label>
                <input {...register('title')} className="input-admin" placeholder="Project name" />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Description</label>
                <textarea {...register('description')} rows={4} className="input-admin resize-none" placeholder="Explain the project..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" {...register('featured')} id="proj-featured" className="w-5 h-5 rounded-lg border-zinc-800 bg-zinc-950 text-emerald-500" />
                  <label htmlFor="proj-featured" className="text-sm text-zinc-400">Mark as Featured</label>
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Display Order</label>
                  <input type="number" {...register('order', { valueAsNumber: true })} className="input-admin" />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Technologies (Comma separated)</label>
                <input
                  className="input-admin"
                  placeholder="React, Next.js, Node.js"
                  defaultValue={watch('technologies')?.join(', ')}
                  onChange={(e) => setValue('technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                />
              </div>

              {/* Add more fields here for links and metrics if needed */}
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
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
