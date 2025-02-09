import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Category } from "../page";
import { Dispatch, SetStateAction } from "react";
import { ShoppingItem } from "@/lib/exportPdf";

export default function AddItemForm({
	addItem,
	newItem,
	setNewItem,
	categories,
}: {
	addItem: (e: React.FormEvent) => void;
	newItem: ShoppingItem;
    setNewItem: Dispatch<SetStateAction<ShoppingItem>>;
	categories: Record<string, string>;
}) {
	return (
		<form
			onSubmit={addItem}
			className="flex flex-col md:flex-row items-center gap-5  md:gap-2"
		>
			<Input
				type="text"
				placeholder="Add new item..."
				value={newItem.name}
				onChange={(e) =>
					setNewItem({ ...newItem, name: e.target.value, id: newItem.id, completed: newItem.completed })
				}
				className="flex-1"
			/>
			<Input
				type="text"
				placeholder="Quantity"
				value={newItem.quantity}
				onChange={(e) =>
					setNewItem({ ...newItem, quantity: e.target.value, id: newItem.id, completed: newItem.completed })
				}
				className="w-full md:w-24"
			/>
			<Select
				value={newItem.category}
				onValueChange={(value) =>
					setNewItem({ ...newItem, category: value as Category, id: newItem.id, completed: newItem.completed })
				}
			>
				<SelectTrigger className="w-full md:w-40">
					<SelectValue placeholder="Category" />
				</SelectTrigger>
				<SelectContent>
					{Object.keys(categories).map((category) => (
						<SelectItem key={category} value={category}>
							{category}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button type="submit" size="icon">
				<PlusCircle className="h-5 w-5" />
			</Button>
		</form>
	);
}
