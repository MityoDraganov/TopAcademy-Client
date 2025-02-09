import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterFormStore } from "@/store/useAuthFormStore";

export default function BasinInfo() {
	const { formData, updateForm } = useRegisterFormStore();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		updateForm(name as keyof typeof formData, value);
	};
	return (
		<div className="flex flex-col gap-6 w-full">

			<h2 className="text-2xl font-semibold text-gray-900">
				Basic Information
			</h2>
			<div>
				<Label
					htmlFor="username"
					className="text-sm font-medium text-gray-700"
				>
					Username
				</Label>
				<Input
					id="username"
					name="username"
					value={formData.username}
					onChange={handleChange}
					required
					className="mt-1 "
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<Label
						htmlFor="first_name"
						className="text-sm font-medium text-gray-700"
					>
						First Name
					</Label>
					<Input
						name="first_name"
						id="first_name"
						value={formData.first_name}
						onChange={handleChange}
						required
						className="mt-1 "
					/>
				</div>
				<div>
					<Label
						htmlFor="last_name"
						className="text-sm font-medium text-gray-700"
					>
						Last Name
					</Label>
					<Input
						name="last_name"
						id="last_name"
						value={formData.last_name}
						onChange={handleChange}
						required
						className="mt-1 "
					/>
				</div>
			</div>
			<div>
				<Label
					htmlFor="email"
					className="text-sm font-medium text-gray-700"
				>
					Email
				</Label>
				<Input
					name="email"
					id="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					required
					className="mt-1 "
				/>
			</div>
			<div>
				<Label
					htmlFor="password"
					className="text-sm font-medium text-gray-700"
				>
					Password
				</Label>
				<Input
					name="password"
					id="password"
					type="password"
					value={formData.password}
					onChange={handleChange}
					required
					className="mt-1 "
				/>
			</div>
			<div>
				<Label
					htmlFor="confirmPassword"
					className="text-sm font-medium text-gray-700"
				>
					Confirm Password
				</Label>
				<Input
					name="confirmPassword"
					id="confirmPassword"
					type="password"
					value={formData.confirmPassword}
					onChange={handleChange}
					required
					className="mt-1 "
				/>
			</div>
		</div>
	);
}
