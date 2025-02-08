"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import MealCard from "@/components/MealCard";
import { createWeeklyPlan } from "@/app/api/requests/auth";
import { WeeklyPlanResponse, Meal } from "@/types/WeeklyPlan";

export default function MealPlan() {
  const [isImperial, setIsImperial] = useState(false);
  const [isCooked, setIsCooked] = useState(false);
  const [isHighCarbDay, setIsHighCarbDay] = useState(true);
  const [calories, setCalories] = useState(0);
  const [highCarbDays, setHighCarbDays] = useState<{
    breakfast_options: Meal[];
    lunch_options: Meal[];
    dinner_options: Meal[];
    snacks: Meal[];
  }>({
    breakfast_options: [],
    lunch_options: [],
    dinner_options: [],
    snacks: [],
  });
  const [lowCardDays, setLowCardDays] = useState<{
    breakfast_options: Meal[];
    lunch_options: Meal[];
    dinner_options: Meal[];
    snacks: Meal[];
  }>({
    breakfast_options: [],
    lunch_options: [],
    dinner_options: [],
    snacks: [],
  });
  const [macros, setMacros] = useState({
    highCarb: {
      protein: 0,
      fat: 0,
      carbs: 0,
    },
    lowCarb: {
      protein: 0,
      fat: 0,
      carbs: 0,
    },
  });
  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        console.log("Fetching meal plan...");
        const response = await createWeeklyPlan() as WeeklyPlanResponse;
        if (!response) {
          console.error("No response received from createWeeklyPlan");
          return;
        }

        setHighCarbDays({
          breakfast_options: response.high_carb_days.breakfast_options,
          lunch_options: response.high_carb_days.lunch_options,
          dinner_options: response.high_carb_days.dinner_options,
          snacks: response.high_carb_days.snacks,
        });
        setLowCardDays({
          breakfast_options: response.low_carb_days?.breakfast_options || [],
          lunch_options: response.low_carb_days?.lunch_options || [],
          dinner_options: response.low_carb_days?.dinner_options || [],
          snacks: response.low_carb_days?.snacks || [],
        });
        setCalories(response.daily_calories);
        setMacros({
          highCarb: response.high_carb_day_macros,
          lowCarb: response.low_carb_day_macros,
        });
      } catch (error) {
        console.error("Error fetching meal plan:", error);
        if (error instanceof Error) {
          console.error("Error details:", error.message);
        }
      }
    };

    console.log("Setting up meal plan fetch...");
    fetchMealPlan();
  }, []);

  const handleMealToggle = (
    mealIndex: number,
    type: string,
    isHighCarb: boolean
  ) => {
    const updateMeals = (meals: Meal[]) => {
      return meals.map((meal, index) => {
        if (index === mealIndex) {
          return { ...meal, selected: !meal.selected };
        }
        return meal;
      });
    };

    if (isHighCarb) {
      setHighCarbDays((prev: typeof highCarbDays) => ({
        ...prev,
        [type]: updateMeals(prev[type as keyof typeof prev]),
      }));
    } else {
      setLowCardDays((prev: typeof lowCardDays) => ({
        ...prev,
        [type]: updateMeals(prev[type as keyof typeof prev]),
      }));
    }
  };

  const handleMealUpdate = (
    mealIndex: number,
    updatedMeal: Meal,
    type: string,
    isHighCarb: boolean
  ) => {
    if (isHighCarb) {
      setHighCarbDays((prev: typeof highCarbDays) => ({
        ...prev,
        [type]: prev[type as keyof typeof prev].map(
          (meal: Meal, index: number) =>
            index === mealIndex ? updatedMeal : meal
        ),
      }));
    } else {
      setLowCardDays((prev: typeof lowCardDays) => ({
        ...prev,
        [type]: prev[type as keyof typeof prev].map(
          (meal: Meal, index: number) =>
            index === mealIndex ? updatedMeal : meal
        ),
      }));
    }
  };

  const handleMealSwitch = (
    mealIndex: number,
    newMeal: Meal,
    type: string,
    isHighCarb: boolean
  ) => {
    if (isHighCarb) {
      setHighCarbDays((prev: typeof highCarbDays) => ({
        ...prev,
        [type]: prev[type as keyof typeof prev].map(
          (meal: Meal, index: number) =>
            index === mealIndex ? newMeal : meal
        ),
      }));
    } else {
      setLowCardDays((prev: typeof lowCardDays) => ({
        ...prev,
        [type]: prev[type as keyof typeof prev].map(
          (meal: Meal, index: number) =>
            index === mealIndex ? newMeal : meal
        ),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-32 overflow-y-auto">
      <main className="container py-6 max-w-4xl mx-auto px-2">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            MACROS & MEAL PLAN
          </h1>
          <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
            <p>(Your Meal Plan & Macros are due to Update in 7 Days)</p>
            <button
              onClick={() => setIsHighCarbDay(!isHighCarbDay)}
              className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {isHighCarbDay
                ? "Switch to Low Carb Day"
                : "Switch to High Carb Day"}
            </button>
          </div>
        </div>

        {/* Macros Section */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-8">
          <Card className="relative">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{calories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </CardContent>
          </Card>
          <Card className="relative">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.round(
                  isHighCarbDay
                    ? macros.highCarb.protein
                    : macros.lowCarb.protein
                )}
                g
              </div>
              <div className="text-sm text-gray-600">Protein</div>
            </CardContent>
          </Card>
          <Card className="relative">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.round(
                  isHighCarbDay ? macros.highCarb.fat : macros.lowCarb.fat
                )}
                g
              </div>
              <div className="text-sm text-gray-600">Fat</div>
            </CardContent>
          </Card>
          <Card className="relative">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.round(
                  isHighCarbDay ? macros.highCarb.carbs : macros.lowCarb.carbs
                )}
                g
              </div>
              <div className="text-sm text-gray-600">Carbs</div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Measurement Type</div>
                  <div className="flex gap-4 mt-2">
                    <span
                      className={`text-sm ${
                        !isImperial
                          ? "text-red-500 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      Metric
                    </span>
                    <Switch
                      checked={isImperial}
                      onCheckedChange={setIsImperial}
                    />
                    <span
                      className={`text-sm ${
                        isImperial
                          ? "text-red-500 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      Imperial
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weigh Ingredients</div>
                  <div className="flex gap-4 mt-2">
                    <span
                      className={`text-sm ${
                        !isCooked ? "text-red-500 font-medium" : "text-gray-500"
                      }`}
                    >
                      Raw
                    </span>
                    <Switch checked={isCooked} onCheckedChange={setIsCooked} />
                    <span
                      className={`text-sm ${
                        isCooked ? "text-red-500 font-medium" : "text-gray-500"
                      }`}
                    >
                      Cooked
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Plan */}
        <div className="space-y-6">
          {/* Today's Meals */}
          <div className="grid grid-cols-1 gap-6">
            {/* Breakfast */}
            {(isHighCarbDay ? highCarbDays : lowCardDays)
              .breakfast_options[0] && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Breakfast</h2>
                <MealCard
                  meal={
                    (isHighCarbDay ? highCarbDays : lowCardDays)
                      .breakfast_options[0]
                  }
                  mealOptions={(isHighCarbDay ? highCarbDays : lowCardDays).breakfast_options}
                  onToggle={() =>
                    handleMealToggle(0, "breakfast_options", isHighCarbDay)
                  }
                  onUpdate={(updatedMeal) =>
                    handleMealUpdate(
                      0,
                      updatedMeal,
                      "breakfast_options",
                      isHighCarbDay
                    )
                  }
                  onSwitch={(newMeal) =>
                    handleMealSwitch(
                      0,
                      newMeal,
                      "breakfast_options",
                      isHighCarbDay
                    )
                  }
                />
              </div>
            )}

            {/* Lunch */}
            {(isHighCarbDay ? highCarbDays : lowCardDays).lunch_options[0] && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Lunch</h2>
                <MealCard
                  meal={
                    (isHighCarbDay ? highCarbDays : lowCardDays)
                      .lunch_options[0]
                  }
                  mealOptions={(isHighCarbDay ? highCarbDays : lowCardDays).lunch_options}
                  onToggle={() =>
                    handleMealToggle(0, "lunch_options", isHighCarbDay)
                  }
                  onUpdate={(updatedMeal) =>
                    handleMealUpdate(
                      0,
                      updatedMeal,
                      "lunch_options",
                      isHighCarbDay
                    )
                  }
                  onSwitch={(newMeal) =>
                    handleMealSwitch(
                      0,
                      newMeal,
                      "lunch_options",
                      isHighCarbDay
                    )
                  }
                />
              </div>
            )}

            {/* Dinner */}
            {(isHighCarbDay ? highCarbDays : lowCardDays).dinner_options[0] && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Dinner</h2>
                <MealCard
                  meal={
                    (isHighCarbDay ? highCarbDays : lowCardDays)
                      .dinner_options[0]
                  }
                  mealOptions={(isHighCarbDay ? highCarbDays : lowCardDays).dinner_options}
                  onToggle={() =>
                    handleMealToggle(0, "dinner_options", isHighCarbDay)
                  }
                  onUpdate={(updatedMeal) =>
                    handleMealUpdate(
                      0,
                      updatedMeal,
                      "dinner_options",
                      isHighCarbDay
                    )
                  }
                  onSwitch={(newMeal) =>
                    handleMealSwitch(
                      0,
                      newMeal,
                      "dinner_options",
                      isHighCarbDay
                    )
                  }
                />
              </div>
            )}

            {/* Snack */}
            {(isHighCarbDay ? highCarbDays : lowCardDays).snacks[0] && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Snack</h2>
                <MealCard
                  meal={(isHighCarbDay ? highCarbDays : lowCardDays).snacks[0]}
                  mealOptions={(isHighCarbDay ? highCarbDays : lowCardDays).snacks}
                  onToggle={() => handleMealToggle(0, "snacks", isHighCarbDay)}
                  onUpdate={(updatedMeal) =>
                    handleMealUpdate(0, updatedMeal, "snacks", isHighCarbDay)
                  }
                  onSwitch={(newMeal) =>
                    handleMealSwitch(
                      0,
                      newMeal,
                      "snacks",
                      isHighCarbDay
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
