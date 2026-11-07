import { formatTime } from "@/helper/global.helper";
import { useEffect, useState } from "react";

const enum CountdownKey {
    CST = "cst",
    CET = "cet"
}

export default function Countdown({ initialSeconds, setTimeTakenByUser, setTestTimeLeftInSec }: CountdownProp) {
    const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
    const [timePassed, setTimePassed] = useState<number>(0);

    useEffect(() => {
        const savedStartTime = localStorage.getItem(CountdownKey.CST);
        const savedEndTime = localStorage.getItem(CountdownKey.CET);

        let startTime: number;
        let endTime: number;

        if (savedStartTime && savedEndTime) {
            startTime = parseInt(savedStartTime, 10);
            endTime = parseInt(savedEndTime, 10);
        } else {
            startTime = Date.now();
            endTime = Date.now() + initialSeconds * 1000;
            localStorage.setItem(CountdownKey.CST, startTime.toString());
            localStorage.setItem(CountdownKey.CET, endTime.toString());
        }

        function updateTimer() {
            const now = Date.now();
            const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
            const passed = Math.floor((now - startTime) / 1000);

            setSecondsLeft(remaining);
            setTimePassed(passed);

            if (remaining <= 0) {
                if (interval) clearInterval(interval);
                // localStorage.removeItem(CountdownKey.CST);
                // localStorage.removeItem(CountdownKey.CET);
            }
        }

        const interval = setInterval(updateTimer, 1000);

        // Run immediately
        updateTimer();


        return () => {
            clearInterval(interval);
            localStorage.removeItem(CountdownKey.CST);
            localStorage.removeItem(CountdownKey.CET);
        };
    }, [initialSeconds]);

    const timeLeft = formatTime(secondsLeft);

    // Update the time taken by user
    useEffect(() => {
        setTimeTakenByUser(timePassed);
    }, [timePassed, setTimeTakenByUser]);

    // secondsLeft
    useEffect(() => {
        setTestTimeLeftInSec(secondsLeft);
    }, [secondsLeft])


    return (
        <div>
            {timeLeft.hours > 0 && (
                <>
                    {String(timeLeft.hours).padStart(2, "0")}:
                </>
            )}
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
        </div>
    );
}

interface CountdownProp {
    initialSeconds: number;
    setTimeTakenByUser: React.Dispatch<React.SetStateAction<number>>;
    setTestTimeLeftInSec: React.Dispatch<React.SetStateAction<number | null>>;
}