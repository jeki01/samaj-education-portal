import type { FormButtonIProp } from "./form-button";

export default function FormButton({ text, isLoading }: FormButtonIProp) {
    return (
        <>
            <button disabled={isLoading} type="submit" className={`${isLoading ? "bg-gray-500" : "bg-[linear-gradient(90deg,#6633CC,#9933FF)]"}  text-lg disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium w-full rounded-[10px] h-[61px]`}>{text}</button>
        </>
    )
}
