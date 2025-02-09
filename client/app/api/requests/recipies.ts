import * as api from "@/app/api/api"
import { Recipe } from "@/types/Recepie"

const endpoints = {
    recipes: "/recipes",
}

export const createRecipe = async (recipeData: Recipe) => {
    return api.post(endpoints.recipes, recipeData)
}