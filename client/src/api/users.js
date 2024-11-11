import axios from "axios"
import { URL } from "../constants/constants"

const users = axios.create({
    baseURL: `${URL}/users`
})

export const SaveUser = (data) => users.post('', data)

export const EditUser = (data) => users.put('/edit', data)