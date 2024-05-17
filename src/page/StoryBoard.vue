<template>
    <div class="q-px-lg q-py-md">
        <q-timeline color="secondary">
            <q-timeline-entry v-for="(item, index) in itinerary" :key="index" :title="item.attractionName"
                :style="{ height: '80vh' }">
                <div class="timeline-entry-content">
                    <div class="text-container">
                        <h6>{{ item.story }}</h6>
                    </div>
                    <div class="image-container">
                        <img :src="item.cover" loading="lazy" alt="Image"
                            style="object-fit: contain; width: 100%; height:100%; display: block;" />
                    </div>

                </div>
            </q-timeline-entry>
        </q-timeline>
        <q-btn id="btn" v-if="state.nextAttraction" outline style="color: goldenrod;" label="Goldenrod"
            :disabled="isLoading" @click="checkInLocation"></q-btn>
        <p id="btm"></p>
    </div>
</template>

<script>
import { onMounted, ref, watch, nextTick } from "vue";
import { useRoute } from 'vue-router';
import StoryApi from "../api/StoryApi";

export default {
    setup() {
        const itinerary = ref([]);
        const route = useRoute()
        const itineraryId = route.params.itineraryId ?? 177;

        const state = ref({
            session: "",
            step: 0,
            currentAttraction: undefined,
            nextAttraction: undefined,
            attractionName: "",
            cover: ""
        })
        const updateState = (newState) => {
            state.value = {
                ...state.value,
                ...newState
            }
        }

        const getSession = () => state.value.session;
        const isLoading = ref(false); // Flag to disable button

        const checkInLocation = async () => {
            try {
                const location = await StoryApi.checkInLocation(
                    state.value.session,
                    itineraryId,
                    state.value.step,
                    state.value.nextAttraction
                );
                updateState({
                    step: location.currentStep,
                    nextAttraction: location.nextAttraction,
                    currentAttraction: location.currentAttraction,
                    attractionName: location.attractionName,
                    cover: location.cover
                })
            } catch (error) {
                console.error("Error checking in location:", error);
            } finally {
            }
        };

        const startItinerary = async () => {
            const newItinerary = await StoryApi.startItinerary(itineraryId);

            updateState({
                session: newItinerary.session,
                step: newItinerary.step,
                nextAttraction: newItinerary.nextAttraction
            })

            itinerary.value.push({
                story: "",
                cover: import.meta.env.VITE_API_URL + "/static/digi.png",
                ...newItinerary,
            });

            await startStoryStreamThenSave(state.value.step);
        };

        const startStoryStreamThenSave = async (curStep) => {
            isLoading.value = true
            const initStoryReader = await StoryApi.stroyStream(
                state.value.session,
                itineraryId,
                curStep
            );
            while (true) {
                const { done, value } = await initStoryReader.read();
                if (done) break;
                itinerary.value[curStep].story += new TextDecoder().decode(value);
            }
            isLoading.value = false
            const thisSectionStory = itinerary.value[curStep];
            await StoryApi.recordStory({
                attractionId: state.value.currentAttraction,
                ...thisSectionStory,
            });
        };

        onMounted(startItinerary);

        watch(() => state.value.step, async (newStep) => {
            itinerary.value.push({
                session: getSession(),
                itineraryId,
                step: newStep,
                story: "",
                attractionName: state.value.attractionName,
                cover: state.value.cover,
            });
            await nextTick()
            // document.getElementById('btn').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('btm').scrollIntoView({ behavior: 'smooth' });

            await startStoryStreamThenSave(newStep);
        });

        watch(state, (newState) => {
            console.log(newState)
        });

        return {
            state,
            itinerary,
            checkInLocation,
            isLoading,
        };
    },
};
</script>

<style>
.timeline-entry-content {
    overflow: hidden;
    display: flex;
    height: 90vh;
}

.image-container {
    overflow: hidden;
    flex: 1;
}

.text-container {
    color: black;
    /* Adjust text color as needed */
    text-align: left;
    padding: 20px;
    margin: 0;
    flex: 2;
    letter-spacing: 2em;
    line-height: 24px;
}
</style>