'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Flame, Clock, CalendarDays, CheckCircle2,
  TrendingUp, BarChart3, ChevronDown, ChevronRight,
  Zap, Award, Trophy, Star, Hash
} from 'lucide-react';

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
  mood: 'great' | 'good' | 'neutral' | 'tough' | '';
  checklist: ChecklistItem[];
}

interface Milestone {
  title: string;
  dayNumber: number;
  completed: boolean;
}

interface TrackerSummary {
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
}

interface TrackerFull extends TrackerSummary {
  days: TrackerDay[];
}

interface TrackerStats {
  totalDays: number;
  daysCompleted: number;
  daysSkipped: number;
  daysInProgress: number;
  daysPending: number;
  daysRemaining: number;
  completionPercent: number;
  totalHoursLogged: number;
  targetHours: number;
  currentStreak: number;
  longestStreak: number;
  totalChecklistItems: number;
  completedChecklistItems: number;
  moodCounts: Record<string, number>;
  weeklyStats: { week: number; completed: number; total: number; hours: number }[];
  monthlyStats: { month: number; completed: number; total: number; hours: number }[];
}

// --- Sub Components ---

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Active' },
    completed: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Completed' },
    paused: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Paused' },
  };
  const c = config[status] || config.active;
  return (
    <span className={`${c.bg} ${c.text} text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`}>
      {c.label}
    </span>
  );
}

function DayStatusDot({ status, size = 'sm' }: { status: string; size?: 'sm' | 'md' }) {
  const colors: Record<string, string> = {
    completed: 'bg-emerald-500',
    'in-progress': 'bg-amber-500',
    skipped: 'bg-zinc-600',
    pending: 'bg-zinc-800',
  };
  const sizeMap = { sm: 'w-3 h-3', md: 'w-4 h-4' };
  return <div className={`${colors[status] || colors.pending} ${sizeMap[size]} rounded-sm`} />;
}

function MoodEmoji({ mood }: { mood: string }) {
  const emojis: Record<string, string> = {
    great: '🔥',
    good: '😊',
    neutral: '😐',
    tough: '😤',
  };
  return <span className="text-sm">{emojis[mood] || ''}</span>;
}

