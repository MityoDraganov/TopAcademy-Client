import { Button } from "./ui/button";
import {
	Calendar,
	ChartNoAxesColumnIncreasing,
	Home,
	ReceiptText,
	User2Icon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-background shadow-lg p-4">
			{/* <Link href="/">
				<Button
					variant="ghost"
					size="icon"
					className="flex flex-col items-center gap-1 py-6 px-6"
				>
					<Home className="h-5 w-5" />
					<span className="text-xs">Home</span>
				</Button>
			</Link> */}

			<Link href="/tracker">
				<Button
					variant="ghost"
					size="icon"
					className="flex flex-col items-center gap-1 py-6 px-6"
				>
					<ChartNoAxesColumnIncreasing className="h-5 w-5" />
					<span className="text-xs">Tracker</span>
				</Button>
			</Link>

			<Link href="/mealPlan">
				<Button
					variant="ghost"
					size="icon"
					className="flex flex-col items-center gap-1 py-6 px-6"
				>
					<Calendar className="h-5 w-5" />
					<span className="text-xs">Plan</span>
				</Button>
			</Link>

			<Link href="/shoppingList">
				<Button
					variant="ghost"
					size="icon"
					className="flex flex-col items-center gap-1 py-6 px-6"
				>
					<ReceiptText className="h-5 w-5" />
					<span className="text-xs">Shopping list</span>
				</Button>
			</Link>

		</nav>
	);
}
