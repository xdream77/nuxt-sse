<template>
    <div>
        Nuxt module playground!
        {{ msg }}
    </div>
</template>

<script setup lang="ts">
const msg = shallowRef([{}])
if (import.meta.client) {
    const { $sse } = useNuxtApp()
    $sse.connect()

    $sse.emitter.on('server:update', message => {
        if (message.event === 'hello') {

            msg.value = [...msg.value, message.data]
        }
    })
    window.onbeforeunload = function () {
        $sse.disconnect()
    }
}

</script>
