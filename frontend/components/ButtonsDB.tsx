"use client";
import { useRouter } from 'next/navigation';
export function ButtonSectionDB() {
  const router = useRouter();
  return (
    <div className="flex justify-evenly gap-3 flex-wrap">
        <button onClick={() => router.push('/users/registeredUsers')} className="btn btn-active w-20 text-xs lg:text-md lg:w-40">Registered User</button>
        <button onClick={() => router.push('/users/employeesUsers')} className="btn btn-active btn-info w-20 text-xs lg:text-md lg:w-40">Employee's Company</button>
        <button onClick={() => router.push('/users/jobseekersUsers')} className="btn btn-active btn-success w-20 text-xs lg:text-md lg:w-40">JobSeekers Profile</button>
        <button onClick={() => router.push('/jobs')} className="btn btn-active btn-primary w-20 text-xs lg:text-md lg:w-40">All Jobs</button>
        <button
        onClick={() => router.push('/chat')}
        className="btn btn-active btn-warning w-20 text-xs lg:text-md lg:w-40">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Messenger</button>
    </div>
  );
}