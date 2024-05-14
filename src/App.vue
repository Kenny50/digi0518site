<template>
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
        <div class="devsite-sidebar">
            <q-drawer v-model="drawer" show-if-above :width="280" :breakpoint="500" bordered
                :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
                <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
                    <q-list padding>
                        <q-item v-for="item in menuItems" :key="item.route" :clickable="item.active" v-ripple
                            :to="item.route">
                            <q-item-section avatar>
                                <q-icon :name="item.icon" />
                            </q-item-section>
                            <q-item-section>
                                {{ item.label }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-scroll-area>
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
                { route: "/form", label: "Form", icon: "info", active: true },
                { route: "/dashboard", label: "Dashboard", icon: "info", active: true },
            ]
        };
    }
};
</script>

<style scoped>
/* Your existing styles */
</style>
