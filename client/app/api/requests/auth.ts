import * as api from "@/app/api/api"
import {  UserRegisterFormDataModified } from "@/types/UserData"

const endpoints = {
    main: "/users",
    createWeeklyPlan: "/mealplans/weekly"

}

export const registerUser = async (data: UserRegisterFormDataModified) => {
    return api.post(endpoints.main, data)
}

export const createWeeklyPlan = async () => {
    return api.post(endpoints.createWeeklyPlan)
}