import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Salad, Target, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen overflow-y-auto">
			<div className="flex-grow pb-20">
				{/* Hero Section */}
				<section className="relative">
					<div className="flex flex-col items-center justify-center space-y-8 py-24 md:py-60 text-center md:text-left">
						<div className=" md:w-1/2 mr-0 md:ml-auto space-y-4">
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary-foreground">
								Transform Your Body
								<span className="text-primary">
									{" "}
									With AI-Powered Nutrition
								</span>
							</h1>
							<p className="text-muted-foreground md:text-xl">
								Get personalized meal plans that adapt to your
								goals, preferences, and dietary needs. Backed by
								science, powered by AI.
							</p>
							<div className="space-x-4 pt-4">
								<Link href="/auth/register">
									<Button size="lg">
										Start Your Journey
									</Button>
								</Link>
								<Button variant="outline" size="lg">
									Learn More
								</Button>
							</div>
						</div>
					</div>
					<div className="absolute inset-0 -z-10 bg-[url('/heroBackground.jpg')] bg-cover bg-center bg-no-repeat" />
				</section>

				<main className="w-full px-6">
					<section className=" py-20 w-full">
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
							<Card className="bg-secondary/50 backdrop-blur p-6 space-y-2 border-primary/20">
								<Brain className="h-12 w-12 text-primary" />
								<h3 className="text-xl font-bold">
									AI-Powered
								</h3>
								<p className="text-muted-foreground">
									Smart meal recommendations that learn from
									your preferences
								</p>
							</Card>
							<Card className="bg-secondary/50 backdrop-blur p-6 space-y-2 border-primary/20">
								<Target className="h-12 w-12 text-primary" />
								<h3 className="text-xl font-bold">
									Goal-Focused
								</h3>
								<p className="text-muted-foreground">
									Customized plans for weight loss, muscle
									gain, or maintenance
								</p>
							</Card>
							<Card className="bg-secondary/50 backdrop-blur p-6 space-y-2 border-primary/20">
								<Salad className="h-12 w-12 text-primary" />
								<h3 className="text-xl font-bold">
									Dietary Friendly
								</h3>
								<p className="text-muted-foreground">
									Accommodates various dietary restrictions
									and preferences
								</p>
							</Card>
							<Card className="bg-secondary/50 backdrop-blur p-6 space-y-2 border-primary/20">
								<Sparkles className="h-12 w-12 text-primary" />
								<h3 className="text-xl font-bold">
									Easy to Follow
								</h3>
								<p className="text-muted-foreground">
									Simple, clear meal plans with detailed
									instructions
								</p>
							</Card>
						</div>
					</section>

					{/* CTA Section */}
					<section className=" pb-20">
						<Card className="relative overflow-hidden border-primary/20">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
							<div className="relative p-6 md:p-12 flex flex-col items-center text-center space-y-4">
								<h2 className="text-3xl font-bold">
									Ready to Transform Your Nutrition?
								</h2>
								<p className="text-muted-foreground max-w-[600px]">
									Join Top Academy&apos;s AI Meal Planner today and
									get personalized meal plans that help you
									achieve your fitness goals.
								</p>
								<Link href="/auth/register">
									<Button size="lg" className="mt-4">
										Get Started Now
									</Button>
								</Link>
							</div>
						</Card>
					</section>
				</main>
			</div>
		</div>
	);
}
