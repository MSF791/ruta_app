import axios from "axios"
import { URL } from "../constants/constants"

const route = axios.create({
    baseURL: `${URL}/route`
})

export const SaveRoute = (data) => route.post('', data)