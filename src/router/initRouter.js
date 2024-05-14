import { createMemoryHistory, createRouter } from 'vue-router'
import StoryRefactor from '../page/StoryRefactor.vue';
import Intro from '../page/Intro.vue';
import Form from '../page/Form.vue';
import Attractions from "../page/Attractions.vue"

const routes = [
    { path: '/', component: Intro },
    { path: '/story', component: StoryRefactor },
    { path: '/story/:itineraryId', component: StoryRefactor },
    { path: '/attractions', component: Attractions },
    { path: '/itineraries', component: Attractions },
    { path: '/form', component: Form },
    { path: '/dashboard', component: Form }
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;