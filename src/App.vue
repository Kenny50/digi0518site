<template>
    <q-layout view="hHh Lpr lff" container class="background-image" style="height: 100vh">
        <div class=" devsite-sidebar">
            <q-drawer v-model="drawer" show-if-above :width="280" :breakpoint="500" bordered class="bg-secondary">
                <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                    <q-list padding>
                        <q-item v-for="item in menuItems" :key="item.route" :clickable="item.active" v-ripple
                            :to="item.route" class="text-accent">
                            <q-item-section avatar>
                                <q-icon :name="item.icon" />
                            </q-item-section>
                            <q-item-section>
                                {{ item.label }}
                            </q-item-section>
                        </q-item>

                        <!-- <q-item clickable v-ripple class="absolute-bottom text-accent" :to="`/dashboard`">
                            <q-item-section avatar>
                                <q-icon name="info" />
                            </q-item-section>

                            <q-item-section>
                                Dashboard
                            </q-item-section>
                        </q-item> -->
                    </q-list>
                </q-scroll-area>

                <h3 class="absolute-top" style="margin-left: 10px;">原來是打狗</h3>

            </q-drawer>
        </div>
        <q-page-container style="padding-left: 0px;">
            <q-page>

                <div class="devsite-content">
                    <q-page-container>
                        <RouterView />
                    </q-page-container>
                </div>
                <q-page-sticky position="bottom-right" :offset="[18, 18]">
                    <q-btn @click="toggleChat" round color="primary" icon="arrow_forward" class="rotate-45" />
                </q-page-sticky>
                <q-page-sticky position="bottom-right" :offset="[18, 72]">
                    <Chat @minimize="toggleChat" v-show="isChatVisible" />
                </q-page-sticky>
            </q-page>

        </q-page-container>

    </q-layout>

</template>
<style>
body {
    background-image: url('http://57.180.174.82:9000/static/bg.png');
    background-size: cover;
    background-position: center;
    margin: 0;
    height: 100vh;
    overflow: hidden;
}
</style>

<script>
import { ref } from 'vue';
import Chat from './components/Chat.vue';

export default {
    components: {
        Chat
    },
    data() {
        return {
            drawer: ref(false),
            isChatVisible: ref(false),
            menuItems: [
                { route: "/", label: "Home", icon: "home", active: false },//introduce
                { route: "/attractions", label: "景點推薦", icon: "map", active: true },
                { route: "/itineraries", label: "故事行程", icon: "map", active: true },
                { route: "/lang", label: "解謎行程", icon: "map", active: true },
                // { route: "/form", label: "Form", icon: "info", active: true },
                // { route: "/dashboard", label: "Dashboard", icon: "info", active: true },
            ]
        };
    },
    methods: {
        toggleChat() {
            this.isChatVisible = !this.isChatVisible;
        }
    }
};
</script>
