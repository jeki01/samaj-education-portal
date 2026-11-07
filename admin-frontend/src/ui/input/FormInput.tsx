import type { FromInputIProp } from "./form-input.type";

export default function FormInput({ type, placeholder, startIconUrl, id, value, onChange, error, labelName }: FromInputIProp) {
    return (
        <>
            <div className="relative my-4">
                {
                    startIconUrl &&
                    <img src={startIconUrl} alt="icon" className="absolute left-4 top-[20px] -translate-y-1/2" />
                }
                <label htmlFor={id} className="text-[16px] font-medium mb-2 block">{labelName}</label>
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`rounded-[4px] placeholder:text-black text-[#5E6174] bg-white border border-[#CFD1DD] outline-none h-[40px] w-full px-4 ${startIconUrl ? "pl-10" : ""}`}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </>
    )
}
