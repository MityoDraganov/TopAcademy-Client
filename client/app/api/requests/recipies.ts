import * as api from "@/app/api/api";
import { Ingredient, Recipe } from "@/types/Recepie";

const endpoints = {
	recipes: "/recipes",
	products: "/products",
};

export const createRecipe = async (recipeData: Recipe) => {
	return api.post(endpoints.recipes, recipeData, "formData");
};
export const getIngredients = async (): Promise<Ingredient[]> => {
	const ingredients = (await api.get(endpoints.products)) as Ingredient[];
	return Array.isArray(ingredients) ? ingredients : [];
};
