<template>
    <div class="q-pa-md  justify-center"
        style=" background-color: white;   outline: #693a04 solid 1px; border-radius:10px;">

        <div style="width: 300px; height: 500px;">
            <q-scroll-area style="height: 90%; max-width: 100%;">

                <q-chat-message v-for="(message, index) in chatMessage" :key="index" :text="message.text"
                    :sent="message.isSelf" style="white-space: pre-line;" />
                <q-chat-message v-if="isWaitingResponse">
                    <q-spinner-dots size="2rem" />
                </q-chat-message>
            </q-scroll-area>
            <q-input rounded outlined v-model="text" label="問問高雄旅遊小幫手吧" @keydown="sendMessage"
                :disable="isWaitingResponse" color="accent" />
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
        },
        minimizeChat() {
            this.$emit('minimize');
        }
    }
}
</script>