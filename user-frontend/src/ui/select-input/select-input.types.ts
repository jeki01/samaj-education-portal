type ItemObjType = { id: string, label: string }

export interface InputSelectIProps {
    items: ItemObjType[],
    placeholder: string,
    className?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: any, // for now
    defaultSelectedKey?: string,
    id: string,
    error?: string,
    base?: string,
    trigger?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onBlur?: any,
    isError?: boolean,
    levelName?: string
}