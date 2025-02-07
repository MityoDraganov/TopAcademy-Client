"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { exportShoppingListToPDF } from "@/lib/exportPdf";
import { FileDown, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ShoppingItem {
	id: string;
	name: string;
	completed: boolean;
	category: string;
	quantity: string;
}

const categories = {
	Proteins: "bg-red-100 text-red-700",
	Vegetables: "bg-green-100 text-green-700",
	Fruits: "bg-orange-100 text-orange-700",
	Grains: "bg-yellow-100 text-yellow-700",
	Dairy: "bg-blue-100 text-blue-700",
	Pantry: "bg-purple-100 text-purple-700",
} as const;

type Category = keyof typeof categories;

export default function shoppingList() {
	const [items, setItems] = useState<ShoppingItem[]>([
		{
			id: "1",
			name: "Chicken breast",
			completed: false,
			category: "Proteins",
			quantity: "500g",
		},
		{
			id: "2",
			name: "Quinoa",
			completed: false,
			category: "Grains",
			quantity: "250g",
		},
		{
			id: "3",
			name: "Avocados",
			completed: true,
			category: "Vegetables",
			quantity: "2 pcs",
		},
		{
			id: "4",
			name: "Greek yogurt",
			completed: false,
			category: "Dairy",
			quantity: "500g",
		},
		{
			id: "5",
			name: "Sweet potatoes",
			completed: false,
			category: "Vegetables",
			quantity: "4 pcs",
		},
		{
			id: "6",
			name: "Eggs",
			completed: false,
			category: "Proteins",
			quantity: "12 pcs",
		},
		{
			id: "7",
			name: "Oats",
			completed: true,
			category: "Grains",
			quantity: "500g",
		},
		{
			id: "8",
			name: "Almond milk",
			completed: false,
			category: "Dairy",
			quantity: "1L",
		},
	]);
	const toggleItem = (id: string) => {
		setItems(
			items.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		);
	};

	const completedCount = items.filter((item) => item.completed).length;
	const progress = (completedCount / items.length) * 100;

	const groupedItems = items.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {} as Record<string, ShoppingItem[]>);

	const handleExport = () => {
		exportShoppingListToPDF(items); // Pass your shopping list items
	};

	return (
		<div className="flex flex-col h-screen gap-4 p-4">
			<div className="flex items-center gap-4 text-primary">
				<ShoppingCart className="w-6 h-6" />
				<h1 className="text-xl font-semibold">Shopping List</h1>
			</div>

			<Button className="w-fit bg-primary-foreground text-primary border border-primary/50 flex items-center gap-2" onClick={handleExport}>
				<FileDown className="w-5 h-5"/>
				<span>Export to PDF</span>
			</Button>

			<div className="flex-1 px-4 overflow-y-auto">
				<div className="max-w-2xl mx-auto py-4 space-y-6 h-fit pb-[30dvh]">
					{Object.entries(groupedItems).map(
						([category, categoryItems]) => (
							<div key={category} className="space-y-3">
								<div className="flex items-center justify-between">
									<h3 className="font-medium text-gray-600">
										{category}
									</h3>
									<Badge
										variant="secondary"
										className={
											categories[category as Category]
										}
									>
										{categoryItems.length} items
									</Badge>
								</div>
								<div className="space-y-2">
									{categoryItems.map((item) => (
										<Card
											key={item.id}
											className={`transition-all ${
												item.completed
													? "opacity-60"
													: ""
											}`}
											onClick={() => toggleItem(item.id)}
										>
											<div className="flex items-center gap-3 p-4">
												<Checkbox
													checked={item.completed}
													className="h-5 w-5"
												/>
												<div className="flex-1 flex justify-between items-center">
													<span
														className={`${
															item.completed
																? "line-through text-gray-400"
																: ""
														}`}
													>
														{item.name}
													</span>
													<span className="text-sm text-gray-500">
														{item.quantity}
													</span>
												</div>
											</div>
										</Card>
									))}
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
}
