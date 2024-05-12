import axiosInstance from "./instance.js";

const AttractionApi = {
    async getAllItinerary() {
        try {
            const response = await axiosInstance.get('/attractions');
            return response.data;
        } catch (error) {
            console.error('Error while start itinerary:', error);
            throw error;
        }
    },
    async getSingleAttraction(id) {
        try {
            const response = await axiosInstance.get(`/attraction/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error while start itinerary:', error);
            throw error;
        }
    }
}

export default AttractionApi;
