import moment from 'moment';

export function convertIntoSelectItems(data: { name: string, type: string, _id: string }[]) {
    if (data && data.length > 0) {
        return data.map(({ name, _id }) => {
            return { id: _id, label: name }
        })
    }
    return []
}

export function formatDDMMYYYY(dateStr: string) {
    // e.g., "2025-07-29T05:59:03.823Z" to "29 Jul, 2025"
    const givenDate = moment(dateStr);
    const formattedDate = givenDate.format("Do MMM YYYY");
    return formattedDate;
}

export const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
};

export function minutesToSeconds(minutes: number) {
    if (typeof minutes !== 'number' || minutes < 0) {
        throw new Error('Input must be a non-negative number');
    }
    return minutes * 60;
}

export function getPercentage(part: number, total: number) {
    if (typeof part !== 'number' || typeof total !== 'number') {
        throw new Error('Both part and total must be numbers, and total must not be zero');
    }
    return (part / total) * 100;
}


export function formatNumber(num: number): string {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}


export function secIntoReadableTime(seconds: number): string {
    if (seconds < 0) return "0 sec"; // handle negative values

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts: string[] = [];

    if (hrs > 0) parts.push(`${hrs} hr${hrs > 1 ? "s" : ""}`);
    if (mins > 0) parts.push(`${mins} min${mins > 1 ? "s" : ""}`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs} sec${secs > 1 ? "s" : ""}`);

    return parts.join(" ");
}

// "30-04-2025" into "30 April, 2025"
export function formatDateIntoReadable(dateStr: string): string {
    const [day, month, year] = dateStr.split("-").map(Number);

    if (!day || !month || !year) {
        throw new Error("Invalid date format. Expected DD-MM-YYYY");
    }

    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

// "15:30:00" into "03:30 PM"
export function formatTimeIntoReadable(timeStr: string): string {
    const [hoursStr, minutesStr] = timeStr.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Invalid time format. Expected HH:mm:ss");
    }

    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

//  90 into "1 hr 30 min"
export function formatMinutesIntoReadable(min: string): string {
    const totalMinutes = Number(min);
    if (Number.isNaN(totalMinutes)) {
        throw new Error("Minutes cannot be empty");
    }
    if (totalMinutes < 0) {
        throw new Error("Minutes cannot be negative");
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hrPart = hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""}` : "";
    const minPart = minutes > 0 ? `${minutes} min` : "";

    return [hrPart, minPart].filter(Boolean).join(" ");
}


export function isTimeIsPassed(dateStr: string, timeStr: string): boolean {
    const [dayStr, monthStr, yearStr] = dateStr.split("-");
    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    if (!day || !month || !year) {
        throw new Error("Invalid date format. Expected DD-MM-YYYY");
    }

    const [hoursStr, minutesStr, secondsStr] = timeStr.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    const seconds = Number(secondsStr) || 0;

    if (
        isNaN(hours) ||
        isNaN(minutes) ||
        isNaN(seconds) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59 ||
        seconds < 0 ||
        seconds > 59
    ) {
        throw new Error("Invalid time format. Expected HH:mm:ss");
    }

    const target = new Date(year, month - 1, day, hours, minutes, seconds, 0);

    const now = new Date();

    return (target.getTime() > now.getTime());
}

export function isDateIsPassed(dateStr: string): boolean {
    const [dayStr, monthStr, yearStr] = dateStr.split("-");
    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    if (!day || !month || !year) {
        throw new Error("Invalid date format. Expected DD-MM-YYYY");
    }

    const target = new Date(year, month - 1, day);
    target.setHours(0, 0, 0, 0);

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return target.getTime() < now.getTime();
}

export function calculateOriginalPrice(price: number) {
    const percentage = 10; //fixed
    const val = price * percentage / 100;
    const originalPrice = price + val;
    return originalPrice;
}