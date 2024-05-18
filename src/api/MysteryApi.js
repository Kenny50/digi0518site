import axiosInstance from "./instance.js";

const MysteryApi = {
    async startItinerary(itineraryId) {
        try {
            const response = await axiosInstance.post('/startItinerary', {
                itineraryId: itineraryId,
            });
            return response.data;
        } catch (error) {
            console.error('Error while start itinerary:', error);
            throw error;
        }
    },

    async checkInLocation(session, itineraryId, previousStep, locationId) {
        try {
            const response = await axiosInstance.post('/checkinLocation', {
                session: session,
                itineraryId: itineraryId,
                previousStep: previousStep,
                locationId: locationId
            });
            return response.data;
        } catch (error) {
            console.error('Error while checking in location:', error);
            throw error;
        }
    },

    async recordStory({ session, itineraryId, step, story, attractionId }) {
        try {
            const response = await axiosInstance.post('/storyRecord', {
                session: session,
                itineraryId: itineraryId,
                step: step,
                story: story,
                attractionId: attractionId
            });
            return response.data;
        } catch (error) {
            console.error('Error while recording story:', error);
            throw error;
        }
    },

    async mysteryStream(session, itineraryId, step, lang) {
        const params = new URLSearchParams({ session, itineraryId, step, lang });

        const responseStream = await fetch(`${import.meta.env.VITE_API_URL}/mysteryStream?${params}`, {
            method: 'GET'
        });
        return responseStream.body.getReader();
    },

    async getHistoryStoryBySession(session) {
        try {
            const response = await axiosInstance.get('/get-history-story-by-session', {
                session: session
            });
            return response.data;
        } catch (error) {
            console.error('Error while recording story:', error);
            throw error;
        }
    }
}

export default MysteryApi;
