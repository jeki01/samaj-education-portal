import type { ErrResp } from '@/config/axios-instance';
import { checkAuthUserHelper } from '@/helper/auth.helper';
import { handleGetProfileDetails } from '@/services/profile.service';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UseProfileDetails() {
    const [ProfileDetailsData, setProfileDetailsData] = useState<ProfileDetailsDataI>(initialValues)
    async function getProfileDetails() {
        try {
            const resp = await handleGetProfileDetails();
            setProfileDetailsData(resp?.data?.data)
        } catch (error) {
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err);
        }
    }

    useEffect(() => {
        getProfileDetails()
    }, [])

    return {
        ProfileDetailsData,
        getProfileDetails
    }
}

const initialValues: ProfileDetailsDataI = {
    otp: null,
    _id: '',
    email: null,
    studentType: '',
    examType: '',
    isMobileVerified: false,
    isEmailVerified: false,
    createdAt: '',
    updatedAt: '',
    __v: 0,
    mobileNo: '',
    password: '',
    city: '',
    country: '',
    firstName: '',
    lastName: '',
    middleName: '',
    pincode: '',
    state: '',
    category: {
        _id: '',
        name: '',
        type: '',
        parent: null,
        createdBy: '',
        createdAt: '',
        updatedAt: '',
        __v: 0
    }
}

export interface ProfileDetailsDataI {
    "otp": null | number,
    "_id": string,
    "email": null | string,
    "studentType": string,
    "examType": string,
    "isMobileVerified": boolean,
    "isEmailVerified": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "mobileNo": string,
    "password": string,
    "city": string,
    "country": string,
    "firstName": string,
    "lastName": string,
    "middleName": string,
    "pincode": string,
    "state": string,
    "category": {
        "_id": string,
        "name": string,
        "type": string,
        "parent": null | string,
        "createdBy": string,
        "createdAt": string,
        "updatedAt": string,
        "__v": number
    }
}