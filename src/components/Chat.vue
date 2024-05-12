<template>
    <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 800px; min-width: 400px;">
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message>
                <q-spinner-dots size="2rem" />
            </q-chat-message>
        </div>
    </div>
</template>

<script>
// using an array to save order
// get text from input box
// when enter clicked, send api
// update a state 
    // display waiting
    // block input box
// once api response, update the state
// push the response into array
</script>