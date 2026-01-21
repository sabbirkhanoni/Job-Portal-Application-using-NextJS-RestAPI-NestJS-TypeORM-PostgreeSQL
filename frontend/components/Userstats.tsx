
type UsersStatsProps = {
  total: number;
  active: number;
  inactive: number;
}

export default function UsersStats({ total, active, inactive }: UsersStatsProps) {

  const stats = [
    {
      title: 'Total Users',
      value: total,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: active,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Inactive Users',
      value: inactive,
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-600',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-slate-600 text-sm font-medium mb-2">{stat.title}</p>
                <h3 className="text-4xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}