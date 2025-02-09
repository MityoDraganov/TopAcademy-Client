import { useState, useEffect } from 'react';
import { createWeeklyPlan } from "@/app/api/requests/auth";
import { WeeklyPlanResponse, Meal } from "@/types/WeeklyPlan";
import { MealOptions, MacrosType } from '../types';

export const useMealPlan = () => {
  const [isImperial, setIsImperial] = useState(false);
  const [isCooked, setIsCooked] = useState(false);
  const [isHighCarbDay, setIsHighCarbDay] = useState(true);
  const [calories, setCalories] = useState(0);
  const [highCarbDays, setHighCarbDays] = useState<MealOptions>({
    breakfast_options: [],
    lunch_options: [],
    dinner_options: [],
    snacks: [],
  });
  const [lowCardDays, setLowCardDays] = useState<MealOptions>({
    breakfast_options: [],
    lunch_options: [],
    dinner_options: [],
    snacks: [],
  });
  const [macros, setMacros] = useState<MacrosType>({
    highCarb: { protein: 0, fat: 0, carbs: 0 },
    lowCarb: { protein: 0, fat: 0, carbs: 0 },
  });

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await createWeeklyPlan() as WeeklyPlanResponse;
        if (!response) return;

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
      }
    };

    fetchMealPlan();
  }, []);

  const handleMealAction = (
    actionType: 'toggle' | 'update' | 'switch',
    mealIndex: number,
    type: keyof MealOptions,
    meal?: Meal
  ) => {
    const currentState = isHighCarbDay ? highCarbDays : lowCardDays;
    const setter = isHighCarbDay ? setHighCarbDays : setLowCardDays;
    
    const updatedMeals = {
      ...currentState,
      [type]: currentState[type].map((m, i) => 
        i === mealIndex 
          ? actionType === 'toggle' 
            ? { ...m, selected: !m.selected }
            : meal || m
          : m
      ),
    };
    
    setter(updatedMeals);
  };

  const handleDaySwitch = () => {
    setIsHighCarbDay((prev) => !prev);
  };

  return {
    isImperial,
    setIsImperial,
    isCooked,
    setIsCooked,
    isHighCarbDay,
    setIsHighCarbDay: handleDaySwitch,
    calories,
    macros,
    highCarbDays,
    lowCardDays,
    handleMealAction,
  };
};