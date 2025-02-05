import { ChartNoAxesColumnIncreasing, UserCircle } from "lucide-react";

export default function Header(){
    return(
        <div className="flex justify-between items-center p-4">
            <ChartNoAxesColumnIncreasing className="text-[#578FCA]"/>
            <h2 className="font-semibold">Tracker</h2>
            <UserCircle className="text-[#578FCA]"/>
        </div>
    )
}