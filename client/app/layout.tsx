import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react"; // Import React
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { ToastContainer, Bounce } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Top Academy AI Meal Planner",
	description: "Personalized meal plans powered by AI",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	

	return (
		<html lang="en">
			<body
				className={`${inter.className} h-screen flex flex-col overflow-hidden`}
			>
				<ClerkProvider
					publishableKey={
						process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
					}
					afterSignOutUrl="/"
				>
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable
						pauseOnHover={false}
						theme="dark"
						transition={Bounce}
					/>
					<SignedIn>
						<Header />
						<Footer />
					</SignedIn>
					<div id='clerk-captcha' /> 
					{children}
				</ClerkProvider>
			</body>
		</html>
	);
}
