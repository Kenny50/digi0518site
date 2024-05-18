<template>
    <div class="q-px-lg q-py-md">
        <q-timeline color="secondary">
            <q-timeline-entry v-for="(item, index) in itinerary" :key="index" :title="item.attractionName"
                :style="{ height: '80vh' }">
                <q-scroll-area style="height: 80vh;">

                    <div class="timeline-entry-content">
                        <div class="text-container" style="white-space: pre-line;">
                            <p>{{ item.story }}</p>
                        </div>
                        <div class="image-container">
                            <img :src="item.cover" loading="lazy" alt="Image"
                                style="object-fit: contain; width: 100%; height:100%; display: block;" />
                        </div>

                    </div>
                </q-scroll-area>

            </q-timeline-entry>
        </q-timeline>
        <q-btn id="btn" size="xl" color="accent" v-if="state.nextAttraction" outline style="color: goldenrod;"
            label="輸入線索" :disabled="isLoading" @click="checkInLocation"></q-btn>
        <p id="btm"></p>
        <q-dialog v-model="showDialog" persistent>
            <q-card>
                <q-card-section>
                    <div class="text-h6">Message</div>
                </q-card-section>
                <q-card-section>
                    <div>{{ adMessage }}</div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="領取獎勵" size="xl" color="accent" v-close-popup @click="handleDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>
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
        const showDialog = ref(false);
        const adMessage = ref("")
        const locationSlot = ref({})

        const state = ref({
            session: "",
            step: 0,
            currentAttraction: undefined,
            nextAttraction: undefined,
            attractionName: "",
            cover: "",
        })
        const updateState = (newState) => {
            state.value = {
                ...state.value,
                ...newState
            }
        }
        const updateDialog = (message, isShowDialog, location) => {
            adMessage.value = message
            showDialog.value = isShowDialog

            locationSlot.value = location
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

                // updateState({
                //     step: location.currentStep,
                //     nextAttraction: location.nextAttraction,
                //     currentAttraction: location.currentAttraction,
                //     attractionName: location.attractionName,
                //     cover: location.cover,
                // })
                console.log(location)
                updateDialog(location.message, true, location)

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

        const handleDialog = () => {
            console.log("Dialog status before:", showDialog.value);
            showDialog.value = false;
            console.log("Dialog status after:", showDialog.value);
            updateState({
                step: locationSlot.value.currentStep,
                nextAttraction: locationSlot.value.nextAttraction,
                currentAttraction: locationSlot.value.currentAttraction,
                attractionName: locationSlot.value.attractionName,
                cover: locationSlot.value.cover,
            })
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
            handleDialog,
            showDialog,
            adMessage
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
    font-size: 16px;
    line-height: 20px;
}
</style>