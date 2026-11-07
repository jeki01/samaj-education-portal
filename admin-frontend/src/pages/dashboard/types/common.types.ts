export interface ColumnFrameIProp {
    title: string,
    handleAddNew: () => void,
    children: React.ReactNode,
    col_type: "start" | "mid" | "end",
    isAddBtn?: boolean,
    base?: string,
    headbar?: string,
    bodyClass?: string
}

export const enum StudentType {
    SCHOOL = "school",
    COLLEGE = "college",
    INSTITUTE = "institute"
}