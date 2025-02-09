import * as api from "@/app/api/api"
import { UserRegisterFormDataModified, UserUpdateData } from "@/types/UserData"

const endpoints = {
    main: "/users",
    createWeeklyPlan: "/mealplans/weekly",
    getUser: (clerk_id: string) => `/users?clerk_id=${clerk_id}`,
    updateUser: (clerk_id: string) => `/users?clerk_id=${clerk_id}`
}

export const registerUser = async (data: UserRegisterFormDataModified) => {
    return api.post(endpoints.main, data)
}

export const createWeeklyPlan = async () => {
    return api.post(endpoints.createWeeklyPlan)
}

export const getUser = async (clerk_id: string): Promise<UserRegisterFormDataModified | null> => {
    return api.get<UserRegisterFormDataModified>(endpoints.getUser(clerk_id))
}

export const updateUser = async (clerk_id: string, data: UserUpdateData) => {
    return api.put<UserUpdateData>(endpoints.updateUser(clerk_id), data)
}