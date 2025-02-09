export interface Ingredient {
	food: string;
	weight: number;
}

export interface Macros {
	fat: number;
	carbs: number;
	protein: number;
}

export interface Recipe {
	label: string;
	image: string;
	ingredients: Ingredient[];
	calories: number;
	macros: Macros;
	mealType: "breakfast" | "lunch" | "dinner" | "snack" | "brunch";
	labels: string[];
	servings: number;
	prepTime: number; // in minutes
	instructions: string;
}
