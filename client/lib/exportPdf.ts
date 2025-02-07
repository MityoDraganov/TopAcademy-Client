import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ShoppingItem {
  id: string;
  name: string;
  completed: boolean;
  category: string;
  quantity: string;
}

/**
 * Generates and downloads a PDF of the shopping list.
 * @param items Array of shopping list items.
 */
export function exportShoppingListToPDF(items: ShoppingItem[]): void {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Shopping List", 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const groupedItems = items.reduce<Record<string, ShoppingItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  let yOffset = 30;

  Object.entries(groupedItems).forEach(([category, categoryItems]) => {
    doc.setFont("helvetica", "bold");
    doc.text(category, 14, yOffset);
    yOffset += 6;

    autoTable(doc, {
      startY: yOffset,
      head: [["Item", "Quantity", "Completed"]],
      body: categoryItems.map((item) => [
        item.name,
        item.quantity,
        item.completed ? "✔" : "✘",
      ]),
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 122, 255] },
    });

    yOffset = (doc as any).lastAutoTable.finalY + 10;
  });

  doc.save("Shopping_List.pdf");
}
