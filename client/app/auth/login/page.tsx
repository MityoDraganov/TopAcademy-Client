"use client";

import { Button } from "@/components/ui/button";

import { useLoginFormStore } from "@/store/useAuthFormStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function AppleStyleMultiStepForm() {
	const { formData, updateForm } = useLoginFormStore();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		updateForm(name as keyof typeof formData, value);
	};

	return (
		<div className=" h-full w-screen flex justify-center p-4">
			<div className="w-full max-w-3xl bg-white/5 rounded-2xl shadow-lg overflow-hidden">
				<form onSubmit={handleSubmit} className="p-8">
					<div className="space-y-6 w-full relative">
						<Image
							src="/assets/characters/stretching.svg"
							alt="stretching character"
							className="absolute z-[-1] top-full left-1/2 translate-x-[-50%]"
							width={500}
							height={500}
						/>

						<h2 className="text-2xl font-semibold text-gray-900">
							Sign in
						</h2>

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
								className="mt-1"
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
								className="mt-1"
							/>
						</div>
					</div>

					<div className="mt-8 flex justify-between">
						<Button
							type="submit"
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
