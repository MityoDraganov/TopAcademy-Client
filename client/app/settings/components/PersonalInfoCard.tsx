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
        <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstname" className="text-lg font-semibold">First Name</Label>
            <Input
              id="firstname"
              placeholder="John"
              value={formData.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              className="text-lg p-6 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname" className="text-lg font-semibold">Last Name</Label>
            <Input 
              id="lastname" 
              placeholder="Doe"
              value={formData.lastname} 
              onChange={(e) => handleChange("lastname", e.target.value)}
              className="text-lg p-6 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-lg font-semibold">Username</Label>
          <Input 
            id="username" 
            placeholder="johndoe"
            value={formData.username} 
            onChange={(e) => handleChange("username", e.target.value)}
            className="text-lg p-6 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-lg font-semibold">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="text-lg p-6 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-lg font-semibold">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="text-lg p-6 rounded-lg border-2 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </CardContent>
    </Card>
  )
}

