"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { exportShoppingListToPDF } from "@/lib/exportPdf";
import { FileDown, PlusCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddItemForm from "./components/AddItemForm";

interface ShoppingItem {
	id: string;
	name: string;
	completed: boolean;
	category: string;
	quantity: string;
}

const categories = {
	Proteins: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
	Vegetables:
		"bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
	Fruits: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
	Grains: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
	Dairy: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
	Pantry: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
} as const;

export type Category = keyof typeof categories;

export default function ShoppingList() {
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

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const [newItem, setNewItem] = useState<ShoppingItem>({
		id: "",
		name: "",
		completed: false,
		category: "Pantry",
		quantity: "",
	});

	const toggleItem = (id: string) => {
		setItems(
			items.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		);
	};

	const addItem = (e: React.FormEvent) => {
		e.preventDefault();
		if (newItem.name.trim()) {
			const newItemData: ShoppingItem = {
				id: (items.length + 1).toString(),
				name: newItem.name.trim(),
				completed: false,
				category: newItem.category,
				quantity: newItem.quantity || "1",
			};
			setItems([...items, newItemData]);
			setNewItem({
				id: "",
				name: "",
				completed: false,
				category: "Pantry",
				quantity: "",
			});
		}
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
		exportShoppingListToPDF(items);
	};

	return (
		<div
			className={`flex flex-col min-h-screen items-center transition-colors duration-300`}
		>
			<div className="w-full max-w-4xl flex flex-col h-full gap-6 p-4 md:p-6">
				<header className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Button
							className="bg-primary-foreground text-primary border border-primary/50 flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
							onClick={handleExport}
						>
							<FileDown className="w-5 h-5" />
							<span className="inline">Export PDF</span>
						</Button>
					</div>
				</header>

				<Card className="p-4 flex flex-col gap-4">
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm font-medium dark:text-gray-300">
							Progress: {completedCount} of {items.length} items
						</span>
						<span className="text-sm font-medium dark:text-gray-300">
							{Math.round(progress)}%
						</span>
					</div>
					<Progress value={progress} className="w-full" />

					<div className="flex flex-col gap-2">
						<h2 className="text-lg font-semibold dark:text-gray-300">
							Summary
						</h2>
						<div className="flex gap-[5%]">
							<p className="text-sm dark:text-gray-400">
								Total Items: {items.length}
							</p>
							<p className="text-sm dark:text-gray-400">
								Completed: {completedCount}
							</p>
							<p className="text-sm dark:text-gray-400">
								Remaining: {items.length - completedCount}
							</p>
						</div>
					</div>
				</Card>

				<div className="flex-1 overflow-y-auto w-full">
					<div className="space-y-6 pb-24">
						{Object.entries(groupedItems).map(
							([category, categoryItems]) => (
								<div key={category}>
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-medium text-gray-600 dark:text-gray-400">
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
									<AnimatePresence>
										{categoryItems.map((item) => (
											<motion.div
												key={item.id}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{ duration: 0.2 }}
											>
												<Card
													className={`mb-2 transition-all duration-300 transform w-[95%] mx-auto hover:scale-[1.02] ${
														item.completed
															? "opacity-60"
															: ""
													}`}
													onClick={() =>
														toggleItem(item.id)
													}
												>
													<div className="flex items-center gap-3 p-4">
														<Checkbox
															checked={
																item.completed
															}
															className="h-5 w-5"
														/>
														<div className="flex-1 flex justify-between items-center">
															<span
																className={`${
																	item.completed
																		? "line-through text-gray-400 dark:text-gray-600"
																		: "dark:text-gray-300"
																}`}
															>
																{item.name}
															</span>
															<span className="text-sm text-gray-500 dark:text-gray-400">
																{item.quantity}
															</span>
														</div>
													</div>
												</Card>
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							)
						)}
					</div>
				</div>

				<Card className="hidden md:sticky bottom-4 p-4 bg-white dark:bg-gray-800 shadow-lg">
					<AddItemForm
						addItem={addItem}
						categories={categories}
						newItem={newItem}
						setNewItem={setNewItem}
					/>
				</Card>

				<div className="md:hidden fixed bottom-4 right-4">
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger asChild>
							<Button
								size="icon"
								className="rounded-full h-14 w-14 shadow-lg"
							>
								<PlusCircle className="h-6 w-6" />
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Add New Item</DrawerTitle>
							</DrawerHeader>
							<div className="p-4">
								<AddItemForm
									addItem={addItem}
									categories={categories}
									newItem={newItem}
									setNewItem={setNewItem}
								/>
							</div>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</div>
	);
}
