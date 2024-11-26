import axios from "axios"


const BASE_URL = 'https://theanh1301200004.pythonanywhere.com/'
export const endpoints = {
    'categories': '/categories/',
    'courses':'/courses/'

}
export default axios.create({
    baseURL : BASE_URL
})