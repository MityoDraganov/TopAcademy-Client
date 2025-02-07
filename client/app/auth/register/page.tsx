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
import EmailConfirmation from "./steps/EmailConfirmation";
import { showError } from "@/components/toast";
import { useClerk, useSession, useSignUp } from "@clerk/nextjs";
import { validateFields } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/api/requests/auth";
import Link from "next/link";

const steps = [
	"Basic Info",
	"Physical Details",
	"Health Goals",
	"Dietary Preferences",
	"Email Confirmation",
];

interface ClerkError {
	errors: Array<{
		message: string;
	}>;
}

export default function RegisterPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const router = useRouter();
	const { formData } = useRegisterFormStore();
	const [showOtp, setShowOtp] = useState(false);

	const { signUp, isLoaded, setActive } = useSignUp();
	const { isSignedIn } = useSession();
	const { signOut } = useClerk();

	const [emailVerificationCode, setEmailVerificationCode] =
		useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		console.log("submit");
		e.preventDefault();
		if (!signUp) {
			return;
		}
		if (isSignedIn) {
			await signOut();
		}
		try {
			const { allergies, excluded_foods, ...filteredFormData } = formData;
			if (validateFields(filteredFormData).length > 0) {
				showError("Please fill all fields");
				return;
			}
			if (formData.password !== formData.confirmPassword) {
				showError("Passwords don't match");
				return;
			}
			const response = await signUp.create({
				emailAddress: formData.email,
				password: formData.password,
				firstName: formData.first_name,
				lastName: formData.last_name,
			});
			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});
			await setActive({
				session: response.createdSessionId,
			});

			setShowOtp(true);
		} catch (err) {
			console.log(JSON.stringify(err, null, 2));
			if (err && typeof err === "object" && "errors" in err) {
				(err as ClerkError).errors.forEach((error) => {
					showError("Error creating account: " + error.message);
				});
			} else {
				showError("An unexpected error occurred");
			}
		}
	};

	const handleOtpSubmit = async (e: React.FormEvent) => {
		console.log("opt submit");
		e.preventDefault();
		if (!isLoaded) return;
		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code: emailVerificationCode,
			});
			if (signUpAttempt.status === "complete") {
				if (
					signUpAttempt.createdUserId &&
					signUpAttempt.emailAddress &&
					signUpAttempt.firstName &&
					signUpAttempt.lastName
				) {
					const modifiedFormData = {
						...formData,
						clerk_id: signUpAttempt.createdUserId,
						allergies: formData?.allergies.split(","),
						excluded_foods: formData?.excluded_foods.split(","),
					};
					await registerUser(modifiedFormData);
				} else {
					throw new Error("Incomplete sign-up attempt data");
				}
				await setActive({ session: signUpAttempt.createdSessionId });
				router.push("/dashboard");
			} else {
				throw new Error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err: unknown) {
			if (err && typeof err === "object" && "message" in err) {
				showError(
					"Error verifying email: " +
						(err as { message: string }).message
				);
			} else {
				showError("An unexpected error occurred");
			}
			return;
		}
	};

	return (
		<div className=" h-screen w-screen flex justify-center p-4 overflow-y-auto">
			<div className="w-full max-w-3xl bg-white/5 rounded-2xl shadow-lg overflow-hidden overflow-y-auto pb-20">
				<div className="bg-gray-100 px-4 py-4">
					<div className="flex justify-between gap-2">
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
				<form
					onSubmit={(e) => {
						e.preventDefault(); // Prevent form submission by default

						if (showOtp) {
							handleOtpSubmit(e);
						} else {
							handleSubmit(e);
						}
					}}
					className="p-8 flex flex-col gap-6"
				>
					<AnimatePresence mode="wait">
						<motion.div
							className="relative"
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

							{currentStep === 4 && (
								<EmailConfirmation
									setEmailVerificationCode={
										setEmailVerificationCode
									}
									emailVerificationCode={
										emailVerificationCode
									}
								/>
							)}
						</motion.div>
					</AnimatePresence>

					<div className=" flex justify-between">
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

						{currentStep >= steps.length - 1 ? (
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

					<Link
						href="/auth/login"
						className="block mt-4 text-sm hover:underline text-left pb-4"
					>
						Already have an account? <span className="text-primary font-medium">Login</span>
					</Link>
				</form>
			</div>
		</div>
	);
}
