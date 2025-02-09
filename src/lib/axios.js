import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"https://studgov1.runasp.net/api",
    withCredentials :true , // to send cookie to every single request 
})
