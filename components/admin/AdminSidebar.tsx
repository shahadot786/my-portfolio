'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderOpen,
  Code2,
  MessageSquare,
  LogOut,
  Settings,
  Quote,
  Award,
  LayoutTemplate,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/api-client';
import { useRouter } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: User, label: 'Profile', href: '/admin/profile' },
  { icon: Briefcase, label: 'Work', href: '/admin/work' },
  { icon: FolderOpen, label: 'Projects', href: '/admin/projects' },
  { icon: Code2, label: 'Skills', href: '/admin/skills' },
  { icon: Award, label: 'Credentials', href: '/admin/credentials' },
  { icon: LayoutTemplate, label: 'Pages', href: '/admin/pages' },
  { icon: Target, label: 'Trackers', href: '/admin/trackers' },
  { icon: Quote, label: 'Testimonials', href: '/admin/testimonials' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col z-50">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Settings className="text-black" size={18} />
          </div>
          <span className="font-bold text-white tracking-tight">Admin Console</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname === `${item.href}/`;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
              )}
            >
              <item.icon size={18} className={cn(isActive ? "text-primary" : "text-zinc-500 group-hover:text-zinc-400")} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1 h-4 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-900">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
