<template>
    <div class="q-pa-md row items-start q-gutter-md my-flex-container">
        <q-card v-for="(attraction, index) in attractions" :key="index" class="my-card"
            @click="redirectToAttraction(attraction.id)">
            <img :src="attraction.cover">

            <q-card-section>
                <div class="text-h6">{{ attraction.name }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                {{ attraction.description }}
            </q-card-section>
        </q-card>
    </div>
</template>

<style>
.my-flex-container {
    display: flex;
    flex-wrap: wrap;
}

.my-card {
    flex: 1 0 23%;
}

@media (max-width: 1200px) {
    .my-card {
        flex: 1 0 31%;
    }
}

@media (max-width: 992px) {
    .my-card {
        flex: 1 0 48%;
    }
}

@media (max-width: 768px) {
    .my-card {
        flex: 1 0 100%;
    }
}
</style>


<script>
import AttractionApi from "../api/AttractionApi";

export default {

    data() {
        return {
            attractions: []
        };
    },
    async created() {
        try {
            const data = await AttractionApi.getAllItinerary();
            const sl = data.attractions.map(a => {
                const { description, ...rest } = a
                return {
                    ...rest,
                    description: description.substring(0, 100)
                }
            });
            this.attractions = sl
        } catch (error) {
            console.error('Error while fetching attractions:', error);
        }
    },
    methods: {
        redirectToAttraction(id) {
            this.$router.push({ path: `/attraction/${id}` });
        }
    }
};
</script>