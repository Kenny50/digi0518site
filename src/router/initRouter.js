import { createMemoryHistory, createRouter } from 'vue-router'
import StoryRefactor from '../page/StoryRefactor.vue';
import HelloWorld from '../page/HelloWorld.vue';
import Chat from '../page/Chat.vue';
import Attractions from "../page/Attractions.vue"
import Attraction from "../page/Attraction.vue"

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/story', component: StoryRefactor },
    { path: '/story/:itineraryId', component: StoryRefactor },
    { path: '/attractions', component: Attractions },
    { path: '/attraction/:id', component: Attraction, props: true },
    { path: '/chat', component: Chat }
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;