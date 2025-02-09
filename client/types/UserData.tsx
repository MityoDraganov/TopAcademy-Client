export interface UserRegisterFormData {
    username: string
    first_name: string
    last_name: string
    email: string
    age: number
    height: number
    weight: number
    gender: "male" | "female" | "other"
    goal: "lose_weight" | "gain_weight" | "maintain_weight" | "build_muscle"
    activity_level: "sedentary" | "lightly_active" | "moderately_active" | "very_active" | "extremely_active"
    dietary_preference: "none" | "vegetarian" | "vegan" | "pescatarian" | "keto" | "paleo"
    allergies: string
    excluded_foods: string
    meals_per_day: number
    password: string
    confirmPassword: string
  }


  export interface UserRegisterFormDataModified {
    clerk_id: string
    username: string
    first_name: string
    last_name: string
    email: string
    age: number
    height: number
    weight: number
    gender: "male" | "female" | "other"
    goal: "lose_weight" | "gain_weight" | "maintain_weight" | "build_muscle"
    activity_level: "sedentary" | "lightly_active" | "moderately_active" | "very_active" | "extremely_active"
    dietary_preference: "none" | "vegetarian" | "vegan" | "pescatarian" | "keto" | "paleo"
    allergies: string[]
    excluded_foods: string[]
    meals_per_day: number
    password: string
    confirmPassword: string
  }

  export type UserUpdateData = Omit<UserRegisterFormDataModified, 'password' | 'confirmPassword'> & {
    password?: string;
    confirmPassword?: string;
  }

  export interface UserLoginFormData {
    email: string
    password: string
  }


  
  
  