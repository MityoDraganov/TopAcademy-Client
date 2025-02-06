"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  ChevronDown,
  Info,
  ReplaceIcon as SwapIcon,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Input } from "@/components/ui/input";
import MealCard from "@/components/MealCard";

interface Ingredient {
  amount: string;
  name: string;
  image: string;
}

interface Meal {
  type: string;
  title: string;
  image: string;
  ingredients: Ingredient[];
  sides?: Ingredient[];
  macros: {
    calories: string;
    carbs: string;
    protein: string;
    fat: string;
  };
}

interface DayType {
  name: string;
  active: boolean;
  description: string;
}

interface Macro {
  label: string;
  value: string;
}

export default function MealPlan() {
  const [isImperial, setIsImperial] = React.useState(false);
  const [isCooked, setIsCooked] = React.useState(false);

  const [macros, setMacros] = React.useState<Macro[]>([
    { label: "Calories", value: "2586" },
    { label: "Proteins", value: "229g" },
    { label: "Carbs", value: "149g" },
    { label: "Fats", value: "127g" },
    { label: "Water", value: "3.5L" },
  ]);

  const [meals, setMeals] = React.useState<Meal[]>([
    {
      type: "BREAKFAST",
      title: "Egg & Ham Breakfast Dish with Fruit",
      image: "/placeholder.svg?height=100&width=100",
      ingredients: [
        { amount: "156g", name: "Leg Ham", image: "/placeholder.svg" },
        { amount: "4", name: "Eggs", image: "/placeholder.svg" },
        { amount: "74g", name: "Spinach", image: "/placeholder.svg" },
        { amount: "68g", name: "Tomatoes", image: "/placeholder.svg" },
        { amount: "81g", name: "Mushrooms", image: "/placeholder.svg" },
      ],
      sides: [
        { amount: "312g", name: "Strawberries", image: "/placeholder.svg" },
      ],
      macros: {
        calories: "558",
        carbs: "41",
        protein: "56",
        fat: "22",
      },
    },
    {
      type: "LUNCH",
      title: "Chicken With Almonds, Carrot and Mushroom",
      image: "/placeholder.svg?height=100&width=100",
      ingredients: [
        { amount: "200g", name: "Chicken Breast", image: "/placeholder.svg" },
        { amount: "30g", name: "Almonds", image: "/placeholder.svg" },
        { amount: "100g", name: "Carrots", image: "/placeholder.svg" },
        { amount: "100g", name: "Mushrooms", image: "/placeholder.svg" },
      ],
      macros: {
        calories: "450",
        carbs: "15",
        protein: "48",
        fat: "25",
      },
    },
  ]);

  const handleMealToggle = (index: number) => {
    console.log(`Toggled meal ${index}`);
  };

  const handleMealUpdate = (index: number, updatedMeal: Meal) => {
    setMeals((prev) =>
      prev.map((meal, i) => (i === index ? updatedMeal : meal))
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
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <p>(Your Meal Plan & Macros are due to Update in 7 Days)</p>
          </div>
        </div>

        {/* Macros Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {macros.map((macro) => (
            <Card key={macro.label} className="relative">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {macro.value}
                </div>
                <div className="text-sm text-gray-600">{macro.label}</div>
              </CardContent>
            </Card>
          ))}
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
          {meals.map((meal, index) => (
            <MealCard
              key={meal.title}
              meal={meal}
              onToggle={() => handleMealToggle(index)}
              onUpdate={(updatedMeal) => handleMealUpdate(index, updatedMeal)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
