<template>
    <div>
        <p>story</p>
        <p>{{ story }}</p>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import StoryApi from "../api/StoryApi";

export default {
    name: "StreamDisplay",
    setup() {
        const route = useRoute()

        const story = ref("");
        const session = ref("");
        const step = ref(0);
        const itineraryId = route.params.itineraryId ?? 181;

        onMounted(async () => {

            // Start a new itinerary
            const newItinerary = await StoryApi.startItinerary(itineraryId);
            session.value = newItinerary.session;
            step.value = newItinerary.step;
            console.log("get reader")
            // Fetch the opening story stream
            const reader = await StoryApi.stroyStream(
                session.value,
                itineraryId,
                step.value
            );

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                story.value += new TextDecoder().decode(value)
            }

        });

        return {
            story,
        };
    },
};
</script>