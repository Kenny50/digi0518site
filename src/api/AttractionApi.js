import axiosInstance from "./instance.js";

const AttractionApi = {
    async getAllAttractions() {
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
    },
    async keywordQuery(query) {
        try {
            const response = await axiosInstance.get(`/attractions/keyword?query=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error while start itinerary:', error);
            throw error;
        }
    },
    async aiPowerQuery(query) {
        try {
            const response = await axiosInstance.get(`/attractions/ai-powered?query=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error while start itinerary:', error);
            throw error;
        }
    },
    async aiIntroduce(query) {
        try {
            const responseStream = await fetch(`${import.meta.env.VITE_API_URL}/attractions/ai-powered/intro?query=${query}`, {
                method: 'GET'
            });
            return responseStream.body.getReader();
        } catch (error) {
            console.error('Error while start itinerary:', error);
            throw error;
        }
    }
}

export default AttractionApi;
