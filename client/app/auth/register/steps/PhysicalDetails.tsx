import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRegisterFormStore } from "@/store/useAuthFormStore";
import Image from "next/image";

export default function PhysicalDetails() {
	const { formData, updateForm } = useRegisterFormStore();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		const parsedValue = type === "number" ? Number(value) : value;
		updateForm(name as keyof typeof formData, parsedValue);
	};
	return (
		<div className="space-y-6">
			<Image
				src="/assets/characters/restingBench.svg"
				alt="excited character"
				className="absolute  top-[150%] left-1/2 translate-x-[-50%] z-[-1]"
				width={500}
				height={500}
			/>
			<h2 className="text-2xl font-semibold text-gray-900">
				Physical Details
			</h2>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<Label
						htmlFor="age"
						className="text-sm font-medium text-gray-700"
					>
						Age
					</Label>
					<Input
						id="age"
						type="number"
						min={16}
						max={100}
						value={formData.age}
						onChange={handleChange}
						required
						className="mt-1"
						name="age"
					/>
				</div>
				<div>
					<Label
						htmlFor="height"
						className="text-sm font-medium text-gray-700"
					>
						Height (cm)
					</Label>
					<Input
						id="height"
						type="number"
						min={140}
						max={220}
						value={formData.height}
						onChange={handleChange}
						required
						className="mt-1"
						name="height"
					/>
				</div>
				<div>
					<Label
						htmlFor="weight"
						className="text-sm font-medium text-gray-700"
					>
						Weight (kg)
					</Label>
					<Input
						id="weight"
						type="number"
						min={40}
						max={200}
						step={0.1}
						value={formData.weight}
						onChange={handleChange}
						required
						className="mt-1"
						name="weight"
					/>
				</div>
			</div>
			<div>
				<Label className="text-sm font-medium text-gray-700">
					Gender
				</Label>
				<RadioGroup
					value={formData.gender}
					onValueChange={(value) => updateForm("gender", value)} // Use onValueChange instead of onChange
					className="gap-4 mt-2 w-full grid grid-cols-3"
					
				>
					{["male", "female", "other"].map((gender) => (
						<div key={gender} className="flex items-center">
							<RadioGroupItem
								value={gender}
								id={gender}
								className="peer sr-only w-full"
							/>
							<Label
								htmlFor={gender}
								className={`flex items-center w-full justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 ${formData.gender === gender ? "bg-gray-100" : ""}`}
							>
								{gender.charAt(0).toUpperCase() +
									gender.slice(1)}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>
		</div>
	);
}
