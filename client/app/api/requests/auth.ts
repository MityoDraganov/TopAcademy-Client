import * as api from "@/app/api/api"
import {  UserRegisterFormDataModified } from "@/types/UserData"

const endpoints = {
    main: "/users"
}

export const registerUser = async (data: UserRegisterFormDataModified) => {
    return api.post(endpoints.main, data)
}