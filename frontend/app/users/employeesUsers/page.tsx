'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AxiosToastError from '@/utils/AxiosToastError';
import { useEffect } from 'react';
import { useCookie } from 'next-cookie';
import { toast } from 'react-toastify/unstyled';


type EmployeeProfile = {
  id: number;
  companyName: string;
  companyLogo: string | null;
  companyAddress: string | null;
  tradeLicense: string | null;
  approved: 'pending' | 'approved' | 'rejected';
  email?: string;
  fullName?: string;
}

export default function EmployeesUsersPage() {
  const cookies = useCookie();
  const token = cookies.get('jwtToken');
  const router = useRouter();
  const [data, setData] = useState<{ users: EmployeeProfile[] }>({
    users: [],
  });
  const employees = data.users;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  async function fetchEmployeesUsers() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/employees`,
        {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
        }
      );

      const raw = res.data.data;

      setData({
        users: raw.map((item: any) => ({
          id: item.id,
          companyName: item.companyName,
          companyLogo: item.companyLogo,
          companyAddress: item.companyAddress,
          tradeLicense: item.tradeLicense,
          approved: item.approved,
          fullName: item.user?.fullName,
          email: item.user?.email,
        })),
      });
    } catch (error) {
      AxiosToastError(error);
    }
  }

  useEffect(() => {
    fetchEmployeesUsers();
  }, []);


  const filteredEmployees = employees.filter(emp => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        (emp.companyName ?? '').toLowerCase().includes(term) ||
        (emp.email ?? '').toLowerCase().includes(term) ||
        (emp.fullName ?? '').toLowerCase().includes(term);

      const matchesStatus =
        filterStatus === 'All' || emp.approved === filterStatus;

      return matchesSearch && matchesStatus;
  });


  const handleApprove = (id: number) => {
    toast.success(`Approved employee ${id}`);
  };

  const handleReject = (id: number) => {
    toast.error(`Rejected employee ${id}`);
  };

  const handleViewDetails = (id: number) => {
    router.push(`/users/emp_details/${id}`);
  };

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Employer's Companies</h1>
              <p className="text-slate-300">
                Manage employer accounts and company profiles
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


        {/* Table Card */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="form-control flex-1">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search by company name, email, or contact person..."
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="form-control w-full lg:w-48">
                <select
                  className="select select-bordered w-full"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option>All</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th>ID</th>
                    <th>Company</th>
                    <th>Contact Person</th>
                    <th>Address</th>
                    <th>Trade License</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="custom-zebra text-black">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover">
                      <td className="font-mono text-sm">{emp.id}</td>
                      
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-lg ring ring-primary ring-offset-2">
                              {emp.companyLogo ? (
                                <img src={emp.companyLogo || getAvatarUrl(emp.companyName)} alt={getAvatarUrl(emp.companyName)} />
                              ) : (
                                <div className="w-12 h-12 bg-slate-200 flex items-center justify-center text-2xl">
                                  🏢
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{emp.companyName}</div>
                            {emp.email && (
                              <div className="text-sm text-slate-500">{emp.email}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        {emp.fullName && (
                          <div className="text-slate-700">{emp.fullName}</div>
                        )}
                      </td>

                      <td>
                        {emp.companyAddress ? (
                          <div className="text-sm text-slate-700 max-w-xs truncate" title={emp.companyAddress}>
                            {emp.companyAddress}
                          </div>
                        ) : (
                          <span className="badge badge-ghost badge-sm">Not provided</span>
                        )}
                      </td>

                      <td>
                        {emp.tradeLicense ? (
                          <div className="text-sm text-slate-700 max-w-xs truncate" title={emp.tradeLicense}>
                            {emp.tradeLicense}
                          </div>
                        ) : (
                          <span className="badge badge-ghost badge-sm">Not provided</span>
                        )}
                      </td>

                      <td>
                        <span className={`badge badge-lg capitalize`}>
                          {emp.approved}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(emp.id)}
                            className="btn btn-ghost btn-sm"
                            title="View Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          
                          {emp.approved === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(emp.id)}
                                className="btn btn-ghost btn-sm text-success"
                                title="Approve"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleReject(emp.id)}
                                className="btn btn-ghost btn-sm text-error"
                                title="Reject"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredEmployees.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No employers found</h3>
                  <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
 
  );
}