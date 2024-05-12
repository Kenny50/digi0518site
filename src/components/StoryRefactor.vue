<template>
    <div class="q-px-lg q-py-md">
        <q-timeline color="secondary">
            <q-timeline-entry v-for="(item, index) in itinerary" :key="index" :title="item.attractionName">
                <div>
                    {{ item.story }}
                </div>
            </q-timeline-entry>
        </q-timeline>
        <q-btn v-if="state.nextAttraction" outline style="color: goldenrod;" label="Goldenrod"
            @click="checkInLocation()"></q-btn>
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
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
        });
        const updateState = (newState) => {
            state.value = {
                ...state.value,
                ...newState
            }
        }

        const getSession = () => state.value.session;

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
                    attractionName: location.attractionName
                })
            } catch (error) {
                console.error("Error checking in location:", error);
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
                ...newItinerary,
            });

            await startStoryStreamThenSave(state.value.step);
        };

        const startStoryStreamThenSave = async (curStep) => {
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
            });
            await startStoryStreamThenSave(newStep);
        });
        watch(state, (newState) => {
            console.log(newState)
        });

        return {
            state,
            itinerary,
            checkInLocation
        };
    },
};
</script>