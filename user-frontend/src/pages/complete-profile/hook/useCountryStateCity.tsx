import type { ErrResp } from '@/config/axios-instance';
import { checkAuthUserHelper } from '@/helper/auth.helper';
import { handleCompeleteProfile, handleVerificationStatus } from '@/services/user-auth.service';
import { completeProSchema } from '@/validation/signup.schema';
import { City, Country, State } from 'country-state-city';
import { useFormik } from 'formik';
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router';
import { toast } from "react-toastify";
type Option = { id: string; label: string };

export const UseCountryStateCity = (getProfileDetails?: () => void) => {
    const [countries, setCountries] = useState<Option[]>([]);
    const [states, setStates] = useState<Option[]>([]);
    const [cities, setCities] = useState<Option[]>([]);
    const navigate = useNavigate();
    const slug = useParams();
    const location = useLocation();
    const [isEdit, setIsEdit] = useState(false);
    const [searchParams] = useSearchParams();
    const [userMode, setUserMode] = useState("");

    // toggle Edit
    function handleToggleEdit() {
        setIsEdit(a => !a)
    }

    const formik = useFormik<CompleteProFormikI>({
        initialValues: {
            country: 'IN',
            state: '',
            city: '',
            firstName: "",
            middleName: "",
            lastName: "",
            pincode: "",
            email: ""
        },
        validationSchema: completeProSchema,
        onSubmit: async (values) => {
            try {
                if (slug?.id) {
                    const reqValForCompleteProfile = Object.fromEntries(Object.entries(values).filter(([key]) => key !== "email"));
                    const resp = await handleCompeleteProfile(reqValForCompleteProfile, slug?.id); //api call

                    const referId = searchParams.get("referId");
                    const courseId = searchParams.get("courseId");
                    const testId = searchParams.get("testId");
                    const id = (courseId || testId);

                    if (referId && id) {
                        navigate(`/select-exam/${slug?.id}?referId=${referId}&${courseId ? "courseId" : "testId"}=${id.split(" ").at(0)}`);
                    } else if (userMode === "skills") {
                        const accesstoken = resp.data?.token as string;
                        Cookies.set("buuid", accesstoken)
                        // navigate("/pricing-plans/" + slug?.id)
                        window.location.href = "/pricing-plans/" + slug?.id;
                    } else {
                        navigate("/select-exam/" + slug?.id)
                    }
                }
                if (location.pathname === "/profile") {
                    const { id = "", ...rest } = values;
                    await handleCompeleteProfile(rest, id); //api call
                    if (getProfileDetails) {
                        getProfileDetails()
                    }
                    handleToggleEdit()
                    toast.success("profile updated sucessfully!")
                }
            } catch (error) {
                const err = error as ErrResp;
                toast.error(err?.response?.data?.message)
            }
        },
    });

    useEffect(() => {
        const countryList = Country.getAllCountries().map((country) => ({
            id: country.isoCode,
            label: country.name,
        }));
        setCountries(countryList);
    }, []);

    useEffect(() => {
        if (formik.values.country) {
            const stateList = State.getStatesOfCountry(formik.values.country).map((state) => ({
                id: state.isoCode,
                label: state.name,
            }));
            setStates(stateList);
        } else {
            setStates([]);
        }
    }, [formik.values.country]);

    useEffect(() => {
        if (formik.values.country && formik.values.state) {
            const cityList = City.getCitiesOfState(formik.values.country, formik.values.state).map((city) => ({
                id: city.name,
                label: city.name,
            }));
            setCities(cityList);
        } else {
            setCities([]);
        }
    }, [formik.values.country, formik.values.state]);


    // get details
    async function getDetailsUser() {
        try {
            const resp = await handleVerificationStatus(slug?.id || "");
            setUserMode(resp?.data?.examType)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message || "something went wrong");
            checkAuthUserHelper(err);
        }
    }

    return {
        countries,
        states,
        cities,
        formik,
        handleToggleEdit,
        isEdit,
        getDetailsUser
    };
};


interface CompleteProFormikI {
    country: string,
    state: string,
    city: string,
    firstName: string,
    middleName: string,
    lastName: string,
    pincode: string,
    email?: string,
    id?: string
}