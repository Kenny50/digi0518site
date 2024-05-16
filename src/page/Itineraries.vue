<template>
    <q-card v-for="(itinerary, index) in itineraries" :key="index" class="my-card card-wrapper" flat bordered
        @click="navigateToStory(itinerary.id)">
        <q-card-section horizontal class="card-section" @mouseover="hoverEffect(index, true)"
            @mouseleave="hoverEffect(index, false)" :class="{ 'hovered': isHovered[index] }">
            <q-img class="col-5 rounded-borders" :src="itinerary.cover" />
            <q-card-section>
                <h6>{{ itinerary.title }}</h6>
                <p>{{ itinerary.description }}</p>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<script>
import AttractionApi from "../api/AttractionApi";

export default {
    data() {
        return {
            itineraries: [],
            isHovered: []
        };
    },
    methods: {
        async getAllAttractions() {
            try {
                const response = await AttractionApi.getAllAttractions();
                this.itineraries = response.itineraries;
                console.log(this.itineraries)
                this.isHovered = new Array(this.itineraries.length).fill(false);
            } catch (error) {
                console.error("Error fetching itineraries:", error);
            }
        },
        hoverEffect(index, hover) {
            this.$set(this.isHovered, index, hover);
        },
        navigateToStory(itineraryId) {
            this.$router.push(`/story/${itineraryId}`);
        }
    },
    created() {
        this.getAllAttractions();
    }
};
</script>

<style scoped>
.card-section {
    transition: all 0.3s ease;
}

.hovered {
    transform: scale(1.05);
}

.card-wrapper {
    margin: 10px;
    transition: 0.3s;
}

.card-wrapper:hover {
    margin: 10px;
    background-color: #f2ab5a;
}
</style>