import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

export const DonutAnalyticsChart = ({ data }) => (
  <div className="grid items-center gap-5 sm:grid-cols-[220px_1fr]">
    <div className="relative h-56">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={62} outerRadius={88} paddingAngle={2} stroke="none">
            {data.map((entry) => (
              <Cell fill={entry.color} key={entry.name} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{data[0].value}%</span>
        <span className="text-sm text-emerald-300">{data[0].name}</span>
      </div>
    </div>
    <div className="space-y-4">
      {data.map((emotion) => (
        <div className="flex items-center justify-between gap-4" key={emotion.name}>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: emotion.color }} />
            <span className="text-sm text-slate-300">{emotion.name}</span>
          </div>
          <span className="font-bold text-white">{emotion.value}%</span>
        </div>
      ))}
    </div>
  </div>
)
