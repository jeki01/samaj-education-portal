import CompleteProfileImgIcon from "@/svg/CompleteProfileImgIcon";
import AuthBgFrame from "@/ui/frame/AuthBgFrame";
import "./complete-profile.css";
// import InputSelect from "@/ui/select-input/InputSelect";
import CityIcon from "@/svg/CityIcon";
import GlobeIcon from "@/svg/GlobeIcon";
import PinCodeIcon from "@/svg/PinCodeIcon";
import StateIcon from "@/svg/StateIcon";
import UserIcon from "@/svg/UserIcon";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useEffect } from "react";
import { UseCountryStateCity } from "./hook/useCountryStateCity";
export default function CompleteProfile() {
    const { countries, states, cities, formik, getDetailsUser } = UseCountryStateCity();

    useEffect(() => {
        getDetailsUser()
    }, [])
    return (
        <>
            <AuthBgFrame>
                <div className="comp-profile-page-base">
                    <div className="comp-profile-page-img-wrapper">
                        <CompleteProfileImgIcon />
                    </div>
                    <div className="w-full">
                        <div className="comp-profile-title">Complete Your <span>Profile</span></div>
                        <div className="comp-profile-form">
                            <div className="comp-profile-form-row">
                                <div className="input-field">
                                    <UserIcon />
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="input-field">
                                    <UserIcon />
                                    <input
                                        type="text"
                                        placeholder="Middle Name"
                                        name="middleName"
                                        value={formik.values.middleName}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="input-field">
                                    <UserIcon />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="comp-profile-form-row-select">
                                <Autocomplete
                                    aria-label="Select Country"
                                    name="country"
                                    placeholder="Select Country"
                                    selectedKey={formik.values.country}
                                    // onSelectionChange={(key) => {
                                    //     formik.setFieldValue('country', key ?? '');
                                    //     formik.setFieldValue('state', '');
                                    //     formik.setFieldValue('city', '');
                                    // }}
                                    isInvalid={!!formik.errors.country && formik.touched.country}
                                    errorMessage={formik.errors.country}
                                    classNames={{
                                        base: "complete-profile-autocomplete-input-base country-field"
                                    }}
                                    startContent={<GlobeIcon />}
                                    isDisabled={true}
                                >
                                    {countries.filter((country) => country.id === "IN").map((country) => (
                                        <AutocompleteItem key={country.id}>{country.label}</AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                {/* State */}
                                <Autocomplete
                                    aria-label="Select State"
                                    placeholder="Select State"
                                    name="state"
                                    selectedKey={formik.values.state}
                                    onSelectionChange={(key) => {
                                        formik.setFieldValue('state', key ?? '');
                                        formik.setFieldValue('city', '');
                                    }}
                                    isInvalid={!!formik.errors.state && formik.touched.state}
                                    errorMessage={formik.errors.state}
                                    classNames={{
                                        base: "complete-profile-autocomplete-input-base country-field"
                                    }}
                                    startContent={<StateIcon />}
                                >
                                    {states.map((state) => (
                                        <AutocompleteItem key={state.id}>{state.label}</AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                {/* <InputSelect
                                    base="w-full !max-w-full"
                                    trigger="complete-profile__input__field"
                                    items={countries}
                                    placeholder={"Select Country"}
                                    id={"country"}
                                    setFieldValue={formik.setFieldValue}
                                    className="w-full"
                                    // error={createCourseForm.errors.category}
                                    // isError={!!(createCourseForm.touched.category && createCourseForm.errors.category)}
                                    // onBlur={createCourseForm.handleBlur}
                                    defaultSelectedKey={formik.values.country}
                                // levelName="Category"
                                /> */}
                            </div>
                            <div className="comp-profile-form-row-select">
                                {/* City */}
                                <Autocomplete
                                    aria-label="Select City"
                                    placeholder="Select City"
                                    name="city"
                                    isDisabled={!formik.values.state}
                                    selectedKey={formik.values.city}
                                    onSelectionChange={(key) => {
                                        formik.setFieldValue('city', key ?? '');
                                    }}
                                    isInvalid={!!formik.errors.city && formik.touched.city}
                                    errorMessage={formik.errors.city}
                                    classNames={{
                                        base: "complete-profile-autocomplete-input-base"
                                    }}
                                    startContent={<CityIcon />}
                                >
                                    {cities.map((city) => (
                                        <AutocompleteItem key={city.id}>{city.label}</AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <div className="w-1/2 pincode-field-wrapper">
                                    <div className="input-field !w-full">
                                        <div className="flex items-center gap-x-2">
                                            <PinCodeIcon />
                                            <input
                                                type="number"
                                                placeholder="Pincode"
                                                name="pincode"
                                                value={formik.values.pincode}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                    {
                                        formik.errors.pincode &&
                                        <p className="text-red-500 text-sm mt-2">{formik.errors.pincode}</p>
                                    }
                                </div>
                            </div>
                            <button onClick={formik.submitForm} className="common-btn-ui">Next</button>
                        </div>
                    </div>
                </div>
            </AuthBgFrame>
        </>
    )
}
