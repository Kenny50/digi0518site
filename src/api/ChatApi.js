import axiosInstance from "./instance.js";

const ChatApi = {
    async sendMessage(message, session_id, clean_history = false) {
        try {
            const response = await axiosInstance.get(`${import.meta.env.VITE_PY_API_URL}/rag?query=${message}&session_id=${session_id}&clean_history=${clean_history}`);
            return response.data;
        } catch (error) {
            console.error('Error while start itinerary:', error);
            throw error;
        }
    },
    async getSession() {
        try {
            const response = await axiosInstance.post("/session");
            return response.data;
        } catch (error) {
            console.error('Error while start itinerary:', error);
            throw error;
        }
    },

}

export default ChatApi;