'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api-client';
import {
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowUpRight,
  MousePointerClick,
  Globe,
  Monitor
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface DashboardStats {
  totals?: {
    totalViews: number;
    totalUnique: number;
    totalClicks: number;
  };
  articleCount?: number;
  topClicks?: { url: string; count: number }[];
  topBrowsers?: { name: string; count: number }[];
  topOS?: { name: string; count: number }[];
  topLocations?: { name: string; count: number }[];
  topReferrers?: { name: string; count: number }[];
  topLanguages?: { name: string; count: number }[];
  topScreens?: { name: string; count: number }[];
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, messagesRes] = await Promise.all([
          api.get('/analytics/stats'),
          api.get('/messages'),
        ]);
        setStats(statsRes.data);
        setMessages(messagesRes.data.messages.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      label: 'Total Views',
      value: stats?.totals?.totalViews || 0,
      icon: Eye,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      trend: '+12%',
      trendUp: true
    },
    {
      label: 'Unique Visitors',
      value: stats?.totals?.totalUnique || 0,
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      trend: '+5%',
      trendUp: true
    },
    {
      label: 'New Messages',
      value: messages.filter(m => m.status === 'unread').length,
      icon: MessageSquare,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      trend: '2 new',
      trendUp: true
    },
    {
      label: 'Link Clicks',
      value: stats?.totals?.totalClicks || 0,
      icon: MousePointerClick,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      trend: 'interactions',
      trendUp: true
    },
  ];

  if (loading) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Welcome back. Here&apos;s what&apos;s happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl group hover:border-zinc-700 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`${card.bg} ${card.color} p-3 rounded-2xl`}>
                <card.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${card.trendUp ? 'text-emerald-500' : 'text-zinc-500'}`}>
                {card.trend}
                {card.trendUp ? <ArrowUpRight size={14} /> : <Clock size={14} />}
              </div>
            </div>
            <div>
              <p className="text-zinc-500 text-sm font-medium">{card.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Messages */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Recent Messages</h2>
              <Link href="/admin/messages" className="text-xs text-primary hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-zinc-800">
              {messages.length > 0 ? messages.map((msg) => (
                <div key={msg._id} className="p-6 hover:bg-zinc-800/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">
                        {msg.name[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{msg.name}</h4>
                        <p className="text-xs text-zinc-500">{msg.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{formatDate(msg.createdAt)}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-2 line-clamp-1">{msg.subject}</p>
                </div>
              )) : (
                <div className="p-12 text-center text-zinc-500 text-sm">No messages yet.</div>
              )}
            </div>
          </div>

          {/* Top Links */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden h-fit">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">Top Performing Links</h2>
            </div>
            <div className="divide-y divide-zinc-800">
              {stats?.topClicks && stats.topClicks.length > 0 ? stats.topClicks.map((click, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                      <MousePointerClick size={16} />
                    </div>
                    <a href={click.url} target="_blank" className="text-sm text-zinc-300 truncate hover:text-white transition-colors max-w-[300px]">{click.url}</a>
                  </div>
                  <span className="font-bold text-white">{click.count} clicks</span>
                </div>
              )) : (
                <div className="p-8 text-center text-zinc-500 text-sm">No interaction data recorded yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/admin/articles/new" className="bg-white text-black text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-between hover:bg-white/90 active:scale-95 transition-all">
                Write Article
                <TrendingUp size={16} />
              </Link>
              <Link href="/admin/projects" className="bg-zinc-800 text-white text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-between hover:bg-zinc-700 active:scale-95 transition-all">
                Add Project
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Top Locations */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
              <Globe size={18} className="text-emerald-500" />
              <h2 className="text-lg font-bold text-white">Top Locations</h2>
            </div>
            <div className="divide-y divide-zinc-800">
              {stats?.topLocations && stats.topLocations.length > 0 ? stats.topLocations.map((loc, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                  <span className="text-sm text-zinc-300 font-medium">{loc.name}</span>
                  <span className="font-bold text-white">{loc.count}</span>
                </div>
              )) : (
                <div className="p-8 text-center text-zinc-500 text-sm">Waiting for visitor data...</div>
              )}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-400" />
              <h2 className="text-lg font-bold text-white">Traffic Sources</h2>
            </div>
            <div className="divide-y divide-zinc-800">
              {stats?.topReferrers && stats.topReferrers.length > 0 ? stats.topReferrers.map((ref, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                  <span className="text-sm text-zinc-300 font-medium">{ref.name}</span>
                  <span className="font-bold text-white">{ref.count}</span>
                </div>
              )) : (
                <div className="p-8 text-center text-zinc-500 text-sm">No referrer data recorded.</div>
              )}
            </div>
          </div>

          {/* Devices & Browsers */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
              <Monitor size={18} className="text-blue-500" />
              <h2 className="text-lg font-bold text-white">Visitor Tech</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Browsers</h3>
                <div className="space-y-2">
                  {stats?.topBrowsers?.map((b, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300">{b.name}</span>
                      <span className="text-sm font-bold text-white">{b.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">OS</h3>
                <div className="space-y-2">
                  {stats?.topOS?.map((o, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300">{o.name}</span>
                      <span className="text-sm font-bold text-white">{o.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visitor Demographics */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
              <Users size={18} className="text-zinc-400" />
              <h2 className="text-lg font-bold text-white">Demographics</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Languages */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Top Languages</h3>
                <div className="space-y-2">
                  {stats?.topLanguages?.map((l, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300">{l.name}</span>
                      <span className="text-sm font-bold text-white">{l.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolutions */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Screen Resolutions</h3>
                <div className="space-y-2">
                  {stats?.topScreens?.map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300">{s.name}</span>
                      <span className="text-sm font-bold text-white">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-white mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Database</span>
                <span className="text-emerald-500 font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">API Speed</span>
                <span className="text-zinc-300 font-medium">Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
