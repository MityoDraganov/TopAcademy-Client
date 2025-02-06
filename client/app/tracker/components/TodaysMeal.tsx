import { Soup } from "lucide-react";
import MealCard from "./MealCard";

export default function TodaysMeal() {
	return (
		<div className="flex flex-col gap-4">
			<h4 className="flex justify-between items-center px-2">
				<div className="flex items-center gap-2 text-primary">
					<Soup />
					<span className="text-2xl font-medium">Today's Meals</span>
				</div>
                <span>1/4</span>
			</h4>

            <section>
                <MealCard />
            </section>
		</div>
	);
}