function ProgressRing({ percent, size = 80, strokeWidth = 6, color = 'hsl(var(--primary))' }: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="hsl(217 33% 15%)" strokeWidth={strokeWidth} fill="none"
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

// --- Calendar Heatmap ---

function CalendarHeatmap({ days, totalDays }: { days: TrackerDay[]; totalDays: number }) {
  const dayMap = useMemo(() => {
    const map = new Map<number, TrackerDay>();
    days.forEach(d => map.set(d.dayNumber, d));
    return map;
  }, [days]);

  const weeks = Math.ceil(totalDays / 7);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-1 min-w-fit">
        {Array.from({ length: weeks }, (_, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1">
            {Array.from({ length: 7 }, (_, dayIdx) => {
              const dayNum = weekIdx * 7 + dayIdx + 1;
              if (dayNum > totalDays) return <div key={dayIdx} className="w-3.5 h-3.5" />;

              const day = dayMap.get(dayNum);
              const status = day?.status || 'pending';
              const colors: Record<string, string> = {
                completed: 'bg-emerald-500 hover:bg-emerald-400',
                'in-progress': 'bg-amber-500 hover:bg-amber-400',
                skipped: 'bg-zinc-700 hover:bg-zinc-600',
                pending: 'bg-zinc-800/50 hover:bg-zinc-700',
              };

              return (
                <div
                  key={dayIdx}
                  className={`w-3.5 h-3.5 rounded-[3px] ${colors[status]} transition-colors cursor-default`}
                  title={`Day ${dayNum}${day?.title ? `: ${day.title}` : ''} — ${status}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-[11px] text-zinc-500">
        <div className="flex items-center gap-1.5"><DayStatusDot status="pending" /> Pending</div>
        <div className="flex items-center gap-1.5"><DayStatusDot status="in-progress" /> In Progress</div>
        <div className="flex items-center gap-1.5"><DayStatusDot status="completed" /> Completed</div>
        <div className="flex items-center gap-1.5"><DayStatusDot status="skipped" /> Skipped</div>
      </div>
    </div>
  );
}

// --- Stats Cards ---

function StatsBar({ stats }: { stats: TrackerStats }) {
  const cards = [
    { label: 'Completed', value: `${stats.daysCompleted}/${stats.totalDays}`, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Hours Logged', value: `${stats.totalHoursLogged}h`, icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Current Streak', value: `${stats.currentStreak}d`, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Progress', value: `${stats.completionPercent}%`, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4"
        >
          <div className={`${card.bg} ${card.color} w-9 h-9 rounded-xl flex items-center justify-center mb-3`}>
            <card.icon size={18} />
          </div>
          <p className="text-zinc-500 text-xs font-medium">{card.label}</p>
          <p className="text-white text-xl font-bold mt-0.5">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
}

// --- Milestones Timeline ---

function MilestoneTimeline({ milestones, daysCompleted }: { milestones: Milestone[]; daysCompleted: number }) {
  if (!milestones.length) return null;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-white font-bold flex items-center gap-2 mb-5">
        <Trophy size={18} className="text-amber-400" />
        Milestones
      </h3>
      <div className="space-y-3">
        {milestones.map((m, i) => {
          const reached = m.completed || daysCompleted >= m.dayNumber;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${reached ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                {reached ? <Star size={14} /> : <Hash size={12} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${reached ? 'text-white' : 'text-zinc-500'}`}>{m.title}</p>
                <p className="text-[11px] text-zinc-600">Day {m.dayNumber}</p>
              </div>
              {reached && <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">✓ Done</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Weekly Progress Bars ---

// --- Weekly Progress Bars (Progress Roadmap) ---

function WeeklyProgress({ weeklyStats, monthlyStats }: { weeklyStats: TrackerStats['weeklyStats']; monthlyStats: TrackerStats['monthlyStats'] }) {
  const [view, setView] = useState<'weekly' | 'monthly'>('monthly');
  const data = view === 'weekly' ? weeklyStats : monthlyStats;
  const label = view === 'weekly' ? 'Week' : 'Month';
  const maxTotal = Math.max(...data.map(d => Math.max(d.completed, 1)));

  // Custom colors for different months to make it feel like a "journey"
  const monthGradients: Record<number, string> = {
    1: 'from-blue-600 via-blue-500 to-blue-400',       // Foundation
    2: 'from-indigo-600 via-indigo-500 to-indigo-400', // Architecture
    3: 'from-purple-600 via-purple-500 to-purple-400', // Frontend
    4: 'from-pink-600 via-pink-500 to-pink-400',       // Mobile/DevOps
    5: 'from-orange-600 via-orange-500 to-orange-400', // Scaling
    6: 'from-emerald-600 via-emerald-500 to-emerald-400', // Final/Specialization
  };

  const currentMonthIdx = monthlyStats.findIndex(m => m.completed < 30 && m.completed > 0);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group/roadmap">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover/roadmap:bg-primary/10 transition-colors" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="space-y-1">
          <h3 className="text-white font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <BarChart3 size={18} className="text-blue-400" />
            </div>
            Progress Roadmap
          </h3>
          <p className="text-[10px] text-zinc-500 ml-10">Your learning milestones over time</p>
        </div>

      </div>
      <div className="flex justify-start mb-8">
        <div className="flex gap-1 bg-zinc-800/80 rounded-xl p-1 backdrop-blur-sm border border-zinc-700/30">
          <button
            onClick={() => setView('weekly')}
            className={`text-[11px] px-3 py-1.5 rounded-lg font-bold transition-all ${view === 'weekly' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView('monthly')}
            className={`text-[11px] px-3 py-1.5 rounded-lg font-bold transition-all ${view === 'monthly' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="space-y-6 relative ml-2">
        {/* Vertical Journey Line */}
        <div className="absolute left-[5px] top-2 bottom-6 w-[2px] bg-zinc-800/50" />

        {data.map((item, idx) => {
          const pct = maxTotal > 0 ? (item.completed / maxTotal) * 100 : 0;
          const monthNum = (item as TrackerStats['monthlyStats'][0]).month;
          const isCurrent = view === 'monthly' && idx === currentMonthIdx;

          let itemLabel = '';
          if (view === 'weekly') {
            itemLabel = `${label} ${(item as TrackerStats['weeklyStats'][0]).week}`;
          } else {
            const m = monthNum;
            itemLabel = m === 1 ? 'Month 1: Foundation' :
              m === 2 ? 'Month 2: Architecture' :
                m === 3 ? 'Month 3: Frontend' :
                  m === 4 ? 'Month 4: Mobile & DevOps' :
                    m === 5 ? 'Month 5: Scaling' :
                      m === 6 ? 'Month 6: Interview Prep' :
                        `Month ${m}`;
          }

          const gradient = view === 'monthly' ? (monthGradients[monthNum] || monthGradients[6]) : 'from-emerald-600 via-emerald-500 to-emerald-400';

          return (
            <div key={idx} className="group relative pl-6">
              {/* Node on the line */}
              <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-zinc-900 z-10 transition-all duration-500 ${pct > 0 ? 'bg-emerald-500' : 'bg-zinc-800'} ${isCurrent ? 'ring-4 ring-emerald-500/20 scale-125' : ''}`} />

              <div className="flex items-center justify-between text-[11px] mb-2 px-0.5">
                <div className="flex items-center gap-2">
                  <span className={`font-bold transition-colors ${pct > 0 || isCurrent ? 'text-zinc-200' : 'text-zinc-500'} group-hover:text-white`}>
                    {itemLabel}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tighter animate-pulse">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-zinc-500 font-mono tabular-nums">
                  <span>{item.completed}d</span>
                  <span className="text-zinc-700">/</span>
                  <span>{item.hours}h</span>
                </div>
              </div>

              <div className="h-2 bg-black/20 rounded-full overflow-hidden border border-zinc-800/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(pct, 0)}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                  className={`h-full bg-gradient-to-r ${gradient} rounded-full relative`}
                >
                  {/* Subtle shine effect on completed bars */}
                  {pct > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full transform -skew-x-12 translate-x-full group-hover:animate-shimmer" />
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Mood Distribution ---

function MoodChart({ moodCounts }: { moodCounts: Record<string, number> }) {
  const total = Object.values(moodCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const moods = [
    { key: 'great', emoji: '🔥', label: 'Great', color: 'bg-emerald-500' },
    { key: 'good', emoji: '😊', label: 'Good', color: 'bg-blue-500' },
    { key: 'neutral', emoji: '😐', label: 'Neutral', color: 'bg-zinc-500' },
    { key: 'tough', emoji: '😤', label: 'Tough', color: 'bg-red-500' },
  ];

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-white font-bold mb-5">Mood Tracker</h3>
      <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-4">
        {moods.map(m => {
          const pct = (moodCounts[m.key] || 0) / total * 100;
          return pct > 0 ? <div key={m.key} className={`${m.color}`} style={{ width: `${pct}%` }} /> : null;
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {moods.map(m => (
          <div key={m.key} className="flex items-center gap-2 text-xs">
            <span>{m.emoji}</span>
            <span className="text-zinc-400">{m.label}</span>
            <span className="text-white font-bold ml-auto">{moodCounts[m.key] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Achievement Badges ---

function Achievements({ stats }: { stats: TrackerStats }) {
  const badges = [
    { label: 'First Day', icon: '🌱', earned: stats.daysCompleted >= 1 },
    { label: '7-Day Streak', icon: '🔥', earned: stats.longestStreak >= 7 },
    { label: '30 Days Done', icon: '💪', earned: stats.daysCompleted >= 30 },
    { label: 'Halfway', icon: '⚡', earned: stats.daysCompleted >= Math.floor(stats.totalDays / 2) },
    { label: '100 Days', icon: '🏆', earned: stats.daysCompleted >= 100 },
    { label: 'Complete', icon: '👑', earned: stats.completionPercent >= 100 },
  ];

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-white font-bold flex items-center gap-2 mb-5">
        <Award size={18} className="text-amber-400" />
        Achievements
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {badges.map(b => (
          <div
            key={b.label}
            className={`text-center py-3 rounded-xl transition-all ${b.earned
              ? 'bg-zinc-800/50 border border-zinc-700'
              : 'bg-zinc-900/30 border border-zinc-800/50 opacity-40'
              }`}
          >
            <div className="text-2xl mb-1">{b.icon}</div>
            <p className="text-[10px] text-zinc-400 font-medium">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


// --- Daily Checklist Timeline ---

function DailyTimeline({ days }: { days: TrackerDay[] }) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Find the latest in-progress or last completed day
  const currentDay = useMemo(() => {
    const inProgress = days.find(d => d.status === 'in-progress');
    if (inProgress) return inProgress.dayNumber;
    const completed = days.filter(d => d.status === 'completed');
    if (completed.length) return completed[completed.length - 1].dayNumber + 1;
    return 1;
  }, [days]);

  // Sort by dayNumber ascending so Day 1 is first
  const sortedDays = useMemo(() => [...days].sort((a, b) => a.dayNumber - b.dayNumber), [days]);
  const visibleDays = showAll ? sortedDays : sortedDays.slice(0, 14);

  if (!days.length) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
        <CalendarDays size={32} className="text-zinc-700 mx-auto mb-3" />
        <p className="text-zinc-500 text-sm">No daily logs recorded yet.</p>
        <p className="text-zinc-600 text-xs mt-1">Days will appear here as progress is tracked.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="text-white font-bold flex items-center gap-2">
          <CalendarDays size={18} className="text-primary" />
          Daily Progress
        </h3>
      </div>
      <div className="divide-y divide-zinc-800/50">
        {visibleDays.map(day => {
          const isExpanded = expandedDay === day.dayNumber;
          const isCurrent = day.dayNumber === currentDay;
          const completedItems = day.checklist.filter(c => c.completed).length;
          const totalItems = day.checklist.length;

          return (
            <motion.div
              key={day.dayNumber}
              initial={false}
              className={`${isCurrent ? 'bg-primary/5' : 'hover:bg-zinc-800/20'} transition-all`}
            >
              <button
                onClick={() => setExpandedDay(isExpanded ? null : day.dayNumber)}
                className="w-full text-left p-4 flex items-center gap-3"
              >
                <DayStatusDot status={day.status} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 font-mono">Day {day.dayNumber}</span>
                    {isCurrent && (
                      <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold uppercase">Current</span>
                    )}
                    {day.mood && <MoodEmoji mood={day.mood} />}
                  </div>
                  <p className="text-sm text-zinc-300 font-medium truncate mt-0.5">{day.title || '—'}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {totalItems > 0 && (
                    <span className="text-[11px] text-zinc-500">{completedItems}/{totalItems}</span>
                  )}
                  {day.hoursLogged > 0 && (
                    <span className="text-[11px] text-zinc-600">{day.hoursLogged}h</span>
                  )}
                  {isExpanded ? <ChevronDown size={14} className="text-zinc-600" /> : <ChevronRight size={14} className="text-zinc-600" />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pl-11 space-y-3">
                      {day.checklist.length > 0 && (
                        <div className="space-y-1.5">
                          {day.checklist.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <div className={`w-4 h-4 rounded shrink-0 mt-0.5 flex items-center justify-center ${item.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-600'}`}>
                                {item.completed && <CheckCircle2 size={12} />}
                              </div>
                              <span className={item.completed ? 'text-zinc-400 line-through' : 'text-zinc-300'}>{item.text}</span>
                              <span className="text-[10px] text-zinc-600 ml-auto shrink-0">Hr {item.hour}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {day.notes && (
                        <p className="text-xs text-zinc-500 italic border-l-2 border-zinc-700 pl-3">{day.notes}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      {sortedDays.length > 14 && (
        <div className="p-4 border-t border-zinc-800 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-primary hover:underline font-medium"
          >
            {showAll ? 'Show Less' : `Show All ${sortedDays.length} Days`}
          </button>
        </div>
      )}
    </div>
  );
}


// --- Main Dashboard ---

export function TrackerDashboard({ trackers }: { trackers: TrackerSummary[] }) {
  const [activeSlug, setActiveSlug] = useState<string>(trackers.find(t => t.featured)?.slug || trackers[0]?.slug || '');
  const [tracker, setTracker] = useState<TrackerFull | null>(null);
  const [stats, setStats] = useState<TrackerStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTrackerData = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      const [trackerRes, statsRes] = await Promise.all([
        fetch(`/api/trackers/${slug}`),
        fetch(`/api/trackers/${slug}/stats`),
      ]);
      const trackerData = await trackerRes.json();
      const statsData = await statsRes.json();
      setTracker(trackerData.tracker);
      setStats(statsData.stats);
    } catch (err) {
      console.error('Failed to load tracker', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeSlug) fetchTrackerData(activeSlug);
  }, [activeSlug, fetchTrackerData]);

  if (!trackers.length) {
    return (
      <div className="text-center py-20">
        <Target size={48} className="text-zinc-700 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">No Trackers Yet</h2>
        <p className="text-zinc-500 text-sm">Learning journey trackers will appear here once created.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-1">Learning Tracker</h1>
        <p className="text-zinc-400 text-sm">Follow my journey to mastering new technologies — day by day.</p>
      </motion.div>

      {/* Tracker Selector Pills */}
      {trackers.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {trackers.map(t => (
            <button
              key={t.slug}
              onClick={() => setActiveSlug(t.slug)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeSlug === t.slug
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'
                }`}
            >
              {t.title}
              <StatusBadge status={t.status} />
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tracker && stats ? (
        <motion.div
          key={activeSlug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Tracker Info */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-white">{tracker.title}</h2>
                  <StatusBadge status={tracker.status} />
                </div>
                <p className="text-zinc-400 text-sm mb-4">{tracker.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tracker.tags.map(tag => (
                    <span key={tag} className="tag-highlight text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <ProgressRing percent={stats.completionPercent} size={90} strokeWidth={7} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-bold text-white">{stats.completionPercent}%</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Compact meta */}
            <div className="flex gap-6 mt-5 pt-5 border-t border-zinc-800 text-xs text-zinc-500">
              <span>{tracker.totalDays} days total</span>
              <span>{tracker.dailyHours}h/day target</span>
              <span className="flex items-center gap-1"><Zap size={12} className="text-amber-400" /> Best: {stats.longestStreak}d streak</span>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsBar stats={stats} />

          {/* Calendar Heatmap */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <CalendarDays size={18} className="text-emerald-400" />
              Contribution Calendar
            </h3>
            <CalendarHeatmap days={tracker.days} totalDays={tracker.totalDays} />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Daily Timeline */}
            <div className="lg:col-span-2">
              <DailyTimeline days={tracker.days} />
            </div>

            {/* Right - Sidebar */}
            <div className="space-y-6">
              <WeeklyProgress weeklyStats={stats.weeklyStats} monthlyStats={stats.monthlyStats} />
              <MoodChart moodCounts={stats.moodCounts} />
              <MilestoneTimeline milestones={tracker.milestones} daysCompleted={stats.daysCompleted} />
              <Achievements stats={stats} />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-20 text-zinc-500">Failed to load tracker data.</div>
      )}
    </div>
  );
}
