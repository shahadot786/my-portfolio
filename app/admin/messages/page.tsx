'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api-client';
import {
  MessageSquare,
  Trash2,
  CheckCircle,
  Mail,
  ChevronRight,
  Search
} from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get('/messages');
        setMessages(res.data.messages);
        if (res.data.messages.length > 0 && !selectedMsg) {
          setSelectedMsg(res.data.messages[0]);
        }
      } catch (err) {
        console.error('Failed to fetch messages', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [selectedMsg]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/messages/${id}`, { status });
      setMessages(messages.map(m => m._id === id ? { ...m, status } : m));
      if (selectedMsg?._id === id) {
        setSelectedMsg({ ...selectedMsg, status });
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/messages/${id}`);
      setMessages(messages.filter(m => m._id !== id));
      if (selectedMsg?._id === id) {
        setSelectedMsg(null);
      }
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  if (loading) return null;

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* List */}
      <div className="w-1/3 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <span className="bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            {messages.length} Total
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
          <input className="input-admin pl-10 h-10" placeholder="Search messages..." />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {messages.map((msg) => (
            <button
              key={msg._id}
              onClick={() => setSelectedMsg(msg)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2",
                selectedMsg?._id === msg._id
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-zinc-950 border-zinc-900 hover:border-zinc-800"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter",
                  msg.status === 'unread' ? "bg-amber-500/20 text-amber-500" : "bg-zinc-800 text-zinc-500"
                )}>
                  {msg.status}
                </span>
                <span className="text-[10px] text-zinc-600">{formatDate(msg.createdAt)}</span>
              </div>
              <h4 className="text-white font-bold text-sm truncate">{msg.name}</h4>
              <p className="text-zinc-500 text-xs truncate">{msg.subject}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col">
        {selectedMsg ? (
          <>
            <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-bold text-lg">
                  {selectedMsg.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedMsg.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <a href={`mailto:${selectedMsg.email}`} className="text-zinc-500 hover:text-primary flex items-center gap-1.5 text-sm transition-colors">
                      <Mail size={14} />
                      {selectedMsg.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedMsg.status === 'unread' && (
                  <button
                    onClick={() => updateStatus(selectedMsg._id, 'read')}
                    className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-emerald-500 transition-all tooltip"
                    title="Mark as Read"
                  >
                    <CheckCircle size={20} />
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(selectedMsg._id)}
                  className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500 transition-all"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div>
                <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest block mb-1">Subject</span>
                <h3 className="text-white font-bold text-lg">{selectedMsg.subject}</h3>
              </div>

              <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
                <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest block mb-4">Message</span>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {selectedMsg.message}
                </p>
              </div>
            </div>

            <div className="p-8 bg-zinc-800/20 border-t border-zinc-800">
              <a
                href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}`}
                className="inline-flex items-center gap-2 bg-white text-black font-bold py-3 px-8 rounded-2xl hover:bg-white/90 transition-all"
              >
                Reply via Email
                <ChevronRight size={18} />
              </a>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 gap-4">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-800 flex items-center justify-center">
              <MessageSquare size={32} />
            </div>
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
}
