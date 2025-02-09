import { useState, useRef, MutableRefObject } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

const existingLabels = [
	"dairyFree",
	"glutenFree",
	"lowCarb",
	"highCarb",
	"lowSodium",
	"lowFODMAP",
];

export default function LabelsInput({
	labels,
	setLabels,
}: {
	labels: string[];
	setLabels: (labels: string[]) => void;
}) {
	const [inputValue, setInputValue] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
		existingLabels
	);
	const suggestionRefs: MutableRefObject<(HTMLDivElement | null)[]> = useRef(
		[]
	);

	const handleInputChange = (value: string) => {
		setInputValue(value);
		if (value) {
			const filtered = existingLabels.filter((label) =>
				label.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredSuggestions(filtered);
		} else {
			setFilteredSuggestions(existingLabels);
		}
		setShowSuggestions(true);
	};

	const handleSuggestionClick = (suggestion: string) => {
		if (!labels.includes(suggestion)) {
			setLabels([...labels, suggestion]);
		}
		setInputValue("");
		setShowSuggestions(false);
	};

	const handleAddLabel = () => {
		if (inputValue.trim() && !labels.includes(inputValue.trim())) {
			setLabels([...labels, inputValue.trim()]);
		}
		setInputValue("");
	};

	const removeLabel = (index: number) => {
		setLabels(labels.filter((_, i) => i !== index));
	};

	return (
		<div>
			<div className="relative">
				<Input
					placeholder="Add label"
					value={inputValue}
					onChange={(e) => handleInputChange(e.target.value)}
					onFocus={() => setShowSuggestions(true)}
					onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
					onKeyDown={(e) => e.key === "Enter" && handleAddLabel()}
				/>
				{showSuggestions && (
					<div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
						<Command>
							<CommandInput placeholder="Search labels..." />
							<CommandList>
								<CommandEmpty>No labels found.</CommandEmpty>
								<CommandGroup>
									{filteredSuggestions.map((suggestion) => (
										<CommandItem
											key={suggestion}
											onSelect={() => handleSuggestionClick(suggestion)}
										>
											{suggestion}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</div>
				)}
			</div>
			<div className="mt-2 flex flex-wrap gap-2">
				{labels.map((label, index) => (
					<div key={index} className="flex items-center py-1 rounded-full">
						<Badge key={index} variant="secondary" className="mb-2">
							{label}
							<Button variant="ghost" size="icon" onClick={() => removeLabel(index)}>
								<Trash2 className="h-4 w-4" />
							</Button>
						</Badge>
					</div>
				))}
			</div>
		</div>
	);
}
