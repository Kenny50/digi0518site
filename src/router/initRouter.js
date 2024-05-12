import { createMemoryHistory, createRouter } from 'vue-router'
import StoryRefactor from '../components/StoryRefactor.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Chat from '../components/Chat.vue';
import Attractions from "../components/Attractions.vue"
import Attraction from "../components/Attraction.vue"

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