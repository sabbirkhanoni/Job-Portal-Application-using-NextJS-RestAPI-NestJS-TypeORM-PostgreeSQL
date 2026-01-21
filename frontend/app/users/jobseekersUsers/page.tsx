"use client";

import JobseekersHeader from '@/components/Jobseekersheader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AxiosToastError from '@/utils/AxiosToastError';
import { useCookie } from 'next-cookie';
import { useRouter } from 'next/navigation';


export class JobseekerProfile {
  id!: number;
  resume!: string;
  skills!: string;
  experience!: string;
  portfolio!: string;
}

type Jobseeker = {
  id: number;
  fullName: string;
  email: string;
  avatar: string | null;
  status: 'active' | 'inactive';
  profile: JobseekerProfile;
};


export default function JobseekersPage() {
  const cookies = useCookie();
  const token = cookies.get('jwtToken');
  const router = useRouter();

  const [jobseekers, setJobseekers] = useState<Jobseeker[]>([]);


  async function fetchJobseekers() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/jobseekers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const rawJobseekers = response?.data?.data || [];
      console.log("Jobseekers Data:", rawJobseekers);

      setJobseekers(
        rawJobseekers.map((js: any) => ({
          id: js.id,

          fullName: js.user?.fullName || '',
          email: js.user?.email || '',
          avatar: js.user?.avatar,
          status: js.user?.status || 'active',

          profile: {
            resume: js.resume || '',
            skills: js.skills || '',
            experience: js.experience || '',
            portfolio: js.portfolio || '',
          },
        }))
      );
    } catch (error) {
      AxiosToastError(error);
    }
  }

  useEffect(() => {
    fetchJobseekers();
  }, []);


  const handleViewProfile = (id : number) => {
    router.push(`/users/jobseeker_details/${id}`);
  };

  const handleDownloadResume = (resumeUrl: string) => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    }
  };
  
  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
  };
  


  return (
    <div className="min-h-screen bg-slate-50">
      <JobseekersHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="mt-8">
          <div className="card bg-white shadow-lg">
            <div className="card-body">

              <div className="overflow-x-auto">
                <table className="table bg-black text-white w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Job Seeker</th>
                      <th>Skills</th>
                      <th>Experience</th>
                      <th>Resume</th>
                      <th>Portfolio</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody className="custom-zebra text-black">
                    {jobseekers.map((js) => (
                      <tr key={js.id} className="hover">
                        <td className="font-mono text-sm">{js.id}</td>

                        {/* Job Seeker */}
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-2">
                                <img
                                  src={js.avatar || getAvatarUrl(js.fullName)}
                                  alt={js.fullName}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">
                                {js.fullName}
                              </div>
                              <div className="text-sm text-slate-500">
                                {js.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Skills */}
                        <td>
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {js.profile.skills
                              ?.split(',')
                              .slice(0, 3)
                              .map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="badge badge-primary badge-sm"
                                >
                                  {skill.trim()}
                                </span>
                              ))}
                          </div>
                        </td>

                        {/* Experience */}
                        <td>
                          <div className="text-sm text-slate-700 max-w-xs truncate">
                            {js.profile.experience}
                          </div>
                        </td>

                        {/* Resume */}
                        <td>
                          {js.profile.resume ? (
                            <button
                              onClick={() =>
                                handleDownloadResume(js.profile.resume)
                              }
                              className="btn btn-ghost btn-sm text-blue-600"
                            >
                              View
                            </button>
                          ) : (
                            <span className="badge badge-ghost badge-sm">
                              No Resume
                            </span>
                          )}
                        </td>

                        {/* Portfolio */}
                        <td>
                          {js.profile.portfolio ? (
                            <a
                              href={js.profile.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost btn-sm text-purple-600"
                            >
                              Visit
                            </a>
                          ) : (
                            <span className="badge badge-ghost badge-sm">
                              No Portfolio
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td>
                          <button
                            onClick={() => handleViewProfile(js.id)}
                            className="btn btn-ghost btn-sm"
                            title="View Profile"
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {jobseekers.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-bold">
                      No job seekers available
                    </h3>
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
