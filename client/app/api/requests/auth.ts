import * as api from "@/app/api/api"
import { UserRegisterFormData } from "@/types/UserData"

const endpoints = {
    main: "/users"
}

export const registerUser = async (data: UserRegisterFormData) => {
    return api.post(endpoints.main, data)
}