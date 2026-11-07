import UseCompetition from "../hook/useCompetition";
import CompletedList from "./CompletedList";
import ScheduleList from "./ScheduleList";

export default function CompetitionContent() {
    const { currentTab, setCurrentTab, scheduleListData, handleSetCurrTestDetails, currentSelectedTest, handleEnrollNow, walletBalance } = UseCompetition();
    return (
        <>
            <div className="flex items-center justify-between p-4 gap-x-4">
                <button className={`competition-btn ${currentTab === "scheduled" ? "active" : ""}`} onClick={() => setCurrentTab("scheduled")}>Scheduled</button>
                <button className={`competition-btn ${currentTab === "completed" ? "active" : ""}`} onClick={() => setCurrentTab("completed")}>Completed</button>
            </div>

            {
                currentTab === "scheduled" ? (
                    <ScheduleList
                        scheduleListData={scheduleListData}
                        handleSetCurrTestDetails={handleSetCurrTestDetails}
                        currentSelectedTest={currentSelectedTest}
                        handleEnrollNow={handleEnrollNow}
                        walletBalance={walletBalance}
                    />
                ) : (
                    <CompletedList
                        scheduleListData={scheduleListData}
                    />
                )
            }
        </>
    )
}
