'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import {
  Loader, Plus, Trash2, Edit2, X, Check,
  CalendarDays, ChevronDown, ChevronRight, Target
} from 'lucide-react';

// --- Types ---

interface ChecklistItem {
  text: string;
  completed: boolean;
  hour: number;
}

interface TrackerDay {
  dayNumber: number;
  date: string;
  title: string;
  status: 'pending' | 'completed' | 'skipped' | 'in-progress';
  hoursLogged: number;
  notes: string;
  mood: string;
  checklist: ChecklistItem[];
}

interface Milestone {
  title: string;
  dayNumber: number;
  completed: boolean;
}

interface Tracker {
  _id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dailyHours: number;
  status: string;
  tags: string[];
  featured: boolean;
  color: string;
  milestones: Milestone[];
  days: TrackerDay[];
}

// --- Schemas ---

const trackerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().default(''),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  totalDays: z.number().min(1),
  dailyHours: z.number().min(1).default(5),
  status: z.enum(['active', 'completed', 'paused']).default('active'),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  color: z.string().default('#34d399'),
});

type TrackerFormValues = z.infer<typeof trackerSchema>;

const daySchema = z.object({
  dayNumber: z.number().min(1),
  title: z.string().default(''),
  status: z.enum(['pending', 'completed', 'skipped', 'in-progress']).default('pending'),
  hoursLogged: z.number().default(0),
  notes: z.string().default(''),
  mood: z.enum(['great', 'good', 'neutral', 'tough', '']).default(''),
});

type DayFormValues = z.infer<typeof daySchema>;

// --- Day Manager Component ---

