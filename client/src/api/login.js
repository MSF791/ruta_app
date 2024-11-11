import axios from "axios"
import { URL } from "../constants/constants"

const users = axios.create({
    baseURL: `${URL}/login`
})

export const LogInToken = (data) => users.post('', data, { withCredentials: true })