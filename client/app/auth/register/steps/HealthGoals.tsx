import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRegisterFormStore } from "@/store/useAuthFormStore";
import Image from "next/image";

export default function HealthGoals() {
	const { formData, updateForm } = useRegisterFormStore();

	return (
		<div className="space-y-6 h-full">
			<Image
				src="/assets/characters/thinking.svg"
				alt="thinking character"
				className="absolute top-full  translate-x-[-55%] z-[-1]"
				width={500}
				height={500}
			/>
			<h2 className="text-2xl font-semibold text-gray-900">
				Health Goals
			</h2>

			{/* Goal Selection */}
			<div>
				<Label className="text-sm font-medium text-gray-700">
					Goal
				</Label>
				<RadioGroup
					id="goal"
					name="goal"
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
						// No extra wrapper div
						<div key={value}>
							<RadioGroupItem
								value={value}
								id={value}
								className="peer hidden"
							/>
							<Label
								htmlFor={value}
								className={`flex items-center justify-center w-full px-3 py-2 text-sm font-medium 
                                           text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer 
                                          ${
												formData.goal === value
													? "bg-gray-100"
													: ""
											}`}
							>
								{label}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>

			{/* Activity Level Selection */}
			<div>
				<Label className="text-sm font-medium text-gray-700">
					Activity Level
				</Label>
				<RadioGroup
					id="activity_level"
					name="activity_level"
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
						// No extra wrapper div
						<div key={value}>
							<RadioGroupItem
								value={value}
								id={value}
								className="peer hidden"
							/>
							<Label
								htmlFor={value}
								className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium 
                                           text-gray-700 bg-white/80 border border-gray-200 rounded-md cursor-pointer 
                                  ${
										formData.activity_level === value
											? "bg-gray-100"
											: ""
									}`}
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
