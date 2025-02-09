"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Utensils } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Meal } from "@/types/WeeklyPlan";
import { useEffect } from "react";
import { useState } from "react";

interface MealCardProps {
  meal: Meal;
  mealOptions: Meal[];
  onToggle: () => void;
  onUpdate: (updatedMeal: Meal) => void;
  onSwitch: (newMeal: Meal) => void;
}

const MealCard: React.FC<MealCardProps> = ({
  meal,
  mealOptions,
  onToggle,
  onUpdate,
  onSwitch,
}) => {
  const [ingredients, setIngredients] = useState(meal.ingredients);
  const [sides, setSides] = useState(meal.sides || []);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showAllIngredients, setShowAllIngredients] = useState(false);

  useEffect(() => {
    setIngredients(meal.ingredients);
    setSides(meal.sides || []);
  }, [meal]);

  const handleIngredientAmountChange = (index: number, newAmount: string) => {
    const updatedIngredients = ingredients.map((ing, i) =>
      i === index ? { ...ing, amount: newAmount } : ing
    );
    setIngredients(updatedIngredients);
    onUpdate({
      ...meal,
      ingredients: updatedIngredients,
      sides: sides,
    });
  };

  const handleSideAmountChange = (index: number, newAmount: string) => {
    const updatedSides = sides.map((side, i) =>
      i === index ? { ...side, amount: newAmount } : side
    );
    setSides(updatedSides);
    onUpdate({
      ...meal,
      ingredients: ingredients,
      sides: updatedSides,
    });
  };

  return (
    <Card
      className="overflow-hidden border shadow-md my-4 sm:mx-0"
      key={meal.label}
    >
      <CardContent className="p-0">
        {/* Meal Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 sm:p-4 border-b">
          <Image
            src={meal.image || "/placeholder.svg"}
            alt={meal.label}
            width={100}
            height={100}
            className="rounded-lg object-cover w-full sm:w-auto h-[200px] sm:h-[100px]"
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="text-sm font-medium text-gray-500">
              {meal.dishType[0]}
            </div>
            <div className="text-lg font-semibold">{meal.label}</div>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Utensils className="h-4 w-4 text-gray-500" />

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="lg"
                  className="font-semibold"
                >
                  Switch Meal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold tracking-tight text-destructive">
                    Select Your {meal.dishType[0].toUpperCase()}
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-destructive/5 p-4 rounded-lg max-h-[60vh] overflow-y-auto">
                  {mealOptions
                    .filter((option) => option.label !== meal.label)
                    .map((option, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className={`group p-0 h-auto hover:bg-destructive/10 transition-all ${
                          selectedMeal?.label === option.label
                            ? "ring-2 ring-destructive ring-offset-2"
                            : ""
                        }`}
                        onClick={() => setSelectedMeal(option)}
                      >
                        <div className="flex flex-col w-full space-y-2">
                          <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                            <Image
                              src={option.image || "/placeholder.svg"}
                              alt={option.label}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                              sizes="(max-width: 768px) 150px, 200px"
                            />
                            {selectedMeal?.label === option.label && (
                              <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
                                <div className="bg-destructive text-destructive-foreground rounded-full p-2">
                                  <Check className="h-5 w-5" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="px-3 py-2 text-sm font-medium text-foreground line-clamp-3">
                            {option.label}
                          </div>
                        </div>
                      </Button>
                    ))}
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      size="lg"
                      className="w-full font-semibold"
                      disabled={!selectedMeal}
                      onClick={() => {
                        if (selectedMeal) {
                          onSwitch(selectedMeal);
                          setSelectedMeal(null);
                        }
                      }}
                    >
                      Confirm Selection
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Ingredients */}
        <div className="p-3 sm:p-4">
          <div className="grid gap-3">
            {(showAllIngredients ? ingredients : ingredients.slice(0, 3)).map(
              (ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg border"
                >
                  <div className="w-24">
                    <Input
                      value={Math.round(ingredient.weight)}
                      readOnly={true}
                      onChange={(e) =>
                        handleIngredientAmountChange(index, e.target.value)
                      }
                      className="h-8 text-center focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <span className="flex-1 text-sm">{ingredient.food}</span>
                </div>
              )
            )}
          </div>

          {ingredients.length > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllIngredients(!showAllIngredients)}
              className="w-full mt-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              {showAllIngredients
                ? "Show Less"
                : `Show ${ingredients.length - 3} More Ingredients`}
            </Button>
          )}

          {meal.sides && (
            <>
              <div className="my-4">
                <div className="bg-pink-100 py-2 px-4 text-center text-pink-700 font-medium rounded-t-lg">
                  On the Side
                </div>
              </div>
              <div className="grid gap-3">
                {sides.map((ingredient, index) => (
                  <div
                    key={ingredient.food}
                    className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg border"
                  >
                    <div className="w-24">
                      <Input
                        value={Math.round(ingredient.weight)}
                        onChange={(e) =>
                          handleSideAmountChange(index, e.target.value)
                        }
                        className="h-8 text-center focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <span className="flex-1 text-sm">{ingredient.food}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 divide-x border-t">
          {Object.entries(meal.macros).map(([key, value]) => (
            <div key={key} className="p-4 text-center">
              <div className="text-sm font-medium text-destructive uppercase tracking-wider">
                {key}
              </div>
              <div className="text-xl font-bold mt-1">
                {Math.round(value)}
                {key !== "calories" && "g"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
