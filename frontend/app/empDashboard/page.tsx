"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EmployeeDashboard() {

  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  // Mock data for employee
  const employeeData = {
    companyName: 'Tech Solutions Inc.',
    companyLogo: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=2563eb&color=fff&size=200',
    employeeName: 'Karim Khan',
    employeeEmail: 'karim.khan@techsolutions.com',
    companyStatus: 'approved' as 'approved' | 'pending' | 'rejected',
    joinedDate: '2024-01-15'
  };

  // Statistics
  const stats = {
    totalJobs: 5,
    activeJobs: 3,
    jobsOnHold: 1,
    rejectedJobs: 1,
    totalApplications: 24,
    newApplications: 6,
    unreadMessages: 3
  };

  // Recent jobs
  const recentJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      status: 'approved',
      applications: 8,
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      status: 'hold',
      applications: 2,
      postedDate: '5 days ago'
    },
    {
      id: 3,
      title: 'Product Designer',
      status: 'approved',
      applications: 14,
      postedDate: '1 week ago'
    }
  ];


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-20 h-20 rounded-xl ring ring-white ring-offset-2">
                  <img src={employeeData.companyLogo} alt={employeeData.companyName} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{employeeData.employeeName}!</h1>
                <p className="text-blue-200">{employeeData.companyName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`badge badge-sm`}>
                    {employeeData.companyStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => router.push('/empDashboard/empChat')}
                className="btn btn-primary gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Message Admin
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('userData');
                  }
                  router.push('/login');
                }}
                className="btn btn-outline bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium mb-2">Total Jobs Posted</p>
                  <h3 className="text-4xl font-bold text-slate-900 mb-1">{stats.totalJobs}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium mb-2">Total Applications</p>
                  <h3 className="text-4xl font-bold text-green-600 mb-1">{stats.totalApplications}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium mb-2">Jobs on Hold</p>
                  <h3 className="text-4xl font-bold text-orange-600 mb-1">{stats.jobsOnHold}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-lg mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl text-black mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <button className="btn btn-outline bg-black btn-lg flex-col h-28 gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Post New Job</span>
              </button>

              <button className="btn btn-outline btn-lg bg-black flex-col h-28 gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Applications</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-1 gap-6">
          <div className="lg:col-span-2">
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title text-black text-2xl">Recent Jobs</h2>
                </div>

                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 mb-1">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.postedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {job.applications} applications
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`badge badge-lg capitalize`}>
                          {job.status}
                        </span>
                        <button className="btn btn-ghost btn-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}