'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AxiosToastError from '@/utils/AxiosToastError';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  status: 'approved' | 'banned';
  longitude: string | null;
  latitude: string | null;
  postedBy: {
    id: number;
    companyName: string;
    companyLogo: string | null;
  };
  applications: any[];
  createdAt: string;
}

export default function AllJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);


  async function fetchJobs() {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/jobs',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const rawJobs = response?.data?.data || [];

    const formattedJobs: Job[] = rawJobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      status: job.status,
      longitude: job.longitude,
      latitude: job.latitude,
      postedBy: {
        id: job.postedBy?.id,
        companyName: job.postedBy?.companyName,
        companyLogo: job.postedBy?.companyLogo
      },
      applications: job.applications || [],
      createdAt: job.createdAt,
    }));

    setJobs(formattedJobs);
  } catch (error) {
    AxiosToastError(error);
  }
  }


  useEffect(() => {
    fetchJobs();
  }, []);

  // Statistics
  const stats = {
    total: jobs.length,
    approved: jobs.filter(j => j.status === 'approved').length,
    banned: jobs.filter(j => j.status === 'banned').length,
    totalApplications: jobs.reduce((sum, job) => sum + job.applications.length, 0)
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
  };


  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">All Jobs</h1>
              <p className="text-slate-300">
                Manage and moderate all job postings on the platform
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
              onClick={() => router.push('/dashboard')}
               className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium mb-2">Total Jobs</p>
                  <h3 className="text-4xl font-bold text-slate-900">{stats.total}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium mb-2">Approved</p>
                  <h3 className="text-4xl font-bold text-green-600">{stats.approved}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium mb-2">Banned</p>
                  <h3 className="text-4xl font-bold text-red-600">{stats.banned}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="card bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="card-body">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-lg ring ring-primary ring-offset-2">
                        {job.postedBy.companyLogo && (
                          <img src={job.postedBy.companyLogo || getAvatarUrl(job.postedBy.companyName)} alt={job.postedBy.companyName} />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Posted by</p>
                      <p className="text-sm font-semibold text-slate-900">{job.postedBy.companyName}</p>
                    </div>
                  </div>
                </div>

                {/* Job Title */}
                <h3 className="card-title text-xl font-bold text-slate-900 mb-2">
                  {job.title}
                </h3>

                {/* Job Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Job Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatDate(job.createdAt)}</span>
                  </div>
                </div>

                {/* Applications Badge */}
                <div className="mb-4">
                  <div className="badge badge-primary badge-lg gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {job.applications.length} Applications
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="card bg-white shadow-lg">
            <div className="card-body text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No jobs found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}