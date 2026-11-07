import type { ChangeEvent } from "react";

export interface FromInputIProp {
    type: "email" | "text" | "password" | "number",
    placeholder: string,
    startIconUrl?: string,
    id: string,
    value: string,
    onChange: (e: ChangeEvent) => void,
    error?: string,
    labelName?: string
}