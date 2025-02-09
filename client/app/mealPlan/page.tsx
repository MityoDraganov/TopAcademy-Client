"use client";

import MealCard from "@/components/MealCard";
import { MacroCard } from "./components/MacroCard";
import { useMealPlan } from "./hooks/useMealPlan";
import { MealOptions } from "./types";

const MealCardSkeleton = () => (
  <div className="border rounded-lg shadow-md animate-pulse">
    <div className="p-4 border-b">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="bg-gray-200 w-full sm:w-[100px] h-[200px] sm:h-[100px] rounded-lg"></div>
        <div className="flex-1 space-y-2 w-full">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="w-32 h-10 bg-gray-200 rounded-md"></div>
      </div>
    </div>
    <div className="p-4">
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg border">
            <div className="w-24 h-8 bg-gray-200 rounded"></div>
            <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-3 divide-x border-t">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 text-center">
          <div className="h-4 bg-gray-200 rounded mx-auto w-16 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded mx-auto w-12"></div>
        </div>
      ))}
    </div>
  </div>
);

const MacroCardSkeleton = () => (
  <div className="p-4 text-center animate-pulse">
    <div className="h-4 bg-gray-200 rounded mx-auto w-16 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded mx-auto w-12"></div>
  </div>
);

export default function MealPlan() {
  const {
    isHighCarbDay,
    setIsHighCarbDay,
    calories,
    macros,
    highCarbDays,
    lowCardDays,
    handleMealAction,
    isLoading,
  } = useMealPlan();

  const currentPlan = isHighCarbDay ? highCarbDays : lowCardDays;
  const currentMacros = isHighCarbDay ? macros.highCarb : macros.lowCarb;

  const renderMealSection = (type: keyof MealOptions, title: string) => {
    if (isLoading) {
      return (
        <div>
          <MealCardSkeleton />
        </div>
      );
    }

    if (!currentPlan[type][0]) return null;

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <MealCard
          meal={currentPlan[type][0]}
          mealOptions={currentPlan[type]}
          onToggle={() => handleMealAction('toggle', 0, type)}
          onUpdate={(updatedMeal) => handleMealAction('update', 0, type, updatedMeal)}
          onSwitch={(newMeal) => handleMealAction('switch', 0, type, newMeal)}
        />
      </div>
    );
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
                onClick={() => setIsHighCarbDay()} // Toggled to High Carb day
                className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
              {isHighCarbDay ? "Switch to Low Carb Day" : "Switch to High Carb Day"}
            </button>
          </div>
        </div>

        {/* Macros Section */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-8">
          {isLoading ? (
            <>
              <MacroCardSkeleton />
              <MacroCardSkeleton />
              <MacroCardSkeleton />
              <MacroCardSkeleton />
            </>
          ) : (
            <>
              <MacroCard value={calories} label="Calories" />
              <MacroCard value={`${Math.round(currentMacros.protein)}g`} label="Protein" />
              <MacroCard value={`${Math.round(currentMacros.fat)}g`} label="Fat" />
              <MacroCard value={`${Math.round(currentMacros.carbs)}g`} label="Carbs" />
            </>
          )}
        </div>

        {/* Settings Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <SettingToggle
            label="Measurement Type"
            leftLabel="Metric"
            rightLabel="Imperial"
            checked={isImperial}
            onCheckedChange={setIsImperial}
          />
          <SettingToggle
            label="Weigh Ingredients"
            leftLabel="Raw"
            rightLabel="Cooked"
            checked={isCooked}
            onCheckedChange={setIsCooked}
          />
        </div> */}

        {/* Meal Plan */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {renderMealSection('breakfast_options', 'Breakfast')}
            {renderMealSection('lunch_options', 'Lunch')}
            {renderMealSection('dinner_options', 'Dinner')}
            {renderMealSection('snacks', 'Snack')}
          </div>
        </div>
      </main>
    </div>
  );
}