<template>
    <q-carousel v-model="currentSlideIndex" swipeable animated height="300px"
        class="bg-purple text-white rounded-borders" ref="carousel">
        <q-carousel-slide v-for="(item, index) in formData" :key="index" class="column no-wrap flex-center">
            <div>
                <h4>{{ item.id }}</h4>
                <h3>交通滿意度</h3>
                <q-rating :value="item.trafficRate" size="3.5em" color="green-5" icon="star_border"
                    icon-selected="star" />
                <h3>行程滿意度</h3>
                <q-rating :value="item.itineraryRate" size="3.5em" color="green-5" icon="star_border"
                    icon-selected="star" />
                <h3>景點滿意度</h3>
                <q-rating :value="item.attractionRate" size="3.5em" color="green-5" icon="star_border"
                    icon-selected="star" />
            </div>
        </q-carousel-slide>
    </q-carousel>
</template>

<script>
import { ref } from 'vue'; // Import ref from Vue 3

import DashboardApi from "../api/DashboardApi";

export default {
    setup() {
        const currentSlideIndex = ref(0); // Declare currentSlideIndex as a ref

        const carousel = ref(null); // Declare carousel as a ref

        const formData = ref([]); // Declare formData as a ref

        // Fetch data from the API when the component is mounted
        DashboardApi.getAllForm()
            .then(forms => {
                formData.value = forms; // Update the value of formData
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        return { currentSlideIndex, carousel, formData }; // Expose variables to the template
    }
};
</script>