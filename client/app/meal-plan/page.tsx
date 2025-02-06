"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ChevronDown, Info, ReplaceIcon as SwapIcon, Utensils } from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import React from "react"
import { Input } from "@/components/ui/input"

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

const MealCard = ({ meal, onToggle }: { meal: Meal; onToggle: () => void }) => {
  const [ingredients, setIngredients] = React.useState(meal.ingredients);
  const [sides, setSides] = React.useState(meal.sides || []);

  const handleIngredientAmountChange = (index: number, newAmount: string) => {
    setIngredients(prev => prev.map((ing, i) => 
      i === index ? { ...ing, amount: newAmount } : ing
    ));
  };

  const handleSideAmountChange = (index: number, newAmount: string) => {
    setSides(prev => prev.map((side, i) => 
      i === index ? { ...side, amount: newAmount } : side
    ));
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Meal Header */}
        <div className="p-4 flex items-start gap-4">
          <Image
            src={meal.image || "/placeholder.svg"}
            alt={meal.title}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-500">{meal.type}</div>
            <div className="font-semibold text-lg">{meal.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Utensils className="h-4 w-4" />
            </Button>
            <Switch onCheckedChange={onToggle} />
            <Button className="bg-red-500 hover:bg-red-600">SELECT</Button>
          </div>
        </div>

        {/* Ingredients */}
        <div className="p-4">
          <div className="grid gap-3">
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.name} className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                <div className="w-24">
                  <Input
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientAmountChange(index, e.target.value)}
                    className="h-8 text-center"
                  />
                </div>
                <span className="flex-1">{ingredient.name}</span>
                <Image
                  src={ingredient.image || "/placeholder.svg"}
                  alt={ingredient.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>

          {meal.sides && (
            <>
              <div className="my-4">
                <div className="bg-pink-100 py-2 px-4 text-center text-pink-700 font-medium">On the Side</div>
              </div>
              <div className="grid gap-3">
                {sides.map((ingredient, index) => (
                  <div key={ingredient.name} className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                    <Button variant="ghost" size="icon" className="shrink-0" onClick={() => console.log(`Replace side ${index}`)}>
                      <SwapIcon className="h-4 w-4" />
                    </Button>
                    <div className="w-24">
                      <Input
                        value={ingredient.amount}
                        onChange={(e) => handleSideAmountChange(index, e.target.value)}
                        className="h-8 text-center"
                      />
                    </div>
                    <span className="flex-1">{ingredient.name}</span>
                    <Image
                      src={ingredient.image || "/placeholder.svg"}
                      alt={ingredient.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Macros */}
        <div className="grid grid-cols-4 divide-x border-t">
          {Object.entries(meal.macros).map(([key, value]) => (
            <div key={key} className="p-4 text-center">
              <div className="text-sm font-medium text-red-500 uppercase">{key}</div>
              <div className="text-xl font-bold">
                {value}
                {key !== "calories" && "g"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function MealPlan() {
  const [isImperial, setIsImperial] = React.useState(false);
  const [isCooked, setIsCooked] = React.useState(false);
  const [dayTypes, setDayTypes] = React.useState<DayType[]>([
    { name: "WORKOUT DAYS", active: true, description: "Days when you have planned workouts" },
    { name: "REST DAYS", active: false, description: "Recovery days between workouts" },
    { name: "FREE DAYS", active: false, description: "Flexible eating days" },
  ]);

  const handleDayTypeClick = (clickedName: string) => {
    setDayTypes(prev => 
      prev.map(type => ({
        ...type,
        active: type.name === clickedName
      }))
    );
  };

  const macros: Macro[] = [
    { label: "Calories", value: "2586" },
    { label: "Proteins", value: "229g" },
    { label: "Carbs", value: "149g" },
    { label: "Fats", value: "127g" },
    { label: "Water", value: "3.5L" },
  ];

  const meals: Meal[] = [
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
      sides: [{ amount: "312g", name: "Strawberries", image: "/placeholder.svg" }],
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
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-pink-50 pb-20 overflow-y-auto">
        <main className="container py-6 max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">MACROS & MEAL PLAN</h1>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <p>(Your Meal Plan & Macros are due to Update in 7 Days)</p>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your plan will be automatically updated</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Day Type Selection */}
          <div className="mb-8">
            <p className="text-center text-lg text-gray-600 mb-4">
              Select an option below based on your plans for the day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dayTypes.map((type) => (
                <Button
                  key={type.name}
                  variant={type.active ? "default" : "outline"}
                  className={`h-auto py-4 ${type.active ? "bg-red-500 hover:bg-red-600" : ""}`}
                  onClick={() => handleDayTypeClick(type.name)}
                >
                  {type.name}
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 ml-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{type.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </Button>
              ))}
            </div>
          </div>

          {/* Macros Section */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {macros.map((macro) => (
              <Card key={macro.label} className="relative">
                <CardContent className="p-4 text-center">
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Daily {macro.label} target</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="text-2xl font-bold text-red-500">{macro.value}</div>
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
                      <span className={`text-sm ${!isImperial ? "text-red-500 font-medium" : "text-gray-500"}`}>
                        Metric
                      </span>
                      <Switch checked={isImperial} onCheckedChange={setIsImperial} />
                      <span className={`text-sm ${isImperial ? "text-red-500 font-medium" : "text-gray-500"}`}>
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
                      <span className={`text-sm ${!isCooked ? "text-red-500 font-medium" : "text-gray-500"}`}>Raw</span>
                      <Switch checked={isCooked} onCheckedChange={setIsCooked} />
                      <span className={`text-sm ${isCooked ? "text-red-500 font-medium" : "text-gray-500"}`}>Cooked</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shopping List Banner */}
          <Card className="bg-pink-100 border-pink-200 mb-8">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Super charge your health!</h2>
                  <p className="text-gray-600 mb-4">Feel better & fill your nutritional gaps with our supplements</p>
                  <div className="space-y-2">
                    <Button className="w-full md:w-auto bg-pink-500 hover:bg-pink-600">
                      Add to Shopping list <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      Shop Now
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aASaiHsvDnMrwcA4v8UlOvTDgXrlRv.png"
                    alt="Collagen Supplement"
                    width={200}
                    height={300}
                    className="ml-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal Plan */}
          <div className="space-y-6">
            {meals.map((meal, index) => (
              <MealCard 
                key={meal.title} 
                meal={meal} 
                onToggle={() => console.log(`Toggled meal ${index}`)} 
              />
            ))}
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}

