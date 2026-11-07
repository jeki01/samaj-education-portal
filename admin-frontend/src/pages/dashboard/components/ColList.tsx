import { useState } from "react";
// import LocationLists from "../location/components/LocationLists";
import ColumnFrame from "./ColumnFrame";
import type { ListRespType } from "../courses/hooks/useCourse";
import CourseLists from "../courses/components/CourseLists";
import "./col-list.css";

export default function ColList({ countryList, title, col_type, onListClick, selected_id, create_fn, handleUpdateLocation, handleDeleteLocation, isAction, colBase }: ColListIProp) {
    const [isNewField, setIsNewField] = useState(false);
    const handleAddNewField = () => {
        setIsNewField(true)
    }
    return (
        <>
            <ColumnFrame title={title} handleAddNew={handleAddNewField} col_type={col_type} bodyClass="h-[61%] course-type-list-container" base={colBase}>
                <CourseLists list={countryList} isNew={isNewField} onListClick={onListClick} type={title} selected_id={selected_id} create_fn={create_fn} setIsNewField={setIsNewField} handleUpdateLocation={handleUpdateLocation} handleDeleteLocation={handleDeleteLocation} isAction={isAction} />
            </ColumnFrame>
        </>
    )
}

interface ColListIProp {
    countryList: ListRespType[],
    title: string,
    col_type: "start" | "mid" | "end",
    onListClick?: (id: string) => void,
    selected_id?: React.Dispatch<React.SetStateAction<string>>,
    create_fn: (a: string, b: string) => Promise<"done" | "error">,
    handleUpdateLocation: (a: string, b: string, c: string) => Promise<"done" | "error">,
    handleDeleteLocation: (a: string, b: string) => void,
    isAction: boolean,
    colBase?: string
}