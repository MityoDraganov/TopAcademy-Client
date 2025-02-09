import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HealthFitnessCardProps {
  formData: {
    healthGoal: string;
    activityLevel: string;
    height: number;
    weight: number;
    age: number;
  };
  handleChange: (field: string, value: string | number) => void;
  healthGoals: [string, string][];
  activityLevels: [string, string][];
}

export function HealthFitnessCard({ formData, handleChange, healthGoals, activityLevels }: HealthFitnessCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        <CardTitle className="text-xl font-bold">Health & Fitness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div className="space-y-3">
          <Label className="text-base font-semibold">Health Goal</Label>
          <div className="grid grid-cols-2 gap-3">
            {healthGoals.map(([value, label]) => (
              <div
                key={value}
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-md",
                  formData.healthGoal === value
                    ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950"
                    : "border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-700"
                )}
                onClick={() => handleChange("healthGoal", value)}
              >
                <h3 className="font-medium text-sm">{label}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">Activity Level</Label>
          <div className="grid gap-2">
            {activityLevels.map(([value, label]) => (
              <div
                key={value}
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-md",
                  formData.activityLevel === value
                    ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950"
                    : "border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-700"
                )}
                onClick={() => handleChange("activityLevel", value)}
              >
                <h3 className="font-medium text-sm">{label}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="height" className="text-base font-semibold">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              min="100"
              value={formData.height}
              onChange={(e) => handleChange("height", Number(e.target.value))}
              className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="weight" className="text-base font-semibold">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min="30"
              value={formData.weight}
              onChange={(e) => handleChange("weight", Number(e.target.value))}
              className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="age" className="text-base font-semibold">Age</Label>
            <Input
              id="age"
              type="number"
              min="13"
              value={formData.age}
              onChange={(e) => handleChange("age", Number(e.target.value))}
              className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

