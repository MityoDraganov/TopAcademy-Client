"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Activity {
  name: string
  completed: boolean[]
}

export default function ActivityTracker() {
  const days = ["S", "M", "T", "W", "T", "F", "S"]
  const [activities, setActivities] = useState<Activity[]>([
    { name: "Today's Meals", completed: [false, false, false, true, false, true, true] },
    { name: "Weight", completed: [false, false, false, false, false, true, true] },
    { name: "Water Intake", completed: [false, false, false, false, false, true, true] },
    { name: "Daily Recap", completed: [false, false, false, false, false, true, true] },
  ])

  const toggleActivity = (activityIndex: number, dayIndex: number) => {
    setActivities(
      activities.map((activity, i) => {
        if (i === activityIndex) {
          const newCompleted = [...activity.completed]
          newCompleted[dayIndex] = !newCompleted[dayIndex]
          return { ...activity, completed: newCompleted }
        }
        return activity
      }),
    )
  }

  return (
    <Card className="w-full mx-auto px-2">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-[auto_repeat(7,1fr)]">
          {/* Header - ACTIVITIES */}
          <div className="p-4 pr-0 font-medium text-gray-500 text-sm">ACTIVITIES</div>

          {/* Days of week */}
          {days.map((day, index) => (
            <div
              key={day + index}
              className={`p-4 px-1 text-center font-medium text-sm
                ${index === 3 || index === 5 || index === 6 ? "text-rose-500" : "text-gray-400"}`}
            >
              {day}
            </div>
          ))}

          {/* Activity rows */}
          {activities.map((activity, activityIndex) => (
            <>
              {/* Activity name */}
              <div key={activity.name} className="p-4 px-1 border-t text-gray-600">
                {activity.name}
              </div>

              {/* Activity completion circles */}
              {activity.completed.map((isCompleted, dayIndex) => (
                <div
                  key={dayIndex}
                  className="p-4 px-1 border-t flex items-center justify-center"
                  onClick={() => toggleActivity(activityIndex, dayIndex)}
                >
                  {isCompleted ? (
                    <div
                      className={`w-4 h-4 p-1 rounded-full flex items-center justify-center
                      ${dayIndex === 3 || dayIndex === 5 || dayIndex === 6 ? "bg-rose-500" : "bg-gray-200"}`}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </Card>
  )
}
