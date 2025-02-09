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
  };
  handleChange: (field: string, value: string | number) => void;
  healthGoals: [string, string][];
  activityLevels: [string, string][];
}

export function HealthFitnessCard({ formData, handleChange, healthGoals, activityLevels }: HealthFitnessCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        <CardTitle className="text-2xl font-bold">Health & Fitness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Health Goal</Label>
          <div className="grid grid-cols-2 gap-4">
            {healthGoals.map(([value, label]) => (
              <div
                key={value}
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md",
                  formData.healthGoal === value
                    ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950"
                    : "border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-700"
                )}
                onClick={() => handleChange("healthGoal", value)}
              >
                <h3 className="font-medium">{label}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Activity Level</Label>
          <div className="grid gap-3">
            {activityLevels.map(([value, label]) => (
              <div
                key={value}
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md",
                  formData.activityLevel === value
                    ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950"
                    : "border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-700"
                )}
                onClick={() => handleChange("activityLevel", value)}
              >
                <h3 className="font-medium">{label}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-lg font-semibold">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={(e) => handleChange("height", Number(e.target.value))}
              className="text-lg p-6 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-lg font-semibold">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange("weight", Number(e.target.value))}
              className="text-lg p-6 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

