export interface WeeklyPlanResponse {
  high_carb_days: {
    breakfast_options: Meal[];
    lunch_options: Meal[];
    dinner_options: Meal[];
    snacks: Meal[];
  };
  low_carb_days: {
    breakfast_options: Meal[];
    lunch_options: Meal[];
    dinner_options: Meal[];
    snacks: Meal[];
  };
  high_carb_day_macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
  low_carb_day_macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
  daily_calories: number;
}

export interface Ingredient {
  food: string;
  weight: number;
}

export interface Meal {
  label: string;
  image: string;
  alt?: string;
  ingredients: Ingredient[];
  sides?: Ingredient[];
  selected?: boolean;
  calories?: number;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
  dishType: string[];
  mealType: string[];
  cuisineType: string[];
}
