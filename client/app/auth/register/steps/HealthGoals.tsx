import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRegisterFormStore } from "@/store/useAuthFormStore";
import Image from "next/image";

export default function HealthGoals() {
	const { formData, updateForm } = useRegisterFormStore();

	return (
		<div className="space-y-6">
                    <Image
                            src="/assets/characters/thinking.svg"
                            alt="thinking character"
                            className="absolute  top-[45%] left-[5%] translate-x-[-50%] z-[-1]"
                            width={500}
                            height={500}
                        />
			<h2 className="text-2xl font-semibold text-gray-900">
				Health Goals
			</h2>
		
			<div>
				<Label className="text-sm font-medium text-gray-700">
					Goal
				</Label>
				<RadioGroup
					value={formData.goal}
					onValueChange={(value) => updateForm("goal", value)}
					className="grid grid-cols-2 gap-4 mt-2"
				>
					{[
						["lose_weight", "Lose Weight"],
						["gain_weight", "Gain Weight"],
						["maintain_weight", "Maintain Weight"],
						["build_muscle", "Build Muscle"],
					].map(([value, label]) => (
						<div key={value} className="flex items-center">
							<RadioGroupItem
								value={value}
								id={value}
								className="peer sr-only"
							/>
							<Label
								htmlFor={value}
								className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 hover:bg-gray-50"
							>
								{label}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>
			<div>
				<Label className="text-sm font-medium text-gray-700">
					Activity Level
				</Label>
				<RadioGroup
					value={formData.activity_level}
					onValueChange={(value) =>
						updateForm("activity_level", value)
					}
					className="grid gap-2 mt-2"
				>
					{[
						["sedentary", "Sedentary (little or no exercise)"],
						["lightly_active", "Lightly Active (1-3 days/week)"],
						[
							"moderately_active",
							"Moderately Active (3-5 days/week)",
						],
						["very_active", "Very Active (6-7 days/week)"],
						[
							"extremely_active",
							"Extremely Active (physical job or 2x training)",
						],
					].map(([value, label]) => (
						<div key={value} className="flex items-center">
							<RadioGroupItem
								value={value}
								id={value}
								className="peer sr-only"
							/>
							<Label
								htmlFor={value}
								className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 hover:bg-gray-50"
							>
								{label}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>
		</div>
	);
}
