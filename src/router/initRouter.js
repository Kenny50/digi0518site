import { createMemoryHistory, createRouter } from 'vue-router'
import Intro from '../page/Intro.vue';
import Form from '../page/Form.vue';
import Attractions from "../page/Attractions.vue"
import Itineraries from "../page/Itineraries.vue"
import Dashboard from "../page/Dashboard.vue"
import StoryBoard from "../page/StoryBoard.vue"
import MysteryBoard from "../page/MysteryBoard.vue"

const routes = [
    { path: '/', component: Intro },
    { path: '/story/:itineraryId', component: StoryBoard },
    { path: '/attractions', component: Attractions },
    { path: '/mystery', component: MysteryBoard },
    { path: '/itineraries', component: Itineraries },
    { path: '/form', component: Form },
    { path: '/dashboard', component: Dashboard }
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;