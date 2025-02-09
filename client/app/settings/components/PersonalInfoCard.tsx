import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface PersonalInfoCardProps {
  formData: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
  };
  handleChange: (field: string, value: string) => void;
}

export function PersonalInfoCard({ formData, handleChange }: PersonalInfoCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstname" className="text-base font-semibold">First Name</Label>
            <Input
              id="firstname"
              placeholder="John"
              value={formData.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastname" className="text-base font-semibold">Last Name</Label>
            <Input 
              id="lastname" 
              placeholder="Doe"
              value={formData.lastname} 
              onChange={(e) => handleChange("lastname", e.target.value)}
              className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="username" className="text-base font-semibold">Username</Label>
          <Input 
            id="username" 
            placeholder="johndoe"
            value={formData.username} 
            onChange={(e) => handleChange("username", e.target.value)}
            className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-base font-semibold">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-base font-semibold">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="text-base p-2 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </CardContent>
    </Card>
  )
}

