"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Ingredient } from "@/types/Recepie";
import IngridientInput from "./components/IngridientInput";
import { createRecipe } from "@/app/api/requests/recipies";

interface Macros {
	fat: number;
	carbs: number;
	protein: number;
}

interface Recipe {
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

const existingIngridiens: Ingredient[] = [
	{ name: "apple", weight: 100, id: 1 },
	{ name: "banana", weight: 100, id: 2 },
	{ name: "carrot", weight: 100, id: 3 },
	{ name: "cheese", weight: 100, id: 4 },
	{ name: "chocolate", weight: 100, id: 5 },
	{ name: "milk", weight: 100, id: 6 },
	{ name: "egg", weight: 100, id: 7 },
	{ name: "flour", weight: 100, id: 8 },
	{ name: "sugar", weight: 100, id: 9 },
	{ name: "water", weight: 100, id: 10 },
];

export default function AdminRecipesPage() {
	const [recipe, setRecipe] = useState<Recipe>({
		label: "",
		image: "",
		ingredients: [{ name: "", weight: 0 }],
		calories: 0,
		macros: { fat: 0, carbs: 0, protein: 0 },
		mealType: "snack",
		labels: [],
		servings: 1,
		prepTime: 0,
		instructions: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Partial<Record<keyof Recipe, string>>>(
		{}
	);

	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestions, setSuggestions] = useState<Ingredient[]>([]);
	const [focusedIngredientIndex, setFocusedIngredientIndex] = useState<
		number | null
	>(null);
	const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

	const updateRecipe = (field: keyof Recipe, value: any) => {
		setRecipe((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: "" }));
	};

	const addIngredient = () => {
		setRecipe((prev) => ({
			...prev,
			ingredients: [...prev.ingredients, { name: "", weight: 0 }],
		}));
	};

	const updateIngredient = (
		index: number,
		field: keyof Ingredient,
		value: string | number
	) => {
		const newIngredients = [...recipe.ingredients];
		newIngredients[index] = { ...newIngredients[index], [field]: value };
		updateRecipe("ingredients", newIngredients);
	};

	const removeIngredient = (index: number) => {
		const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
		updateRecipe("ingredients", newIngredients);
	};

	const validateForm = (): boolean => {
		const newErrors: Partial<Record<keyof Recipe, string>> = {};

		if (!recipe.label) newErrors.label = "Recipe name is required";
		if (!recipe.image) newErrors.image = "Image URL is required";
		if (recipe.ingredients.length === 0)
			newErrors.ingredients = "At least one ingredient is required";
		if (recipe.calories <= 0)
			newErrors.calories = "Calories must be a positive number";
		if (recipe.labels.length === 0)
			newErrors.labels = "At least one label is required";
		if (recipe.servings <= 0)
			newErrors.servings = "Servings must be a positive number";
		if (recipe.prepTime <= 0)
			newErrors.prepTime = "Prep time must be a positive number";
		if (!recipe.instructions)
			newErrors.instructions = "Instructions are required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);
		// Here you would typically send the data to your API
		console.log(recipe);
		await createRecipe(recipe);
		setIsSubmitting(false);
		setRecipe({
			label: "",
			image: "",
			ingredients: [{ name: "", weight: 0 }],
			calories: 0,
			macros: { fat: 0, carbs: 0, protein: 0 },
			mealType: "snack",
			labels: [],
			servings: 1,
			prepTime: 0,
			instructions: "",
		});
	};

	const filterSuggestions = (value: string) => {
		const filtered = existingIngridiens.filter((ingredient) =>
			ingredient.name.toLowerCase().includes(value.toLowerCase())
		);
		setSuggestions(filtered);
		setShowSuggestions(filtered.length > 0);
	};

	const handleIngredientChange = (index: number, value: string) => {
		updateIngredient(index, "name", value);
		filterSuggestions(value);
		setFocusedIngredientIndex(index);
	};

	const handleSuggestionClick = (suggestion: Ingredient) => {
		if (focusedIngredientIndex !== null) {
			const newIngredients = [...recipe.ingredients];
			newIngredients[focusedIngredientIndex] = { ...suggestion }; // Update entire object
			updateRecipe("ingredients", newIngredients);
			setShowSuggestions(false);
		}
	};
	

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionRefs.current.every(
					(ref) => ref && !ref.contains(event.target as Node)
				)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="h-screen pt-2 pb-10 overflow-y-auto">
			<Card className="w-full max-w-4xl mx-auto">
				<CardHeader className="py-5 pb-1">
					<CardTitle>Add New Recipe</CardTitle>
					<CardDescription>
						Create a new recipe for the meal tracker app.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="flex flex-col gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Recipe Name
							</label>
							<Input
								placeholder="e.g., Healthy Apple Snack"
								value={recipe.label}
								onChange={(e) =>
									updateRecipe("label", e.target.value)
								}
							/>
							{errors.label && (
								<p className="mt-1 text-sm text-red-600">
									{errors.label}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Image URL
							</label>
							<Input
								placeholder="http://example.com/images/recipe.jpg"
								value={recipe.image}
								onChange={(e) =>
									updateRecipe("image", e.target.value)
								}
							/>
							{errors.image && (
								<p className="mt-1 text-sm text-red-600">
									{errors.image}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Ingredients
							</label>
							{recipe.ingredients.map((ingredient, index) => (
								<div
									key={index}
									className="flex items-end gap-4 mt-2 relative"
								>
									<IngridientInput 
										ingredient={ingredient}
										index={index}
										handleIngredientChange={handleIngredientChange}
										setFocusedIngredientIndex={setFocusedIngredientIndex}
										showSuggestions={showSuggestions}
										focusedIngredientIndex={focusedIngredientIndex}
										suggestions={suggestions}
										handleSuggestionClick={handleSuggestionClick}
										suggestionRefs={suggestionRefs}
									/>
									<div>
										<Input
											type="number"
											placeholder="Weight (g)"
											value={ingredient.weight || ""}
											onChange={(e) =>
												updateIngredient(
													index,
													"weight",
													Number.parseFloat(
														e.target.value
													)
												)
											}
										/>
									</div>
									<Button
										type="button"
										variant="outline"
										size="icon"
										onClick={() => removeIngredient(index)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							))}
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="mt-2"
								onClick={addIngredient}
							>
								<Plus className="h-4 w-4 mr-2" /> Add Ingredient
							</Button>
							{errors.ingredients && (
								<p className="mt-1 text-sm text-red-600">
									{errors.ingredients}
								</p>
							)}
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Calories
								</label>
								<Input
									type="number"
									value={recipe.calories || ""}
									onChange={(e) =>
										updateRecipe(
											"calories",
											Number.parseFloat(e.target.value)
										)
									}
								/>
								{errors.calories && (
									<p className="mt-1 text-sm text-red-600">
										{errors.calories}
									</p>
								)}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Servings
								</label>
								<Input
									type="number"
									value={recipe.servings || ""}
									onChange={(e) =>
										updateRecipe(
											"servings",
											Number.parseInt(e.target.value)
										)
									}
								/>
								{errors.servings && (
									<p className="mt-1 text-sm text-red-600">
										{errors.servings}
									</p>
								)}
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Macros
							</label>
							<div className="grid grid-cols-3 gap-4 mt-2">
								<Input
									type="number"
									placeholder="Fat (g)"
									value={recipe.macros.fat || ""}
									onChange={(e) =>
										updateRecipe("macros", {
											...recipe.macros,
											fat: Number.parseFloat(
												e.target.value
											),
										})
									}
								/>
								<Input
									type="number"
									placeholder="Carbs (g)"
									value={recipe.macros.carbs || ""}
									onChange={(e) =>
										updateRecipe("macros", {
											...recipe.macros,
											carbs: Number.parseFloat(
												e.target.value
											),
										})
									}
								/>
								<Input
									type="number"
									placeholder="Protein (g)"
									value={recipe.macros.protein || ""}
									onChange={(e) =>
										updateRecipe("macros", {
											...recipe.macros,
											protein: Number.parseFloat(
												e.target.value
											),
										})
									}
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Meal Type
							</label>
							<Select
								value={recipe.mealType}
								onValueChange={(value) =>
									updateRecipe("mealType", value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a meal type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="breakfast">
										Breakfast
									</SelectItem>
									<SelectItem value="lunch">Lunch</SelectItem>
									<SelectItem value="dinner">
										Dinner
									</SelectItem>
									<SelectItem value="snack">Snack</SelectItem>
									<SelectItem value="brunch">
										Brunch
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Prep Time (minutes)
							</label>
							<Input
								type="number"
								value={recipe.prepTime || ""}
								onChange={(e) =>
									updateRecipe(
										"prepTime",
										Number.parseInt(e.target.value)
									)
								}
							/>
							{errors.prepTime && (
								<p className="mt-1 text-sm text-red-600">
									{errors.prepTime}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Instructions
							</label>
							<Textarea
								placeholder="Enter recipe instructions"
								value={recipe.instructions}
								onChange={(e) =>
									updateRecipe("instructions", e.target.value)
								}
								rows={5}
							/>
							{errors.instructions && (
								<p className="mt-1 text-sm text-red-600">
									{errors.instructions}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Labels
							</label>
							<Textarea
								placeholder="Enter labels separated by commas (e.g., healthy, fruit, quick)"
								value={recipe.labels.join(", ")}
								onChange={(
									e: React.ChangeEvent<HTMLTextAreaElement>
								) => {
									const labels = e.target.value
										.split(",")
										.map((label: string) => label.trim())
										.filter(Boolean);
									updateRecipe("labels", labels);
								}}
							/>
							<div className="mt-2">
								{recipe.labels.map((label, index) => (
									<Badge
										key={index}
										variant="secondary"
										className="mr-2 mb-2"
									>
										{label}
									</Badge>
								))}
							</div>
							{errors.labels && (
								<p className="mt-1 text-sm text-red-600">
									{errors.labels}
								</p>
							)}
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving Recipe
								</>
							) : (
								"Save Recipe"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
