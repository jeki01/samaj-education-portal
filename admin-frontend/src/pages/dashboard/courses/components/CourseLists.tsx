import { useEffect, useState } from "react"
import type { ListRespType } from "../hooks/useCourse";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import DeleteIcon from "@/svg/DeleteIcon";

export default function CourseLists({ list, isNew, onListClick, type, selected_id, create_fn, setIsNewField, handleUpdateLocation, handleDeleteLocation, isAction }: LocationListsIProp) {
    const [selectedField, setSelectedField] = useState<undefined | string>(undefined);
    const [newLocation, setNewLocation] = useState("");
    const [isEdit, setisEdit] = useState(false);
    const [itemId, setitemId] = useState("");

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        setSelectedField(undefined)
    }, [list])

    function handleEdit(name: string, id: string) {
        setNewLocation(name);
        setitemId(id);
        setIsNewField((a) => !a);
        setisEdit(true);
    }

    return (
        <>
            <ul>
                {
                    isNew &&
                    <li className="border-2 border-dashed border-black rounded-xl h-[60px] flex items-center justify-between px-4 shadow-xl">
                        <input type="text" placeholder="Enter Name" className="w-full mx-2 outline-none h-full" value={newLocation} onChange={({ target: { value } }) => setNewLocation(value)} />
                        {
                            isEdit ?
                                <button onClick={async () => {
                                    const res = await handleUpdateLocation(itemId, newLocation, type)
                                    if (res === "done") {
                                        setIsNewField((a) => !a)
                                        setisEdit(false);
                                        setNewLocation("")
                                    }
                                }} className="bg-[linear-gradient(#6633CC,#9933FF)] text-white py-2 px-4 rounded-xl">update</button>
                                :
                                <button onClick={async () => {
                                    const res = await create_fn(newLocation, type);
                                    if (res === "done") {
                                        setIsNewField((a) => !a)
                                        setNewLocation("")
                                    }
                                }} className="bg-[linear-gradient(#6633CC,#9933FF)] text-white py-2 px-4 rounded-xl">Save</button>
                        }
                    </li>
                }
                {list && list.length !== 0 &&
                    list.map(({ name, _id }, i) => {
                        return <li key={i} data-id={i} onClick={({ currentTarget }) => {
                            if (selected_id) {
                                switch (type) {
                                    case "Category":
                                        selected_id(_id);
                                        break;
                                    case "SubCategory":
                                        selected_id(_id);
                                        break;
                                }
                            }
                            const currID = currentTarget.getAttribute("data-id") || "";
                            setSelectedField(currID);
                            if (onListClick) {
                                onListClick(_id)
                            }
                        }} className={`h-[60px] border-b border-[#CFD1DD] border-t-0 flex items-center justify-between xl:px-12 px-4 hover:bg-[#6633CC0D] ${Number(selectedField) === i ? "bg-[#6633CC0D]" : ""}`}>
                            <div className="xl:text-[16px] text-[14px] line-clamp-1" title={name}>{name}</div>
                            {
                                isAction &&
                                <div className="flex items-center gap-x-4">
                                    <button onClick={() => handleEdit(name, _id)}>
                                        <EditPrimaryIcon/>
                                    </button>
                                    <button onClick={() => {
                                        onOpen()
                                        setitemId(_id)
                                    }}>
                                       <DeleteIcon/>
                                    </button>
                                </div>
                            }
                        </li>
                    })
                }
            </ul >

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                            <ModalBody>
                                <p>
                                    Delete this category
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => {
                                    handleDeleteLocation(itemId, type)
                                    onClose()
                                    setitemId("")
                                }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

interface LocationListsIProp {
    list: ListRespType[],
    isNew: boolean,
    onListClick?: (id: string) => void,
    type: string,
    selected_id?: React.Dispatch<React.SetStateAction<string>>,
    create_fn: (a: string, b: string) => Promise<"done" | "error">,
    setIsNewField: React.Dispatch<React.SetStateAction<boolean>>,
    handleUpdateLocation: (a: string, b: string, c: string) => Promise<"done" | "error">,
    handleDeleteLocation: (a: string, b: string) => void,
    isAction: boolean
}