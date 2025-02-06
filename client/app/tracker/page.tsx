import ActivityTracker from "./components/ActivityTracker";
import TodaysMeal from "./components/TodaysMeal";
import TrackerHeader from "./components/TrackerHeader";


export default function Tracker(){
    return(
        <div className="">
            <TrackerHeader />
            <div className="px-2 py-2 flex flex-col gap-8">

            <TodaysMeal />
            </div>
        </div>
    )
}