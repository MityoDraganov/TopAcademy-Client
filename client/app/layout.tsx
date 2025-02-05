import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react"; // Import React
import Footer from "@/components/footer";
import Header from "@/components/header";

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
			<body className={`${inter.className} h-screen flex flex-col overflow-hidden`}>
				<Header />
				<Footer />
				{children}
			</body>
		</html>
	);
}
