import { Card } from "@/components/ui/card"
import { Clock, Flame } from "lucide-react"

export const MealPlan = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        {
          time: "8:00 AM",
          name: "Breakfast",
          calories: 650,
          items: ["Oatmeal with berries", "Protein shake", "Banana"],
        },
        {
          time: "12:00 PM",
          name: "Lunch",
          calories: 850,
          items: ["Grilled chicken breast", "Brown rice", "Steamed vegetables"],
        },
        {
          time: "6:00 PM",
          name: "Dinner",
          calories: 750,
          items: ["Salmon fillet", "Sweet potato", "Green salad"],
        },
      ].map((meal, i) => (
        <Card key={i} className="p-4 bg-background/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{meal.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-primary" />
              <span className="text-sm">{meal.calories} kcal</span>
            </div>
          </div>
          <h4 className="font-medium mb-2">{meal.name}</h4>
          <ul className="text-sm text-muted-foreground">
            {meal.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}

