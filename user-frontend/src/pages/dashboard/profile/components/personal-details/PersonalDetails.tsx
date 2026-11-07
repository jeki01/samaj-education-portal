import SectionTitle from "@/ui/section-title/SectionTitle";
import "./personal-details.css";
import UserOutlineIcon from "@/svg/UserOutlineIcon";
import EditIcon from "@/svg/EditIcon";
import { UseCountryStateCity } from "@/pages/complete-profile/hook/useCountryStateCity";
import UserIcon from "@/svg/UserIcon";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import GlobeIcon from "@/svg/GlobeIcon";
import StateIcon from "@/svg/StateIcon";
import CityIcon from "@/svg/CityIcon";
import PinCodeIcon from "@/svg/PinCodeIcon";
// import EmailIcon from "@/svg/EmailIcon";
import { useEffect } from "react";
import type { ProfileDetailsDataI } from "../../hooks/useProfileDetails";

export default function PersonalDetails({ ProfileDetailsData, getProfileDetails }: PersonalDetailsProp) {
    const { countries, states, cities, formik, isEdit, handleToggleEdit } = UseCountryStateCity(getProfileDetails);

    useEffect(() => {
        if (ProfileDetailsData?.firstName) formik.setFieldValue("firstName", ProfileDetailsData?.firstName);
        if (ProfileDetailsData?.middleName) formik.setFieldValue("middleName", ProfileDetailsData?.middleName);
        if (ProfileDetailsData?.lastName) formik.setFieldValue("lastName", ProfileDetailsData?.lastName);
        if (ProfileDetailsData?.country) formik.setFieldValue("country", ProfileDetailsData?.country);
        if (ProfileDetailsData?.state) formik.setFieldValue("state", ProfileDetailsData?.state);
        if (ProfileDetailsData?.city) formik.setFieldValue("city", ProfileDetailsData?.city);
        if (ProfileDetailsData?.pincode) formik.setFieldValue("pincode", ProfileDetailsData?.pincode);
        if (ProfileDetailsData?.email) formik.setFieldValue("email", ProfileDetailsData?.email);
        if (ProfileDetailsData?._id) formik.setFieldValue("id", ProfileDetailsData?._id);
    }, [ProfileDetailsData])

    return (
        <>
            <div className="personal-details-section-base">
                <div className="personal-details-section-head">
                    <SectionTitle text="Personal details" Icon={<UserOutlineIcon />} />
                    {
                        !isEdit &&
                        <button onClick={handleToggleEdit}><EditIcon /></button>
                    }
                </div>
                {/* form */}
                <div className="personal-details-section-form">
                    <div className="comp-profile-form-row">
                        <div className="input-field">
                            <UserIcon />
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                disabled={!isEdit}
                                className="!w-full ml-1"
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
                                disabled={!isEdit}
                                className="!w-full ml-1"
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
                                disabled={!isEdit}
                                className="!w-full ml-1"
                            />
                        </div>
                    </div>
                    <div className="comp-profile-form-row-select middle-row">
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
                                base: "complete-profile-autocomplete-input-base personal-autocomplete-input-base"
                            }}
                            isClearable={false}
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
                                base: "complete-profile-autocomplete-input-base personal-autocomplete-input-base"
                            }}
                            startContent={<StateIcon />}
                            isDisabled={!isEdit}
                            isClearable={false}
                        >
                            {states.map((state) => (
                                <AutocompleteItem key={state.id}>{state.label}</AutocompleteItem>
                            ))}
                        </Autocomplete>
                        {/* City */}
                        <Autocomplete
                            aria-label="Select City"
                            placeholder="Select City"
                            name="city"
                            isDisabled={!isEdit}
                            selectedKey={formik.values.city}
                            onSelectionChange={(key) => {
                                formik.setFieldValue('city', key ?? '');
                            }}
                            isInvalid={!!formik.errors.city && formik.touched.city}
                            errorMessage={formik.errors.city}
                            classNames={{
                                base: "complete-profile-autocomplete-input-base personal-autocomplete-input-base"
                            }}
                            startContent={<CityIcon />}
                        >
                            {cities.map((city) => (
                                <AutocompleteItem key={city.id}>{city.label}</AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <div className="personal-autocomplete-input-base">
                            <div className="input-field !w-full">
                                <div className="flex items-center gap-x-2">
                                    <PinCodeIcon />
                                    <input
                                        type="number"
                                        placeholder="Pincode"
                                        name="pincode"
                                        value={formik.values.pincode}
                                        onChange={formik.handleChange}
                                        disabled={!isEdit}
                                    />
                                </div>
                            </div>
                            {
                                formik.errors.pincode &&
                                <p className="text-red-500 text-sm mt-2">{formik.errors.pincode}</p>
                            }
                        </div>
                        <div className="personal-autocomplete-input-base">
                            {
                                isEdit && <button onClick={() => {
                                    formik.submitForm()
                                }} className="profile-details-save-btn">Save</button>
                            }
                        </div>
                        <div className="personal-autocomplete-input-base"></div>
                    </div>
                    <div className="comp-profile-form-row-select">
                        {/* <div className="w-1/2">
                            <div className="input-field !w-full">
                                <div className="flex items-center gap-x-2">
                                    <PinCodeIcon />
                                    <input
                                        type="number"
                                        placeholder="Pincode"
                                        name="pincode"
                                        value={formik.values.pincode}
                                        onChange={formik.handleChange}
                                        disabled={!isEdit}
                                    />
                                </div>
                            </div>
                            {
                                formik.errors.pincode &&
                                <p className="text-red-500 text-sm mt-2">{formik.errors.pincode}</p>
                            }
                        </div> */}
                        <div className="w-1/2">
                            {/* <div className="input-field !w-full">
                                <div className="flex items-center gap-x-2 w-full">
                                    <EmailIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        disabled={!isEdit}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            {
                                formik.errors.email &&
                                <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
                            } */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

interface PersonalDetailsProp {
    ProfileDetailsData: ProfileDetailsDataI,
    getProfileDetails: () => void
}