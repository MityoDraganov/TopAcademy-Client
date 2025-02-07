import { UserRegisterFormData, UserLoginFormData } from "@/types/UserData";
import { create } from "zustand";

interface RegisterFormStore {
	formData: UserRegisterFormData;
	updateForm: (field: keyof UserRegisterFormData, value: any) => void;
	resetForm: () => void;
}

interface LoginFormStore {
	formData: UserLoginFormData;
	updateForm: (field: keyof UserLoginFormData, value: any) => void;
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
		allergies: "",
		excluded_foods: "",
		meals_per_day: 3,
		confirmPassword: "",
		password: "",
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
				allergies: "",
				excluded_foods: "",
				meals_per_day: 3,
				confirmPassword: "",
				password: "",
			},
		})),
}));

export const useLoginFormStore = create<LoginFormStore>((set) => ({
	formData: {
		email: "",
		password: "",
	},
	updateForm: (field, value) =>
		set((state) => ({
			formData: { ...state.formData, [field]: value },
		})),
	resetForm: () =>
		set(() => ({
			formData: {
				email: "",
				password: "",
			},
		})),
}));
