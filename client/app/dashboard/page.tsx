import { Card } from "@/components/ui/card"
import { Dumbbell, Goal, TrendingUp, Utensils } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MealPlan } from "./components/MealPlan"


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col dark">
 

      <div className="px-4 py-6">
        {/* Overview Section */}
        <div className="grid h-max gap-6 md:grid-cols-4 mb-6">
          <Card className="p-4 h-full bg-secondary/50 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2">
              <Goal className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Current Goal</span>
            </div>
            <p className="mt-2 text-2xl font-bold">Muscle Gain</p>
            <p className="text-xs text-muted-foreground">Active since Jan 15</p>
          </Card>

          <Card className="p-4 h-full bg-secondary/50 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Daily Calories</span>
            </div>
            <p className="mt-2 text-2xl font-bold">2,800</p>

            <Progress value={75} className="mt-2" />
       
            <p className="text-xs text-muted-foreground mt-1">2,100 / 2,800 consumed</p>
          </Card>

          <Card className="p-4 h-full bg-secondary/50 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Protein Goal</span>
            </div>
            <p className="mt-2 text-2xl font-bold">180g</p>
            <Progress value={60} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">108g / 180g consumed</p>
          </Card>

          <Card className="p-4 h-full bg-secondary/50 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Meals Today</span>
            </div>
            <p className="mt-2 text-2xl font-bold">3/5</p>
            <p className="text-xs text-muted-foreground">Next meal in 2h 30m</p>
          </Card>
        </div>



        {/* Meal Plan Section */}
        <div className="mt-6">
          <Card className="p-6 bg-secondary/50 backdrop-blur border-primary/20">
            <Tabs defaultValue="today" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Your Meal Plan</h3>
                <TabsList className="bg-background/50">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="today" className="m-0">
                <MealPlan />
              </TabsContent>
              <TabsContent value="tomorrow" className="m-0">
                <MealPlan />
              </TabsContent>
              <TabsContent value="week" className="m-0">
                <MealPlan />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}

