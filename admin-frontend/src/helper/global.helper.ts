import type { ErrResp } from "@/config/axios-instance";
import type { QuestionForm } from "@/pages/dashboard/gov-exam/hooks/useTestSeries";
import { optionList } from "@/pages/dashboard/gov-exam/stepper/step-4/add-question-modal/AddQuesModal"
import Cookies from "js-cookie";
import { CalendarDate, Time } from "@internationalized/date";

export function convertIntoSelectItems(data: { name: string, type: string, _id: string }[]) {
    if (data && data.length > 0) {
        return data.map(({ name, _id }) => {
            return { id: _id, label: name }
        })
    }
    return []
}


export const getAnswerLabelLetter = (obj: QuestionForm) => {
    const matchedKey = Object.keys(obj).find(key => {
        const objKey = key as keyof QuestionForm;
        return obj[objKey] === obj.answer
    });

    const label = optionList.find(opt => opt.key === matchedKey)?.label;

    return label ? label.split(" ")[1] : null;
};

export const previewSelectedAnswer = (data: { key: string, label: string }[], givenOption: string) => {
    return data.filter(item => item.key === givenOption)[0]?.label;
}

export function checkAuthUserHelper(err: ErrResp) {
    const unAuthStatus = err?.response?.status;
    if (unAuthStatus === 401) {
        Cookies.remove("bauid");
        window.location.href = "/";
    }
}

// 2025-09-09 TO 09-09-2025
export function formatDateToDDMMYYYY(date: string) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

// 09-09-2025 to DateValue
export function stringToCalendarDate(dateStr: string): CalendarDate | null {
    if (!dateStr) return null;

    const [day, month, year] = dateStr.split("-").map(Number);

    if (!day || !month || !year) return null;

    return new CalendarDate(year, month, day);
}
type TimeObj = {
    hour: number;
    minute: number;
    second?: number;
    millisecond?: number;
};

// 
export function formatTimeIntoReadable({ hour, minute }: TimeObj): string {
    const hh = hour.toString().padStart(2, "0");
    const mm = minute.toString().padStart(2, "0");
    return `${hh}:${mm}`;
}

// Convert "HH:mm" string to Time object
export function parseTimeString(timeStr: string | null | undefined): Time | undefined {
    if (!timeStr) return undefined;
    const [hour, minute] = timeStr.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return undefined;
    return new Time(hour, minute);
}