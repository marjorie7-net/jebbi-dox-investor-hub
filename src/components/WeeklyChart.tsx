import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from "recharts";

const defaultData = [
  { day: "Mon", amount: 15000 },
  { day: "Tue", amount: 22000 },
  { day: "Wed", amount: 33567 },
  { day: "Thu", amount: 28000 },
  { day: "Fri", amount: 18000 },
  { day: "Sat", amount: 12000 },
  { day: "Sun", amount: 9000 },
];

const WeeklyChart = () => {
  const [data] = useState(defaultData);
  const maxIdx = data.reduce((mi, d, i, arr) => d.amount > arr[mi].amount ? i : mi, 0);

  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-lg font-display font-bold text-foreground">Members This Week</h3>
          <p className="text-2xl font-display font-bold text-primary">+ 3.2%</p>
        </div>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          See statistics for all time
        </button>
      </div>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(36, 20%, 85%)" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(0, 5%, 45%)", fontSize: 13 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 5%, 45%)", fontSize: 12 }}
              tickFormatter={(v) => `${v / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(36, 30%, 97%)",
                border: "1px solid hsl(36, 20%, 85%)",
                borderRadius: "12px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`KES ${value.toLocaleString()}`, "Amount"]}
            />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={i === maxIdx ? "hsl(0, 45%, 35%)" : "hsl(45, 15%, 75%)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;
