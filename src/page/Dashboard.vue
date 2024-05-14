<template>
    <div>
        <h2>旗山區回饋</h2>
    </div>
    <div class="charts-container">
        <AverageRateBarChart />
        <TrafficRateBarChart />
    </div>
    <div class="btns-container">
        <q-btn outline rounded color="primary" label="全總結" @click="medium = true" />
        <q-btn outline rounded color="primary" label="交通低分原因總結" @click="medium = true" />
        <q-btn outline rounded color="primary" label="景點低分原因總結" @click="medium = true" />
        <q-btn outline rounded color="primary" label="行程低分原因總結" @click="medium = true" />

        <q-dialog v-model="medium">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Medium</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Click/Tap on the backdrop.
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>



    <div v-for="(item, index) in formData" :key="index" class="column no-wrap flex-center">
        <q-expansion-item v-model="item.expanded" icon="perm_identity" :label="item.createdAt" :caption="item.id">
            <div class="charts-container">
                <h5>交通滿意度</h5>
                <q-rating :modelValue="item.trafficRate" size="2.5em" color="green-5" icon="star_border"
                    icon-selected="star" />
            </div>
            <div class="charts-container">

                <h5>行程滿意度</h5>
                <q-rating :modelValue="item.itineraryRate" size="2.5em" color="green-5" icon="star_border"
                    icon-selected="star" />
            </div>
            <div class="charts-container">

                <h5>景點滿意度</h5>
                <q-rating :modelValue="item.attractionRate" size="2.5em" color="green-5" icon="star_border"
                    icon-selected="star" />
            </div>
        </q-expansion-item>

    </div>

</template>

<style>
.charts-container {
    display: flex;
    justify-content: space-between;
    /* Positions items with space between them */
}

.btns-container {
    display: flex;

    /* Positions items with space between them */
}
</style>

<script>
import AverageRateBarChart from "../components/AverageRateBarChart.vue"
import TrafficRateBarChart from "../components/TrafficRateBarChart.vue"
import AllForm from "../components/AllForm.vue"
import { ref, onMounted } from 'vue';
import DashboardApi from "../api/DashboardApi";

export default {
    components: {
        AverageRateBarChart,
        TrafficRateBarChart,
        AllForm
    },
    setup() {
        const formData = ref([]);
        const medium = ref(false)

        const fetchData = () => {
            DashboardApi.getAllForm()
                .then(forms => {
                    console.log(forms[0])
                    formData.value = forms.map(form => {
                        return {
                            ...form,
                            expanded: false
                        }
                    }); // Update the value of formData
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // Handle error, show error message to the user, etc.
                });
        };

        onMounted(() => {
            fetchData(); // Fetch data when the component is mounted
        });

        return {
            formData,
            medium
        };
    }
}
</script>
