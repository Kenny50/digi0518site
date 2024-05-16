import axiosInstance from "./instance.js";

const DashboardApi = {
    //2024May
    //lowTraffic
    //lowItinerary
    //lowAttraction
    async getSummary(query) {//py
        const response = await axiosInstance.get(`/summary?query=${query}`)
        return response.data
    },
    async getSummaryByItinerary(id) {//py

    },
    async getAllForm() {
        //交通、行程體驗、景點體驗、行程哀低、文字
        const response = await axiosInstance.get('/form')
        return response.data;
    },
    async getAllRateAverage() {
        const response = await axiosInstance.get('/form/rate-average')
        return response.data;
    },
    async getTrafficRate() {
        const response = await axiosInstance.get('/form/rate/traffic')
        return response.data;
    }
}

export default DashboardApi;