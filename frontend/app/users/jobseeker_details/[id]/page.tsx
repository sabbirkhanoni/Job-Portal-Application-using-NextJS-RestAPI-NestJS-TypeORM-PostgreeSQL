'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import AxiosToastError from '@/utils/AxiosToastError';
import { toast } from 'react-toastify';

type JobSeekerData = {
  id: number;
  user: {
    id: number;
    fullName: string;
    email: string;
    avatar: string | null;
    role: string;
    status: string;
  };
  resume: string;
  skills: string;
  experience: string;
  portfolio: string;
}

export default function JobSeekerDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [jobSeeker, setJobSeeker] = useState<JobSeekerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobSeekerDetails();
  }, []);

  const fetchJobSeekerDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/admin/jobseekers/${id}`
      );

      if (response.data.success) {
        setJobSeeker(response.data.data);
      } else {
        setError('Failed to fetch job seeker details');
      }

    } catch (error) {
      AxiosToastError(error);
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadResume = () => {
    toast.info('Downloading resume...');
  };

  const handleViewPortfolio = () => {
    toast.info('Portfolio is not available.');
  };


  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-slate-600">Loading job seeker details...</p>
        </div>
      </div>
    );
  }

  if (error || !jobSeeker) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="card bg-white shadow-lg max-w-md">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Error</h2>
            <p className="text-slate-600 mb-4">{error || 'Job seeker not found'}</p>
            <button onClick={() => window.history.back()} className="btn btn-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const skillsArray = jobSeeker.skills.split(',').map(skill => skill.trim());

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="btn btn-ghost btn-circle text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold">Job Seeker Details</h1>
              <p className="text-slate-300">View candidate profile and information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-white shadow-lg h-full">
              <div className="card-body">
                {/* Avatar & Name */}
                <div className="flex flex-col items-center mb-6">
                  <div className="avatar mb-4">
                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-4">
                      <img 
                        src={getAvatarUrl(jobSeeker.user.fullName)} 
                        alt={jobSeeker.user.fullName} 
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
                    {jobSeeker.user.fullName}
                  </h2>
                  <p className="text-slate-500 mb-2">{jobSeeker.user.email}</p>
                  <div className="flex gap-2">
                    <span className={`badge badge-lg capitalize`}>
                      {jobSeeker.user.status}
                    </span>
                    <span className="badge badge-primary badge-lg capitalize">
                      {jobSeeker.user.role}
                    </span>
                  </div>
                </div>

                {/* User IDs */}
                <div className="divider"></div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">User ID</p>
                    <p className="text-lg font-mono font-bold text-slate-900">#{jobSeeker.user.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Profile ID</p>
                    <p className="text-lg font-mono font-bold text-slate-900">#{jobSeeker.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-black text-2xl mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Skills & Expertise
                </h3>

                <div className="flex flex-wrap gap-3">
                  {skillsArray.map((skill, index) => (
                    <span 
                      key={index} 
                      className="badge badge-primary badge-lg px-6 py-4 text-base"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {skillsArray.length === 0 && (
                  <div className="alert alert-warning">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>No skills listed</span>
                  </div>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-black text-2xl mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Work Experience
                </h3>

                <div className="p-6 bg-gradient-to-br from-green-50 to-slate-50 rounded-lg border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 font-medium mb-1">Total Experience</p>
                      <p className="text-4xl font-bold text-slate-900 mb-2">
                        {jobSeeker.experience} {parseInt(jobSeeker.experience) === 1 ? 'Year' : 'Years'}
                      </p>
                      <p className="text-slate-600">
                        Professional work experience in the industry
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume */}
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-black text-2xl mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume / CV
                </h3>

                {jobSeeker.resume ? (
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-slate-50 rounded-lg border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-600 w-16 h-16 rounded-xl flex items-center justify-center text-white">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 font-medium">Resume Document</p>
                          <p className="text-lg font-bold text-slate-900 mb-1">{jobSeeker.resume}</p>
                          <div className="badge badge-success">Available</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button 
                        onClick={handleDownloadResume}
                        className="btn btn-primary flex-1 gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Resume
                      </button>
                      <button 
                        onClick={handleDownloadResume}
                        className="btn bg-black btn-outline flex-1 gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Resume
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>No resume uploaded</span>
                  </div>
                )}
              </div>
            </div>

            {/* Portfolio */}
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-black text-2xl mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Portfolio Website
                </h3>

                {jobSeeker.portfolio ? (
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-slate-50 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-orange-600 w-16 h-16 rounded-xl flex items-center justify-center text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 font-medium mb-1">Portfolio Link</p>
                        <a 
                          href={jobSeeker.portfolio.startsWith('http') ? jobSeeker.portfolio : `https://${jobSeeker.portfolio}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold text-blue-600 hover:text-blue-700 break-all"
                        >
                          {jobSeeker.portfolio}
                        </a>
                      </div>
                    </div>

                    <button 
                      onClick={handleViewPortfolio}
                      className="btn btn-primary w-full gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Portfolio Website
                    </button>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>No portfolio link provided</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}