<template>
    <div>
        <p></p>
        <div>
            <q-input rounded outlined v-model="text" label="來找找高雄好玩的地方吧" @keydown="sendMessage"
                :disable="isWaitingResponse" color="accent" />
        </div>
        <div>
            <div class="q-gutter-sm">
                <q-radio v-model="shape" val="ai-power" label="ai power" color="accent" />
                <q-radio v-model="shape" val="keyword" label="keyword" color="accent" />
            </div>
        </div>
        <div>
            <q-expansion-item v-model="expanded" :icon="isLoading ? 'refresh' : 'perm_identity'" label="AI 簡介">
                <q-card>
                    <q-card-section style="white-space: pre-line;">
                        {{ introText }}
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </div>
        <div class="q-pa-md row items-start q-gutter-md my-flex-container">
            <q-card v-for="(attraction, index) in attractions" :key="index" class="my-card"
                @click="openNewTab(attraction.url)">
                <img :src="attraction.cover">

                <q-card-section>
                    <div class="text-h6">{{ attraction.name }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    {{ attraction.description }}
                </q-card-section>
            </q-card>
        </div>

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
function limitDescriptionLength(arr) {
    return arr.map(a => {
        const { description, ...rest } = a
        return {
            ...rest,
            description: description.substring(0, 100)
        }
    });
}
export default {

    data() {
        return {
            attractions: [],
            shape: 'ai-power', // Default shape value
            text: '',
            introText: "",
            expanded: false,
            isLoading: false
        };
    },
    async created() {
        try {
            const data = await AttractionApi.getAllAttractions();
            this.attractions = limitDescriptionLength(data.attractions)
        } catch (error) {
            console.error('Error while fetching attractions:', error);
        }
    },
    methods: {
        async startSearch() {
            try {
                if (this.shape === 'keyword') {
                    const result = await AttractionApi.keywordQuery(this.text);
                    this.attractions = limitDescriptionLength(result);
                } else if (this.shape === 'ai-power') {
                    this.isLoading = true
                    const result = await AttractionApi.aiPowerQuery(this.text);
                    this.attractions = limitDescriptionLength(result);
                    await this.getIntro(this.text); // Call getIntro method after setting attractions
                }
            } catch (error) {
                console.error('Error while searching:', error);
            }
        },
        openNewTab(url) {
            window.open(url, '_blank'); // Open url in new tab
        },
        sendMessage(event) {
            if (event.keyCode === 13) { // If Enter key is pressed
                this.startSearch();
            }
        },
        async getIntro(query) {
            this.introText = ""
            const introReader = await AttractionApi.aiIntroduce(
                query
            );
            this.expanded = true
            this.isLoading = true
            while (true) {
                const { done, value } = await introReader.read();
                if (done) break;
                this.introText += new TextDecoder().decode(value);
            }
            this.isLoading = false;
        }
    }
};
</script>
