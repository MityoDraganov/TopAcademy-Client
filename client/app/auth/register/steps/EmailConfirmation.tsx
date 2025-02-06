import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function EmailConfirmation({
	setEmailVerificationCode,
	emailVerificationCode,
}: {
	setEmailVerificationCode: Dispatch<SetStateAction<string>>;
	emailVerificationCode: string;
}) {
	const handleOtpChange = (value: string) => {
		setEmailVerificationCode(value);
	};
	return (
		<div className="space-y-6 w-full text-center flex flex-col items-center">
			<Image
				src="/assets/characters/excited.svg"
				alt="excited character"
				className="absolute z-[-1] top-[55%] -left-[40%]"
				width={500}
				height={500}
			/>
			<h2 className="text-2xl font-semibold text-gray-900">
				Confirm your email
			</h2>

			<InputOTP
				maxLength={6}
				value={emailVerificationCode}
				onChange={handleOtpChange}
				className="mx-auto"
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	);
}
