'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api-client';
import {
  Users,
  Eye,
  MessageSquare,
  Newspaper,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface DashboardStats {
  totals?: {
    totalViews: number;
    totalUnique: number;
  };
  articleCount?: number;
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
      label: 'Total Articles',
      value: stats?.articleCount || 0,
      icon: Newspaper,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      trend: '0 this week',
      trendUp: false
    },
  ];

  if (loading) return null; // Handled by layout

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
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden">
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

        {/* Quick Actions */}
        <div className="space-y-6">
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

          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-white mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Database</span>
                <span className="text-emerald-500 font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">API Speed</span>
                <span className="text-zinc-300 font-medium">24ms</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Storage</span>
                <span className="text-zinc-300 font-medium">12% used</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
