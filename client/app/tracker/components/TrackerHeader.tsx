import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TrackerHeader(){
    return(
    <div className="flex justify-evenly items-center p-4">
        <ChevronLeft />
        <h3>Thursday, Oct 28</h3>
        <ChevronRight />
    </div>
    )
}