<template>
    <q-layout view="hHh Lpr lff" container style="height: 100vh">
        <div class=" devsite-sidebar">
            <q-drawer v-model="drawer" show-if-above :width="280" :breakpoint="500" bordered class="bg-primary">
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

                        <q-item clickable v-ripple class="absolute-bottom text-accent" :to="`/dashboard`">
                            <q-item-section avatar>
                                <q-icon name="info" />
                            </q-item-section>

                            <q-item-section>
                                Dashboard
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-scroll-area>

                <h3 class="absolute-top">城市智人</h3>

            </q-drawer>
        </div>

        <div class="devsite-content">
            <q-page-container>
                <RouterView />
            </q-page-container>
        </div>
    </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
    data() {
        return {
            drawer: ref(false),
            menuItems: [
                { route: "/", label: "Home", icon: "home", active: false },//introduce
                { route: "/attractions", label: "Attractions", icon: "map", active: true },
                { route: "/itineraries", label: "Itineraries", icon: "map", active: true },
                // { route: "/form", label: "Form", icon: "info", active: true },
                // { route: "/dashboard", label: "Dashboard", icon: "info", active: true },
            ]
        };
    }
};
</script>

<style scoped>
/* Your existing styles */
</style>
