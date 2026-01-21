'use client';

import { useRouter } from 'next/navigation';

export default function GlobalNotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-[200px] md:text-[300px] font-bold text-white opacity-10 leading-none">
              404
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-xl md:text-2xl text-blue-200 mb-2">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-lg text-blue-300">
              It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleGoHome}
              className="btn btn-lg bg-white text-blue-900 hover:bg-blue-50 border-none gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Homepage
            </button>
            <button
              onClick={handleGoBack}
              className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-blue-900 gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}