import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DietaryPreferencesCardProps {
  formData: {
    dietary: string;
    allergies: string;
    excludedFood: string;
    mealsPerDay: number;
    healthCondition: string;
  };
  handleChange: (field: string, value: string | number) => void;
  healthConditions: [string, string][];
}

const dietaryOptions: [string, string][] = [
  ["none", "No Preference"],
  ["vegetarian", "Vegetarian"],
  ["vegan", "Vegan"],
  ["pescatarian", "Pescatarian"],
  ["keto", "Keto"],
  ["paleo", "Paleo"],
]

export function DietaryPreferencesCard({ formData, handleChange, healthConditions }: DietaryPreferencesCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        <CardTitle className="text-xl font-bold">Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div className="space-y-3">
          <Label className="text-base font-semibold">Dietary Preference</Label>
          <div className="grid grid-cols-2 gap-3">
            {dietaryOptions.map(([value, label]) => (
              <div
                key={value}
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-md",
                  formData.dietary === value
                    ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950"
                    : "border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-700"
                )}
                onClick={() => handleChange("dietary", value)}
              >
                <h3 className="font-medium text-sm">{label}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">Health Conditions</Label>
          <div className="grid grid-cols-2 gap-3">
            {healthConditions.map(([value, label]) => (
              <div
                key={value}
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-md",
                  formData.healthCondition === value
                    ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950"
                    : "border-gray-200 hover:border-red-200 dark:border-gray-700 dark:hover:border-red-700"
                )}
                onClick={() => handleChange("healthCondition", value)}
              >
                <h3 className="font-medium text-sm">{label}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="allergies" className="text-base font-semibold">Allergies</Label>
          <Input
            id="allergies"
            placeholder="e.g., peanuts, shellfish, dairy"
            value={formData.allergies}
            onChange={(e) => handleChange("allergies", e.target.value)}
            className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="excludedFood" className="text-base font-semibold">Excluded Food</Label>
          <Input
            id="excludedFood"
            placeholder="e.g., mushrooms, olives, cilantro"
            value={formData.excludedFood}
            onChange={(e) => handleChange("excludedFood", e.target.value)}
            className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="mealsPerDay" className="text-base font-semibold">Meals Per Day</Label>
          <Input
            id="mealsPerDay"
            type="number"
            min="1"
            max="6"
            value={formData.mealsPerDay}
            onChange={(e) => handleChange("mealsPerDay", Number(e.target.value))}
            className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </CardContent>
    </Card>
  )
}

