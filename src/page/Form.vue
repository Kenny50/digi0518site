<template>
    <q-page class="q-pa-md">
        <q-card>
            <q-card-section>
                <q-form @submit="submitForm">
                    <q-select v-model="selectedTrip" label="參加的行程" :options="tripOptions" />
                    <q-checkbox v-model="problems" :options="problemOptions" inline label="困擾地方" />
                    <q-input v-model="feedback" label="回饋" type="textarea" />
                    <q-btn type="submit" label="提交" color="primary" class="q-mt-md" />
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            selectedTrip: null,
            tripOptions: [
                '人權紀念-捷運景點一日遊',
                '郵輪假期-網紅樂打卡',
                '郵輪假期-商圈購歡樂',
                '郵輪假期-踩風迎蔚藍',
                '郵輪假期-鼓鹽嚐美味',
                '郵輪假期-輕軌遊亞灣'
                // Add more trip options here if needed
            ],
            problems: [],
            problemOptions: [
                '住宿',
                '交通',
                '行程安排',
                '餐飲',
                // Add more problem options here if needed
            ],
            feedback: ''
        };
    },
    methods: {
        submitForm() {
            const formData = {
                selectedTrip: this.selectedTrip,
                problems: this.problems,
                feedback: this.feedback
            };
            // Handle form submission here, such as sending data to a server
            console.log(formData);
            // Reset form fields after submission if needed
            this.selectedTrip = null;
            this.problems = [];
            this.feedback = '';
        }
    }
};
</script>