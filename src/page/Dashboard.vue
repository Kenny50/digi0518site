<template>
    <div>
        <h2 class="padding:5px">原來是打狗回饋</h2>
    </div>
    <div class="charts-container">
        <AverageRateBarChart />
        <TrafficRateBarChart />
    </div>
    <div class="btns-container">
        <q-btn outline rounded color="avatar" label="全總結" @click="fetchSummary('all')" />
        <!-- <q-btn outline rounded color="avatar" label="交通低分原因總結" @click="fetchSummary('traffic')" /> -->

        <q-dialog v-model="isDialogOpen">
            <q-card style="width: 700px; max-width: 80vw;">

                <q-card-section class="q-pt-none" style="white-space: pre-line;">
                    {{ dialogContent }}
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>

    <div v-for="(item, index) in formData" :key="index" class="column no-wrap flex">
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
}

.btns-container {
    display: flex;
    padding: 5px;
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
        const isDialogOpen = ref(false)
        const dialogContent = ref('');

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

        const fetchSummary = async (query) => {
            const sum = await DashboardApi.getSummary(query)
            console.log(sum)

            dialogContent.value = sum.zh;
            isDialogOpen.value = true;
        };

        onMounted(() => {
            fetchData(); // Fetch data when the component is mounted
        });

        return {
            formData,
            isDialogOpen,
            dialogContent,
            fetchSummary
        };
    }
}
</script>
