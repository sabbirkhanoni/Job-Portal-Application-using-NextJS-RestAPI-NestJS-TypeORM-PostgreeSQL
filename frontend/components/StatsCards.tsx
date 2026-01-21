
type AnalyticsData = {
  totalUsers: number;
  totalEmployees: number;
  totalJobseekers: number;
  totalJobs: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingApprovals: number;
  totalApplications: number;
}

export default function StatsCards({ analytics }: { analytics: AnalyticsData }) {
  const stats = [
    {
      title: 'Total Users',
      value: analytics.totalUsers,
      icon: '👥',
    },
    {
      title: 'Total Jobs',
      value: analytics.totalJobs,
      icon: '💼',
    }
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-slate-600 text-sm font-medium mb-2">{stat.title}</p>
                <h3 className="text-4xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              </div>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}