import { UserFormData } from "@/types/UserData";
import { create } from "zustand";



interface RegisterFormStore {
  formData: UserFormData;
  updateForm: (field: keyof UserFormData, value: any) => void;
  resetForm: () => void;
}

export const useRegisterFormStore = create<RegisterFormStore>((set) => ({
  formData: {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    age: 25,
    height: 170,
    weight: 70,
    gender: "male",
    goal: "lose_weight",
    activity_level: "moderately_active",
    dietary_preference: "none",
    allergies: [],
    excluded_foods: [],
    meals_per_day: 3,
  },
  updateForm: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  resetForm: () =>
    set(() => ({
      formData: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        age: 25,
        height: 170,
        weight: 70,
        gender: "male",
        goal: "lose_weight",
        activity_level: "moderately_active",
        dietary_preference: "none",
        allergies: [],
        excluded_foods: [],
        meals_per_day: 3,
      },
    })),
}));
