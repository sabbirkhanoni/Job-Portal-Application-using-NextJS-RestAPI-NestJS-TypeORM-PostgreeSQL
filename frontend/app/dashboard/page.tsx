'use client';
import StatsCards from '@/components/StatsCards';
import UserBreakdown from '@/components/UserBreakdown';
import QuickStats from '@/components/QuickStats';
import { ButtonSectionDB } from '@/components/ButtonsDB';
import LogOutButton from '@/components/LogOutButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Analytics = {
  totalUsers: number;
  totalEmployees: number;
  totalJobseekers: number;
  totalJobs: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingApprovals: number;
  totalApplications: number;
};

// Mock data for initial render
const mockAnalytics: Analytics = {
  totalUsers: 0,
  totalEmployees: 0,
  totalJobseekers: 0,
  totalJobs: 0,
  activeUsers: 0,
  inactiveUsers: 0,
  pendingApprovals: 0,
  totalApplications: 0,
};

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics>(mockAnalytics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.warn('No token found, using mock data');
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/analytics`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        setAnalytics(res.data?.data?.data || mockAnalytics);
      } catch (error) {
        console.error('Analytics fetch failed:', error);
        setAnalytics(mockAnalytics);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-between p-6">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-300">
            Welcome back! Here's your analytics overview.
          </p>
        </div>

        <LogOutButton />
      </div>

      <div className="container mx-auto px-6 py-5">
        <div className="shadow-xl lg:h-15 h-30">
          <ButtonSectionDB />
        </div>

        <div className="mt-5">
          <StatsCards analytics={analytics} />
        </div>

        <div className="grid gap-6 mt-8">
          <QuickStats analytics={analytics} />
          <UserBreakdown analytics={analytics} />
        </div>
      </div>
    </div>
  );
}
