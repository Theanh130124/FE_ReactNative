import axios from "axios"


const BASE_URL = 'https://theanh1301200004.pythonanywhere.com/'
export const endpoints = {
    // Tên của các API
    'categories': '/categories/',
    'courses': '/courses/',
    //lessons là tên endpoint
    'lessons':(courseId) => `/courses/${courseId}/lessons/`,
    'lessons-details': (lessonId) => `/lessons/${lessonId}`,
    'comments': (lessonId) => `/lessons/${lessonId}/comments`,

}
export default axios.create({
    baseURL: BASE_URL
})