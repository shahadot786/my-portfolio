'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderOpen,
  Code2,
  Star,
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
  { icon: Star, label: 'Expertise', href: '/admin/expertise' },
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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0e1511]/95 border-r border-[#3c4a42] backdrop-blur-md flex flex-col z-50">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 border border-[#4edea3]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Settings className="text-[#4edea3]" size={18} />
          </div>
          <div>
            <span className="font-extrabold text-[#dde4dd] text-base tracking-tight block">Console</span>
            <span className="text-[10px] text-[#4edea3] font-mono font-semibold tracking-wider uppercase block">Control Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname === `${item.href}/`;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                isActive
                  ? "bg-[#10b981]/15 text-[#4edea3] border border-[#4edea3]/30 shadow-[0_0_12px_rgba(78,222,163,0.15)]"
                  : "text-[#bbcabf] hover:text-[#dde4dd] hover:bg-[#1a211d]"
              )}
            >
              <item.icon size={17} className={cn(isActive ? "text-[#4edea3]" : "text-[#94A3B8] group-hover:text-[#dde4dd]")} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#3c4a42]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all w-full"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
