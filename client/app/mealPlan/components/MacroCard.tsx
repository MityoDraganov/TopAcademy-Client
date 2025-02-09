import { Card, CardContent } from "@/components/ui/card";

interface MacroCardProps {
  value: number | string;
  label: string;
}

export const MacroCard = ({ value, label }: MacroCardProps) => (
  <Card className="relative">
    <CardContent className="p-4 text-center">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </CardContent>
  </Card>
);