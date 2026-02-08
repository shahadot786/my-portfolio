'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import api from '@/lib/api-client';
import { Loader } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Don't check for login page (handle trailing slash)
      if (pathname === '/admin/login' || pathname === '/admin/login/') {
        setLoading(false);
        setAuthorized(true);
        return;
      }

      try {
        await api.get('/auth/me');
        setAuthorized(true);
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // If we're on login page, just render children without sidebar (handle trailing slash)
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return <>{children}</>;
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <AdminSidebar />
      <main className="ml-64 p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
