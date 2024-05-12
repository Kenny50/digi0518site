<template>

    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
        <div class="devsite-sidebar">

            <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500" bordered
                :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
                <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">

                    <q-list padding>
                        <q-item clickable v-ripple to="/">
                            <q-item-section avatar>
                                <q-icon name="home" />
                            </q-item-section>
                            <q-item-section>
                                Home
                            </q-item-section>
                        </q-item>

                        <q-item active clickable v-ripple to="/story">
                            <q-item-section avatar>
                                <q-icon name="inbox" />
                            </q-item-section>
                            <q-item-section>
                                Story
                            </q-item-section>
                        </q-item>

                        <q-item active clickable v-ripple to="/attractions">
                            <q-item-section avatar>
                                <q-icon name="map" />
                            </q-item-section>
                            <q-item-section>
                                Attractions
                            </q-item-section>
                        </q-item>

                        <q-item active clickable v-ripple to="/chat">
                            <q-item-section avatar>
                                <q-icon name="map" />
                            </q-item-section>
                            <q-item-section>
                                chat
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

import { ref } from 'vue'
export default {
    data() {
        return {
            drawer: ref(false)
        };
    }
};
</script>

<style scoped>
.q-drawer-list {
    padding: 20px;
}

.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}


.devsite-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 24px 0;
    max-width: 936px;
    min-width: 0;
}

.devsite-sidebar {
    grid-column: 3;
    grid-row: 1;
    min-width: 0;
    width: auto;
}
</style>