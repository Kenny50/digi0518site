<template>
    <div>
        <q-dialog v-model="showDialog">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Please choose language/ 請選擇語言</div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="中文" size="xl" @click="navigateToMystery" color="accent" />
                    <q-btn label="英文" size="xl" @click="navigateToMysteryDynamic" color="accent" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    name: 'DialogComponent',
    data() {
        return {
            showDialog: true,
        };
    },
    methods: {
        navigateToMystery() {
            this.showDialog = false;
            this.$router.push('/mystery');
        },
        navigateToMysteryDynamic(param) {
            this.showDialog = false;
            this.$router.push(`/mystery/en`);
        },
    },
};
</script>