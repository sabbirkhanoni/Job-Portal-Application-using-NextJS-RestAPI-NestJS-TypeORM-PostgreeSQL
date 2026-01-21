export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-8 border-blue-200/30 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-blue-500 rounded-full animate-pulse flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-blue-200">Please wait while we prepare your content</p>
        </div>
      </div>
    </div>
  );
}