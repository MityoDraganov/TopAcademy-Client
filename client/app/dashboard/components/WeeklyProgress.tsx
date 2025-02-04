"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Mon", calories: 2200, protein: 160 },
  { name: "Tue", calories: 2400, protein: 170 },
  { name: "Wed", calories: 2600, protein: 180 },
  { name: "Thu", calories: 2300, protein: 165 },
  { name: "Fri", calories: 2500, protein: 175 },
  { name: "Sat", calories: 2100, protein: 155 },
  { name: "Sun", calories: 2000, protein: 150 },
]

export const WeeklyProgress = () => {
    return (
      <div className="min-h-[30dvh] w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="calories" fill="#84cc16" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  
