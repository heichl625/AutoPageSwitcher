import Axios from "axios";

let AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export default AxiosInstance