function DayManager({ tracker, onRefresh }: { tracker: Tracker; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [dayModal, setDayModal] = useState(false);
  const [editingDay, setEditingDay] = useState<TrackerDay | null>(null);
  const [submittingDay, setSubmittingDay] = useState(false);
  const [checklistText, setChecklistText] = useState('');
  const [bulkModal, setBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);

  const dayForm = useForm<DayFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(daySchema) as any,
    defaultValues: { dayNumber: 1, status: 'pending', hoursLogged: 0, mood: '' },
  });

  const openAddDay = () => {
    const nextDay = tracker.days.length > 0
      ? Math.max(...tracker.days.map(d => d.dayNumber)) + 1
      : 1;
    dayForm.reset({ dayNumber: nextDay, status: 'pending', hoursLogged: 0, mood: '' });
    setChecklistText('');
    setEditingDay(null);
    setDayModal(true);
  };

  const openEditDay = (day: TrackerDay) => {
    dayForm.reset({
      dayNumber: day.dayNumber,
      title: day.title,
      status: day.status,
      hoursLogged: day.hoursLogged,
      notes: day.notes,
      mood: day.mood as DayFormValues['mood'],
    });
    setChecklistText(day.checklist.map(c => `${c.completed ? '[x] ' : ''}${c.text} (hr${c.hour})`).join('\n'));
    setEditingDay(day);
    setDayModal(true);
  };

  const parseChecklist = (text: string): ChecklistItem[] => {
    return text.split('\n').filter(l => l.trim()).map(line => {
      const completed = line.startsWith('[x]');
      const clean = line.replace(/^\[x\]\s*/, '').trim();
      const hourMatch = clean.match(/\(hr(\d+)\)$/);
      const hour = hourMatch ? parseInt(hourMatch[1]) : 1;
      const itemText = clean.replace(/\s*\(hr\d+\)$/, '').trim();
      return { text: itemText, completed, hour };
    });
  };

  const submitDay = async (data: DayFormValues) => {
    setSubmittingDay(true);
    try {
      const checklist = parseChecklist(checklistText);
      const payload = { ...data, checklist };

      if (editingDay) {
        await api.put(`/trackers/${tracker.slug}/days/${data.dayNumber}`, payload);
      } else {
        await api.post(`/trackers/${tracker.slug}/days`, payload);
      }
      setDayModal(false);
      onRefresh();
    } catch (err) {
      console.error('Failed to save day', err);
    } finally {
      setSubmittingDay(false);
    }
  };

  const deleteDay = async (dayNumber: number) => {
    if (!confirm(`Delete Day ${dayNumber}?`)) return;
    try {
      await api.delete(`/trackers/${tracker.slug}/days/${dayNumber}`);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDayStatus = async (day: TrackerDay) => {
    const nextStatus: Record<string, string> = {
      pending: 'in-progress',
      'in-progress': 'completed',
      completed: 'pending',
      skipped: 'pending',
    };
    try {
      await api.put(`/trackers/${tracker.slug}/days/${day.dayNumber}`, {
        ...day,
        status: nextStatus[day.status] || 'pending',
      });
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  // Bulk import: parse structured text into days
  const handleBulkImport = async () => {
    setBulkLoading(true);
    try {
      const lines = bulkText.split('\n').filter(l => l.trim());
      let currentDay = 0;
      let currentTitle = '';
      const days: Array<{ dayNumber: number; title: string; checklist: ChecklistItem[] }> = [];
      let currentChecklist: ChecklistItem[] = [];

      for (const line of lines) {
        // Match "Day X:" or "**Day X:**" or "Day X"
        const dayMatch = line.match(/^(\*\*?)?Day\s+(\d+)/i);
        if (dayMatch) {
          if (currentDay > 0) {
            days.push({ dayNumber: currentDay, title: currentTitle, checklist: currentChecklist });
          }
          currentDay = parseInt(dayMatch[2]);
          // Strip "Day X:", markdown stars, and extra symbols to get the title
          currentTitle = line.replace(/^(\*\*?)?Day\s+\d+[:\s]*/i, '').replace(/\*?\*?$/, '').trim();
          currentChecklist = [];
        } else if (currentDay > 0 && (line.trim().startsWith('-') || line.trim().startsWith('*'))) {
          // Match "- Hour X: Text" or "- Text (Hour X)"
          const hourMatch = line.match(/Hour\s+(\d+)/i);
          const hour = hourMatch ? parseInt(hourMatch[1]) : currentChecklist.length + 1;
          const text = line.replace(/^[-*]\s*/, '').replace(/Hour\s+\d+[:\s]*/i, '').replace(/\s*\(Hour\s+\d+\)$/i, '').trim();
          if (text) currentChecklist.push({ text, completed: false, hour });
        }
      }
      if (currentDay > 0) {
        days.push({ dayNumber: currentDay, title: currentTitle, checklist: currentChecklist });
      }

      // Submit all days
      for (const day of days) {
        await api.post(`/trackers/${tracker.slug}/days`, {
          dayNumber: day.dayNumber,
          title: day.title,
          status: 'pending',
          hoursLogged: 0,
          notes: '',
          mood: '',
          checklist: day.checklist,
        });
      }

      setBulkModal(false);
      setBulkText('');
      onRefresh();
    } catch (err) {
      console.error('Bulk import failed', err);
    } finally {
      setBulkLoading(false);
    }
  };

  const statusColors: Record<string, string> = {
    completed: 'bg-emerald-500',
    'in-progress': 'bg-amber-500',
    skipped: 'bg-zinc-600',
    pending: 'bg-zinc-800',
  };

  const sortedDays = [...tracker.days].sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <CalendarDays size={16} />
        {tracker.days.length} Days Logged
      </button>

      {expanded && (
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <button
              onClick={openAddDay}
              className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-zinc-700"
            >
              <Plus size={14} /> Add Day
            </button>
            <button
              onClick={() => setBulkModal(true)}
              className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg hover:bg-zinc-700"
            >
              📋 Bulk Import
            </button>
          </div>

          <div className="space-y-1 max-h-[300px] overflow-y-auto">
            {sortedDays.map(day => (
              <div
                key={day.dayNumber}
                className="flex items-center gap-3 py-2 px-3 bg-zinc-900/50 rounded-lg group"
              >
                <button
                  onClick={() => toggleDayStatus(day)}
                  className={`w-3 h-3 rounded-sm ${statusColors[day.status]} shrink-0 cursor-pointer hover:ring-2 hover:ring-white/20`}
                  title={`Status: ${day.status} (click to toggle)`}
                />
                <span className="text-xs text-zinc-500 font-mono w-12">Day {day.dayNumber}</span>
                <span className="text-sm text-zinc-300 flex-1 truncate">{day.title || '—'}</span>
                <span className="text-[11px] text-zinc-600">{day.checklist.length} items</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditDay(day)} className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white">
                    <Edit2 size={12} />
                  </button>
                  <button onClick={() => deleteDay(day.dayNumber)} className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-red-500">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day Modal */}
      {dayModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editingDay ? `Edit Day ${editingDay.dayNumber}` : 'Add Day'}</h2>
              <button onClick={() => setDayModal(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Day Number</label>
                  <input type="number" {...dayForm.register('dayNumber', { valueAsNumber: true })} className="input-admin" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Status</label>
                  <select {...dayForm.register('status')} className="input-admin">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="skipped">Skipped</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Title</label>
                <input {...dayForm.register('title')} className="input-admin" placeholder="What did you learn today?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Hours Logged</label>
                  <input type="number" step="0.5" {...dayForm.register('hoursLogged', { valueAsNumber: true })} className="input-admin" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Mood</label>
                  <select {...dayForm.register('mood')} className="input-admin">
                    <option value="">No mood</option>
                    <option value="great">🔥 Great</option>
                    <option value="good">😊 Good</option>
                    <option value="neutral">😐 Neutral</option>
                    <option value="tough">😤 Tough</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">
                  Checklist (one per line, prefix [x] for done, suffix (hrN) for hour)
                </label>
                <textarea
                  value={checklistText}
                  onChange={e => setChecklistText(e.target.value)}
                  rows={5}
                  className="input-admin resize-none font-mono text-xs"
                  placeholder={`ES6+ features review (hr1)\nPromises, async/await (hr2)\n[x] Array methods practice (hr3)`}
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1 uppercase tracking-wider">Notes</label>
                <textarea {...dayForm.register('notes')} rows={2} className="input-admin resize-none" placeholder="Reflections..." />
              </div>
            </div>
            <div className="p-6 bg-zinc-800/50 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={() => setDayModal(false)} className="px-6 py-2.5 rounded-xl text-zinc-400 font-bold hover:text-white">Cancel</button>
              <button
                onClick={dayForm.handleSubmit(submitDay)}
                disabled={submittingDay}
                className="bg-primary text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
              >
                {submittingDay ? <Loader className="animate-spin" size={18} /> : <Check size={18} />}
                Save Day
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {bulkModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Bulk Import Days</h2>
              <button onClick={() => setBulkModal(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <p className="text-xs text-zinc-500">
                Paste your learning plan. Format: lines starting with &quot;Day N:&quot; create days, lines starting with &quot;-&quot; become checklist items. Include &quot;Hour N:&quot; in checklist items to assign hours.
              </p>
              <textarea
                value={bulkText}
                onChange={e => setBulkText(e.target.value)}
                rows={15}
                className="input-admin resize-none font-mono text-xs"
                placeholder={`Day 1: Modern JavaScript Review
- Hour 1: ES6+ features (let/const, arrow functions)
- Hour 2: Promises, async/await, error handling
- Hour 3: Array methods (map, filter, reduce)
- Hour 4: Object manipulation, spread/rest operators
- Hour 5: Build: CLI calculator using async operations

Day 2: TypeScript Basics
- Hour 1: TypeScript setup, tsconfig.json, basic types
- Hour 2: Interfaces vs Types
...`}
              />
            </div>
            <div className="p-6 bg-zinc-800/50 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={() => setBulkModal(false)} className="px-6 py-2.5 rounded-xl text-zinc-400 font-bold hover:text-white">Cancel</button>
              <button
                onClick={handleBulkImport}
                disabled={bulkLoading || !bulkText.trim()}
                className="bg-primary text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
              >
                {bulkLoading ? <Loader className="animate-spin" size={18} /> : <Check size={18} />}
                Import Days
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Admin Page ---

export default function AdminTrackersPage() {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [milestonesText, setMilestonesText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<TrackerFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(trackerSchema) as any,
    defaultValues: { totalDays: 180, dailyHours: 5, status: 'active', tags: [], featured: false, color: '#34d399' },
  });

  const fetchTrackers = async () => {
    try {
      // Fetch full trackers (with days) for admin
      const res = await api.get('/trackers');
      const summaries = res.data.trackers;
      // Fetch each full tracker
      const fullTrackers = await Promise.all(
        summaries.map(async (t: { slug: string }) => {
          const r = await api.get(`/trackers/${t.slug}`);
          return r.data.tracker;
        })
      );
      setTrackers(fullTrackers);
    } catch (err) {
      console.error('Failed to fetch trackers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackers();
  }, []);

  const parseMilestones = (text: string): Milestone[] => {
    return text.split('\n').filter(l => l.trim()).map(line => {
      const dayMatch = line.match(/day\s*(\d+)/i);
      const dayNumber = dayMatch ? parseInt(dayMatch[1]) : 0;
      const completed = line.startsWith('[x]');
      const title = line.replace(/^\[x\]\s*/, '').replace(/\s*-?\s*day\s*\d+\s*/i, '').trim();
      return { title, dayNumber, completed };
    }).filter(m => m.title && m.dayNumber > 0);
  };

  const onSubmit = async (data: TrackerFormValues) => {
    setSubmitting(true);
    try {
      const milestones = parseMilestones(milestonesText);
      const payload = { ...data, milestones };

      if (editingSlug) {
        await api.put(`/trackers/${editingSlug}`, payload);
      } else {
        await api.post('/trackers', payload);
      }
      setIsModalOpen(false);
      fetchTrackers();
      reset();
      setEditingSlug(null);
      setMilestonesText('');
    } catch (err) {
      console.error('Failed to save tracker', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (tracker: Tracker) => {
    setEditingSlug(tracker.slug);
    reset({
      title: tracker.title,
      slug: tracker.slug,
      description: tracker.description,
      startDate: tracker.startDate.split('T')[0],
      endDate: tracker.endDate.split('T')[0],
      totalDays: tracker.totalDays,
      dailyHours: tracker.dailyHours,
      status: tracker.status as TrackerFormValues['status'],
      tags: tracker.tags,
      featured: tracker.featured,
      color: tracker.color,
    });
    setMilestonesText(
      tracker.milestones.map(m => `${m.completed ? '[x] ' : ''}${m.title} - Day ${m.dayNumber}`).join('\n')
    );
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this tracker and all its data?')) return;
    try {
      await api.delete(`/trackers/${slug}`);
      fetchTrackers();
    } catch (err) {
      console.error(err);
    }
  };

  const autoSlug = () => {
    const title = watch('title');
    if (title) {
      setValue('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Trackers</h1>
          <p className="text-zinc-500 mt-1">Manage your learning journey trackers.</p>
        </div>
        <button
          onClick={() => {
            setEditingSlug(null);
            reset({ totalDays: 180, dailyHours: 5, status: 'active', tags: [], featured: false, color: '#34d399' });
            setMilestonesText('');
            setIsModalOpen(true);
          }}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all"
        >
          <Plus size={18} />
          New Tracker
        </button>
      </div>

      <div className="space-y-6">
        {trackers.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <Target size={32} className="mx-auto mb-3 text-zinc-700" />
            <p>No trackers yet. Create your first one!</p>
          </div>
        ) : (
          trackers.map(tracker => (
            <div key={tracker._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl group hover:border-zinc-700 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-bold text-lg">{tracker.title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${tracker.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                      tracker.status === 'completed' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                      {tracker.status}
                    </span>
                    {tracker.featured && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Featured</span>}
                  </div>
                  <p className="text-zinc-500 text-sm">{tracker.description}</p>
                  <div className="flex gap-4 mt-3 text-xs text-zinc-500">
                    <span>{tracker.totalDays} days</span>
                    <span>{tracker.dailyHours}h/day</span>
                    <span>{tracker.days.length} logged</span>
                    <span>{tracker.days.filter(d => d.status === 'completed').length} completed</span>
                  </div>
                  {tracker.tags.length > 0 && (
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {tracker.tags.slice(0, 8).map(tag => (
                        <span key={tag} className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{tag}</span>
                      ))}
                      {tracker.tags.length > 8 && <span className="text-[10px] text-zinc-600">+{tracker.tags.length - 8}</span>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => handleEdit(tracker)} className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(tracker.slug)} className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>

              {/* Day Manager */}
              <DayManager tracker={tracker} onRefresh={fetchTrackers} />
            </div>
          ))
        )}
      </div>

      {/* Tracker Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{editingSlug ? 'Edit Tracker' : 'Create Tracker'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Title</label>
                <input {...register('title')} onBlur={autoSlug} className="input-admin" placeholder="6-Month Full-Stack Mastery" />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Slug (URL)</label>
                <input {...register('slug')} className="input-admin" placeholder="6-month-fullstack" />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Description</label>
                <textarea {...register('description')} rows={3} className="input-admin resize-none" placeholder="Short summary of this learning journey..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Start Date</label>
                  <input type="date" {...register('startDate')} className="input-admin" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">End Date</label>
                  <input type="date" {...register('endDate')} className="input-admin" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Total Days</label>
                  <input type="number" {...register('totalDays', { valueAsNumber: true })} className="input-admin" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Daily Hours</label>
                  <input type="number" {...register('dailyHours', { valueAsNumber: true })} className="input-admin" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Status</label>
                  <select {...register('status')} className="input-admin">
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Tags (comma separated)</label>
                  <input
                    className="input-admin"
                    placeholder="TypeScript, NestJS, React"
                    defaultValue={watch('tags')?.join(', ')}
                    onChange={(e) => setValue('tags', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">Accent Color</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" {...register('color')} className="w-10 h-10 rounded-lg border-none cursor-pointer bg-transparent" />
                    <input {...register('color')} className="input-admin flex-1" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" {...register('featured')} id="tracker-featured" className="w-5 h-5 rounded-lg border-zinc-800 bg-zinc-950 text-emerald-500" />
                <label htmlFor="tracker-featured" className="text-sm text-zinc-400">Mark as Featured</label>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider">
                  Milestones (one per line: &quot;Title - Day N&quot;)
                </label>
                <textarea
                  value={milestonesText}
                  onChange={e => setMilestonesText(e.target.value)}
                  rows={5}
                  className="input-admin resize-none font-mono text-xs"
                  placeholder={`TypeScript + Node.js Mastered - Day 30\nProject 1 Backend Complete - Day 60\nReact Mastery Complete - Day 90`}
                />
              </div>
            </div>

            <div className="p-6 bg-zinc-800/50 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl text-zinc-400 font-bold hover:text-white transition-all">Cancel</button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={submitting}
                className="bg-primary text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {submitting ? <Loader className="animate-spin" size={18} /> : <Check size={18} />}
                Save Tracker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
