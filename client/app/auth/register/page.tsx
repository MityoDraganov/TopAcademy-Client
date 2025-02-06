"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BasicInfo from "./steps/BasicInfo";
import PhysicalDetails from "./steps/PhysicalDetails";
import HealthGoals from "./steps/HealthGoals";
import DietaryPreference from "./steps/DietaryPreferences";
import { useRegisterFormStore } from "@/store/useAuthFormStore";

const steps = [
	"Basic Info",
	"Physical Details",
	"Health Goals",
	"Dietary Preferences",
];

export default function AppleStyleMultiStepForm() {
	const [currentStep, setCurrentStep] = useState(0);

	const { formData } = useRegisterFormStore();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className=" h-full w-screen flex justify-center p-4">
			<div className="w-full max-w-3xl bg-white/5 rounded-2xl shadow-lg overflow-hidden">
		
				<div className="bg-gray-100 px-8 py-4">
					<div className="flex justify-between">
						{steps.map((step, index) => (
							<div
								key={step}
								className="flex flex-col items-center text-center"
							>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 text-sm font-medium
                    ${
						index <= currentStep
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-500"
					}`}
								>
									{index + 1}
								</div>
								<span
									className={`text-xs ${
										index <= currentStep
											? "text-blue-500"
											: "text-gray-500"
									}`}
								>
									{step}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Form Content */}
				<form onSubmit={handleSubmit} className="p-8">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentStep}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
						>
							{currentStep === 0 && <BasicInfo />}

							{currentStep === 1 && <PhysicalDetails />}

							{currentStep === 2 && <HealthGoals />}

							{currentStep === 3 && <DietaryPreference />}
						</motion.div>
					</AnimatePresence>

					<div className="mt-8 flex justify-between">
						<Button
							type="button"
							variant="outline"
							onClick={() => setCurrentStep((prev) => prev - 1)}
							disabled={currentStep === 0}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<ChevronLeft className="w-4 h-4 mr-2" />
							Previous
						</Button>

						{currentStep === steps.length - 1 ? (
							<Button
								type="submit"
								className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Complete
							</Button>
						) : (
							<Button
								type="button"
								onClick={() =>
									setCurrentStep((prev) => prev + 1)
								}
								className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Next
								<ChevronRight className="w-4 h-4 ml-2" />
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
