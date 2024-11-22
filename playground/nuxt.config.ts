export default defineNuxtConfig({
    modules: ['../src/module'],
    sse: {
        local: true
    },
    devtools: { enabled: true },
    compatibilityDate: '2024-11-17',
    ssr: false
})