import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useRegisterFormStore } from "@/store/useAuthFormStore";
import Image from "next/image";

export default function DietaryPreference() {
	const { formData, updateForm } = useRegisterFormStore();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		updateForm(name as keyof typeof formData, value);
	};

	return (
		<div className="space-y-6">
			<Image
				src="/assets/characters/thinkingOfFood.svg"
				alt="thinking character"
				className="absolute  top-[50%] left-[30%] translate-x-[-50%] z-[-1] opacity-50"
				width={500}
				height={500}
			/>
			<h2 className="text-2xl font-semibold text-gray-900">
				Dietary Preferences
			</h2>
			<div>
				<Label className="text-sm font-medium text-gray-700">
					Dietary Preference
				</Label>
				<RadioGroup
					value={formData.dietary_preference}
					onValueChange={(value) =>
						updateForm("dietary_preference", value)
					} // Use onValueChange instead of onChange
					className="grid grid-cols-2 gap-4 mt-2"
				>
					{[
						["none", "No Preference"],
						["vegetarian", "Vegetarian"],
						["vegan", "Vegan"],
						["pescatarian", "Pescatarian"],
						["keto", "Keto"],
						["paleo", "Paleo"],
					].map(([value, label]) => (
						<div key={value} className="flex items-center">
							<RadioGroupItem
								value={value}
								id={value}
								className="peer sr-only"
							/>
							<Label
								htmlFor={value}
								className={`flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 ${formData.dietary_preference === value ? "bg-gray-100" : "" }`}
							>
								{label}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>
			<div>
				<Label
					htmlFor="allergies"
					className="text-sm font-medium text-gray-700"
				>
					Allergies (comma-separated)
				</Label>
				<Input
					id="allergies"
					value={formData.allergies}
					onChange={handleChange}
					placeholder="e.g. peanuts, shellfish"
					className="mt-1"
					name="allergies"
				/>
			</div>
			<div>
				<Label
					htmlFor="excluded_foods"
					className="text-sm font-medium text-gray-700"
				>
					Excluded Foods (comma-separated)
				</Label>
				<Input
					id="excluded_foods"
					value={formData.excluded_foods}
					onChange={handleChange}
					placeholder="e.g. mushrooms, olives"
					className="mt-1"
					name="excluded_foods"
				/>
			</div>
			<div>
				<Label className="text-sm font-medium text-gray-700">
					Meals per Day: {formData.meals_per_day}
				</Label>
				<Slider
					min={2}
					max={6}
					step={1}
					value={[formData.meals_per_day]}
					onValueChange={(value) =>
						updateForm("meals_per_day", value[0])
					}
					className="mt-2"
				/>
			</div>
		</div>
	);
}
