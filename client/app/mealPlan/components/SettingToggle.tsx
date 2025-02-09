import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface SettingToggleProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const SettingToggle = ({
  label,
  leftLabel,
  rightLabel,
  checked,
  onCheckedChange,
}: SettingToggleProps) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{label}</div>
          <div className="flex gap-4 mt-2">
            <span className={`text-sm ${!checked ? "text-red-500 font-medium" : "text-gray-500"}`}>
              {leftLabel}
            </span>
            <Switch checked={checked} onCheckedChange={onCheckedChange} />
            <span className={`text-sm ${checked ? "text-red-500 font-medium" : "text-gray-500"}`}>
              {rightLabel}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);