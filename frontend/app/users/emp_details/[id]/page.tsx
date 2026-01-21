'use client';

import { useState } from 'react';
import AxiosToastError from "@/utils/AxiosToastError";
import axios from "axios";
import { useCookie } from "next-cookie"; 
import { useEffect } from "react";
import { useParams } from "next/navigation";

interface CompanyDetailsProps {
  id: number;
  companyName: string;
  companyLogo: string | null;
  companyAddress: string | null;
  tradeLicense: string | null;
  approved: 'pending' | 'approved' | 'rejected';
  fullName: string;
  email: string;
}

export default function CompanyDetailsPage() {

  
  const cookie = useCookie();
  const token = cookie.get('jwtToken');
  const params = useParams();
  const id = params.id;

 const [companyData, setCompanyData] = useState<CompanyDetailsProps | null>(null);


 async function fetchUserEmployeeData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/employees/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const employeeData = response.data.data;

    setCompanyData({
      id: employeeData.id,
      companyName: employeeData.companyName,
      companyLogo: employeeData.companyLogo,
      companyAddress: employeeData.companyAddress,
      tradeLicense: employeeData.tradeLicense,
      approved: employeeData.approved,
      fullName: employeeData.user?.fullName,
      email: employeeData.user?.email
    });

  } catch (error) {
    AxiosToastError(error);
  }
}

const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
  };


  useEffect(() => {
    fetchUserEmployeeData();
  }, [id]);

  if (!companyData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading company details...</div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold">Company Details</h1>
              <p className="text-slate-300">View and manage company information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="">
            <div className="card bg-white shadow-lg h-full">
              <div className="card-body">
                {/* Company Logo */}
                <div className="flex flex-col items-center mb-6">
                  <div className="avatar mb-4">
                    <div className="w-32 h-32 rounded-2xl ring ring-primary ring-offset-4">
                      {companyData.companyLogo && (
                        <img src={companyData.companyLogo || getAvatarUrl(companyData.companyName)} alt={companyData.companyName} />
                      )}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
                    {companyData.companyName}
                  </h2>
                  <span className={`badge ${(companyData.approved)} badge-lg capitalize`}>
                    {(companyData.approved)}
                  </span>
                </div>

                {/* Company ID */}
                <div className="divider"></div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Company ID</p>
                    <p className="text-lg font-mono font-bold text-slate-900">#{companyData.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Person Information */}
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-black text-2xl mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Contact Person
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Full Name
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                      <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900">{companyData.fullName}</p>
                        <p className="text-xs text-slate-500">Primary Contact</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                      <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-slate-900 truncate">{companyData.email}</p>
                        <p className="text-xs text-slate-500">Business Email</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Address */}
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-black text-2xl mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Company Address
                </h3>

                {companyData.companyAddress ? (
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-slate-900 leading-relaxed font-medium">
                          {companyData.companyAddress}
                        </p>
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(companyData.companyAddress)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>No company address provided</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trade License */}
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-2xl text-black mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Trade License
                </h3>

                {companyData.tradeLicense ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-slate-50 rounded-lg border border-purple-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-black font-medium">License Number</p>
                            <p className="text-xl font-bold text-slate-900 font-mono">
                              {companyData.tradeLicense}
                            </p>
                          </div>
                        </div>
                        <div className="badge badge-success badge-lg">Verified</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>No trade license uploaded</span>
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