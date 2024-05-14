<template>
    <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 800px; min-width: 400px;">
            <q-chat-message v-for="(message, index) in chatMessage" :key="index" :text="message.text"
                :sent="message.isSelf" />
            <q-chat-message v-if="isWaitingResponse">
                <q-spinner-dots size="2rem" />
            </q-chat-message>
        </div>
        <div>
            <q-input rounded outlined v-model="text" label="問問高雄旅遊小幫手吧" @keydown="sendMessage"
                :disable="isWaitingResponse" />
        </div>
    </div>
</template>

<script>
import ChatApi from '../api/ChatApi'
import { ref, onMounted } from 'vue';

export default {
    data() {
        return {
            chatMessage: [],
            session: "",
            text: "",
            isWaitingResponse: false
        }
    },
    mounted() {
        this.getSession();
    },
    methods: {
        async getSession() {
            try {
                const ss = await ChatApi.getSession()
                console.log(ss.session)
                this.session = ss.session;
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        },
        async sendMessage(event) {
            if (event.keyCode != 13) return
            console.log('key', console.log(event, event.keyCode));
            const query = this.text
            this.chatMessage.push({ text: [query], isSelf: true })
            this.text = ""
            this.isWaitingResponse = true
            try {
                const res = await ChatApi.sendMessage(query, this.session)
                this.chatMessage.push({ text: [res.response], isSelf: false })
            } finally {
                this.isWaitingResponse = false
            }
        }
    }
}
</script>