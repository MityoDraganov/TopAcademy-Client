import { Meal } from "@/types/WeeklyPlan";

export type MealOptions = {
  breakfast_options: Meal[];
  lunch_options: Meal[];
  dinner_options: Meal[];
  snacks: Meal[];
};

export type MacrosType = {
  highCarb: {
    protein: number;
    fat: number;
    carbs: number;
  };
  lowCarb: {
    protein: number;
    fat: number;
    carbs: number;
  };
};