"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

export default function Header() {
    const pathname = usePathname(); // Get current URL path
    const pathSegment = pathname.split("/")[1] || "Home"; // Get first path segment or default to "Home"

    // Convert from thisCaseIfNeeded to "This Case If Needed"
    const formattedTitle = pathSegment
        .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
        .replace(/[-_]/g, " ") // Replace dashes/underscores with space
        .trim() // Remove leading/trailing spaces
        .split(" ") // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize words
        .join(" "); // Join words back

    return (
        <div className="flex justify-between items-center p-4">
            <ChartNoAxesColumnIncreasing className="text-[#578FCA]" />
            <h2 className="font-semibold">{formattedTitle}</h2>
            <UserButton />
        </div>
    );
}
