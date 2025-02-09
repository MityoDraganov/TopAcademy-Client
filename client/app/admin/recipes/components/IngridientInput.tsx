import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Ingredient } from "@/types/Recepie";
import { BadgeCheck } from "lucide-react";

export default function IngridientInput({
	ingredient,
	index,
	handleIngredientChange,
	setFocusedIngredientIndex,
	showSuggestions,
	focusedIngredientIndex,
	suggestions,
	handleSuggestionClick,
	suggestionRefs,
}: {
	ingredient: Ingredient;
	index: number;
	handleIngredientChange: (index: number, value: string) => void;
	setFocusedIngredientIndex: (index: number) => void;
	showSuggestions: boolean;
	focusedIngredientIndex: number | null;
	suggestions: Ingredient[];
	handleSuggestionClick: (suggestion: Ingredient) => void;
	suggestionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
	return (
		<div className="flex-grow">
			<div className="relative w-full">
				<Input
					className="pr-10" // Add padding to prevent text overlap
					placeholder="Ingredient name"
					value={ingredient.name}
					onChange={(e) =>
						handleIngredientChange(index, e.target.value)
					}
					onFocus={() => setFocusedIngredientIndex(index)}
				/>
				{ingredient.id && (
					<BadgeCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400" />
				)}
			</div>

			{showSuggestions && focusedIngredientIndex === index && (
				<div
					ref={(el) => {
						if (el) {
							suggestionRefs.current[index] = el;
						}
					}}
					className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
				>
					<Command>
						<CommandInput placeholder="Search ingredients..." />
						<CommandList>
							<CommandEmpty>No ingredients found.</CommandEmpty>
							<CommandGroup>
								{suggestions.map((suggestion) => (
									<CommandItem
										key={suggestion.name}
										onSelect={() =>
											handleSuggestionClick(suggestion)
										}
									>
										{suggestion.name}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
			)}
		</div>
	);
}
