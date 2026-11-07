import { Select, SelectItem } from "@heroui/react";
import type { InputSelectIProps } from "./select-input.types";

export default function InputSelect({ items, placeholder, className, setFieldValue, defaultSelectedKey, id, error, base, trigger, onBlur, isError, levelName }: InputSelectIProps) {

    return (
        <div className={className}>
            {
                levelName &&
                <label className="text-[16px] font-medium mb-2 block">{levelName}</label>
            }
            <Select
                className={"max-w-xs"}
                classNames={{ trigger: `h-[54px] ${trigger ? trigger : ""} bg-white rounded-2xl shadow-none border border-[#EAEAEF] !bg-white hover:!bg-white focus:!bg-white`, base: base ? base : "" }}
                aria-label={placeholder}
                placeholder={placeholder}
                id={id}
                name={id}
                selectedKeys={new Set([defaultSelectedKey ? defaultSelectedKey : ""])}
                defaultSelectedKeys={defaultSelectedKey ? [defaultSelectedKey] : []}
                onChange={({ target: { value } }) => {
                    setFieldValue(id, value)
                }}
                onBlur={onBlur}
            >
                {items.map((animal) => (
                    <SelectItem key={animal.id}>{animal.label}</SelectItem>
                ))}
            </Select>
            {
                isError && error &&
                <p className={`my-2 text-sm text-red-500 input__form__field__error`}>{error}</p>
            }
        </div>
    )
}
