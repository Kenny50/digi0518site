<template>
    <div>
        <iframe :src="url"></iframe>
    </div>
</template>

<script>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router' // Removed useRouter since it's not used
import AttractionApi from '../api/AttractionApi';

export default {
    setup() {
        const url = ref("");
        const route = useRoute()


        AttractionApi.getSingleAttraction(route.params.id)
            .then((a) => {
                console.log(a.url)
                url.value = a.url;
            })


        return {
            url
        };
    }
}
</script>
