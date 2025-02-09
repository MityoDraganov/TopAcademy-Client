"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DietaryPreferencesCard } from "./components/DietaryPrefrencesCard";
import { HealthFitnessCard } from "./components/HealthFitnessCard";
import { getUser } from "../api/requests/auth";
import { useUser } from "@clerk/nextjs";
import { UserUpdateData } from "@/types/UserData";
import { updateUser } from "../api/requests/auth";
import { showSuccess } from "@/components/toast";


const dietaryOptions: [string, string][] = [
  ["none", "No Preference"],
  ["vegetarian", "Vegetarian"],
  ["vegan", "Vegan"],
  ["pescatarian", "Pescatarian"],
  ["keto", "Keto"],
  ["paleo", "Paleo"],
];

const healthGoals: [string, string][] = [
  ["lose_weight", "Lose Weight"],
  ["gain_weight", "Gain Weight"],
  ["maintain_weight", "Maintain Weight"],
  ["build_muscle", "Build Muscle"],
];

const activityLevels: [string, string][] = [
  ["sedentary", "Sedentary (little or no exercise)"],
  ["lightly_active", "Lightly Active (1-3 days/week)"],
  ["moderately_active", "Moderately Active (3-5 days/week)"],
  ["very_active", "Very Active (6-7 days/week)"],
  ["extremely_active", "Extremely Active (physical job or 2x training)"],
];

const healthConditions: [string, string][] = [
  ["none", "No Health Conditions"],
  ["hypertension", "Hypertension"],
  ["pcos", "Polycystic ovary syndrome"],
  ["ibs", "Irritable bowel syndrome"],
  ["celiac_disease", "Celiac Disease"],
  ["ckd", "Chronic Kidney Disease"],
];

export default function Settings() {
  const [formData, setFormData] = useState({
    dietary: "none",
    allergies: "",
    excludedFood: "",
    mealsPerDay: 3,
    healthGoal: "",
    activityLevel: "",
    height: 0,
    weight: 0,
    gender: "",
    age: 0,
    healthCondition: "none"
  });


  const { user } = useUser();

  useEffect(() => {
    const getUserDetails = async () => {
      if (user?.id) {
        const userDetails = await getUser(user.id);
        if (userDetails) {
          setFormData((prev) => ({
            ...prev,
            gender: userDetails.gender,
            allergies: userDetails.allergies?.join(", ") || "",
            excludedFood: userDetails.excluded_foods?.join(", ") || "",
            mealsPerDay: userDetails.meals_per_day,
            healthGoal: userDetails.goal,
            activityLevel: userDetails.activity_level,
            height: userDetails.height,
            weight: userDetails.weight,
            dietary: userDetails.dietary_preference,
            age: userDetails.age,
            healthCondition: userDetails.health_condition
          }));
        }
      }

    };

    getUserDetails();
  }, [user]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      alert("User not authenticated!");
      return;
    }

    try {
      const updateData: UserUpdateData = {
        clerk_id: user.id,
        username: user.username || "",
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        gender: formData.gender as "male" | "female" | "other",
        health_condition: formData.healthCondition as "none" | "hypertension" | "pcos" | "ibs" | "celiac_disease" | "ckd",
        goal: formData.healthGoal as "lose_weight" | "maintain_weight" | "gain_weight" | "build_muscle",
        activity_level: formData.activityLevel as "sedentary" | "lightly_active" | "moderately_active" | "very_active" | "extremely_active",
        dietary_preference: formData.dietary as "none" | "vegetarian" | "vegan" | "pescatarian" | "keto" | "paleo",
        allergies: formData.allergies ? formData.allergies.split(",").map(item => item.trim()) : [""],
        excluded_foods: formData.excludedFood ? formData.excludedFood.split(",").map(item => item.trim()) : [""],
        meals_per_day: formData.mealsPerDay
      };

      const response = await updateUser(user.id, updateData);	
      // if the response is successful show a toast
      if (response) {
          showSuccess("Settings updated successfully!");
      }


    } catch (error) {
      console.error("Error updating user settings:", error);
    }


  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <PersonalInfoCard formData={formData} handleChange={handleChange} /> */}
          <DietaryPreferencesCard
            formData={formData}
            handleChange={handleChange}
            healthConditions={healthConditions}
          />
          <HealthFitnessCard
            formData={formData}
            handleChange={handleChange}
            healthGoals={healthGoals}
            activityLevels={activityLevels}
          />

          {/* Submit */}
          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 text-md font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
