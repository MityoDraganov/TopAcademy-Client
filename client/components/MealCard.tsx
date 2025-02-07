"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import Image from "next/image";
import React from "react";
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
import { Meal, Ingredient } from "@/types/WeeklyPlan";


interface MealCardProps {
  meal: Meal;
  onToggle: () => void;
  onUpdate: (updatedMeal: Meal) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onToggle, onUpdate }) => {
  const [ingredients, setIngredients] = React.useState(meal.ingredients);
  const [sides, setSides] = React.useState(meal.sides || []);
  const [selectedMeal, setSelectedMeal] = React.useState<number | null>(null);
  const [showAllIngredients, setShowAllIngredients] = React.useState(false);

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
    <Card className="overflow-hidden border shadow-md my-4 sm:mx-0" key={meal.label}>
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
            <div className="text-sm font-medium text-gray-500">{meal.type}</div>
            <div className="text-lg font-semibold">{meal.label}</div>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Utensils className="h-4 w-4 text-gray-500" />

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Switch
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[30vw]">
                <DialogHeader>
                  <DialogTitle className="text-red-500 text-xl sm:text-2xl font-bold">
                    SELECT YOUR MEAL
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 bg-red-500/10 p-2 sm:p-4 h-[50vh] sm:h-[43vh] rounded-lg overflow-y-auto">
                  {/* Placeholder meal items */}
                  {Array.from({ length: 9 }).map((_, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`p-0 h-auto relative flex flex-col ${
                        selectedMeal === index ? "ring-2 ring-red-500" : ""
                      }`}
                      onClick={() => setSelectedMeal(index)}
                    >
                      <div className="flex flex-col">
                        <Image
                          src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
                          alt={`Alternative meal option ${index + 1}`}
                          width={150}
                          height={150}
                          className="rounded-t-lg object-cover w-full h-[80px] sm:h-[120px]"
                        />
                        <div className="p-1 sm:p-2 text-xs sm:text-sm font-medium text-gray-700 bg-white rounded-b-lg w-full flex items-center justify-center text-center">
                          Chorizo
                        </div>
                      </div>
                      {selectedMeal === index && (
                        <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <div className="bg-red-500 text-white rounded-full p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-4 sm:w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
                <DialogFooter>
                  <DialogClose className="w-full" disabled={selectedMeal === null}>
                    <Button
                      type="submit"
                      className="w-full py-3 sm:py-5 text-sm sm:text-md font-semibold"
                      disabled={selectedMeal === null}
                      onClick={() => {
                        setSelectedMeal(null);
                      }}
                    >
                      Save changes
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
            {(showAllIngredients ? ingredients : ingredients.slice(0, 3)).map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg border"
              >
                <div className="w-24">
                  <Input
                    value={Math.round(ingredient.weight) + "g"}
                    onChange={(e) =>
                      handleIngredientAmountChange(index, e.target.value)
                    }
                    className="h-8 text-center focus:ring-2 focus:ring-red-400"
                  />
                </div>
                <span className="flex-1 text-sm">{ingredient.food}</span>
              </div>
            ))}
          </div>

          {ingredients.length > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllIngredients(!showAllIngredients)}
              className="w-full mt-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              {showAllIngredients ? 'Show Less' : `Show ${ingredients.length - 3} More Ingredients`}
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
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x border-t">
          {Object.entries(meal.macros).map(([key, value]) => (
            <div key={key} className="p-3 sm:p-4 text-center">
              <div className="text-sm font-medium text-red-500 uppercase">
                {key}
              </div>
              <div className="text-xl font-bold">
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
