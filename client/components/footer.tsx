import { Button } from "./ui/button";
import { Calendar, Home, User2Icon } from "lucide-react";

export default function Footer(){
    return(
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white p-2">
    <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
      <Home className="h-5 w-5" />
      <span className="text-xs">Home</span>
    </Button>
    <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
      <Calendar className="h-5 w-5" />
      <span className="text-xs">Plan</span>
    </Button>
    <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
      <User2Icon className="h-5 w-5" />
      <span className="text-xs">Profile</span>
    </Button>
  </nav>
    );
}