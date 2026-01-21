"use client";

import { useRouter } from 'next/navigation';

export default function JobseekersHeader() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div>
            <h1 className="text-4xl font-bold mb-2">Job Seekers</h1>
            <p className="text-slate-300">
              View and manage all job seeker profiles on the platform
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-900"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
