"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"

const SAMPLE_MEALS = [
  {
    id: 1,
    title: "Vkusen burkan",
    type: "Breakfast",
    image:
      "https://edamam-product-images.s3.amazonaws.com/web-img/c0c/c0c26f2d1e8ae25e594c4ee676d70d10.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLWVhc3QtMSJHMEUCIFcB%2BWSrO8JUGepSTbMDlEntGxNVdWLpc9NlZzx4Jhb1AiEAtw9vK6E8%2F981Ga6dhzQHj6OPIZzm%2BsndQfuiiIhzvmwquQUIZhAAGgwxODcwMTcxNTA5ODYiDAYZUqI6tnIeFAtc9yqWBR5Heso0DIz9tUAemO%2Bnw9TT5BsUbT5%2BPyBMo7721Mc7s4TVvHjY0nBbE8Lv1XysJfrtl1IwUh3RuVYb7thVyWUFlGwOKDZL8vFEoxFjhPi2yUMD7zyzRiBtAKkPPG8al0WaogfhwRDXPKWbiytUt2X1YLfjZpnujCZzy8J12dBF7vGOT9e7uaINtXRouI68kCK9NjlF20jKn93ZGjXRv5UhkNI2LdFvuDuOxq68fKKf%2FacKprVVRJTTPuqW83iKYPchH%2BUYqmpnCLYO36kgvx3kDHDeJu0qzYYHIQ8SNmN6Em8mZPp05zYLgJgeq%2FZForWakuD5RMzHXBsnhK80OIleLoDwbESD0inMimhEv781PbwcEQhZ%2BfzltJGN478%2Fyq5Kaz6fvj%2F%2FqRU7Zz6Fb8Z0dSsNcAt577fzZRJ4y1ptkipU%2BnCoWWP7gzJETQ%2BcSh0RLDWkRhJ79wxt4PGkfbVy4kAKuoHXLuOLyC9OTmPjWhq46IFif0MoQx1frZ3Pkr0xry0H47zF0qKMq7gSimBCkuc8y1VB1uOcWStezdKqibWMPgwKkHXuJw6exzYZf0fIzgq0rM%2FyY7j6DXffVEq0Zc0qC4IMyruNBOEgnIfYf9D3TQ2BK0HyMLdwQopo%2FPiSNQ2T6r66yXLcpAj%2FDU3HR71nHD3TE2s9LAlAIhxK2U%2Fbc5dydGKBR1Jx4sJ3lwkJQmz1Ie4XJSKsmuZyDVaWuoLaro1QLzrItDQzKQV9ZGA3IE%2BxG7egLSWdHZFqjGR1n33tJkJEWRjMZzhaV%2BvhaIMj9Yjh3dBL21gPAd0jAbew5bjIlGbXwFF8OLy3QaTXCE%2FvPhppDtENBjv9OED%2BPSaTpUEz7ljBTvnkyCUhNKpX80klMKnMlL0GOrEB%2FKz6bUOU7ybArsEmqr%2FkbTBJx053Lx9DswQuSOorynMPx1rCoJn3cSY12jGH7h4CzLWhhewDqVkJM5zqLspQAP91cOZbHX%2BwnlbVNqfgCe5Sx0aBbWyy%2BUs7HTF1nGpKS9RDUD5Q5v4DScLpzzQj5M%2Bn7DCLF2Oxeme9XaAsoPxHlaOyOcn%2BkojNsWbJ56ZAg%2BidQ5we8RSacbTcq2MtAhszDQkElm%2FvoBGYJzmsC5cz&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250206T215940Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFFAMLRJ5T%2F20250206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=73ddb7b6ca28722c23673e0466fc87b81d2e07b9c201f7f8b3305a8ca9b40e4c",
  },
  {
    id: 2,
    title: "Overnight Oats",
    type: "Breakfast",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    title: "Greek Yogurt Bowl",
    type: "Breakfast",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function MealSelectionDialog({
  children,
  selectedMeal,
  onMealSelect,
}: {
  children: React.ReactNode
  selectedMeal: (typeof SAMPLE_MEALS)[0] | null
  onMealSelect: (meal: (typeof SAMPLE_MEALS)[0]) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select a meal</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {SAMPLE_MEALS.map((meal) => (
            <Card
              key={meal.id}
              className={`cursor-pointer transition-colors hover:bg-accent ${
                selectedMeal?.id === meal.id ? "border-primary" : ""
              }`}
              onClick={() => {
                onMealSelect(meal)
                setOpen(false)
              }}
            >
              <CardHeader className="flex flex-col items-center gap-2">
                <Image
                  className="rounded-lg"
                  src={meal.image || "/placeholder.svg"}
                  width={80}
                  height={80}
                  alt={`${meal.title} image`}
                />
                <div className="flex flex-col gap-1">
                  <CardTitle>{meal.type}</CardTitle>
                  <CardDescription>{meal.title}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

