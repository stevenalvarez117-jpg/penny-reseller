'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResellDashboard from '@/components/ResellDashboard';
import ShopperDashboard from '@/components/ShopperDashboard';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    if (!token) {
      router.push('/login');
      return;
    }

    setUser({ type: userType });
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return user?.type === 'reseller' ? <ResellDashboard /> : <ShopperDashboard />;
}
