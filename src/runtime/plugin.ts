import { defineNuxtPlugin } from '#app';
import mitt, { type Emitter } from 'mitt';

export type EventPayload = {
    event: string,
    data: Record<string, unknown>
}

export type Events = { 'server:update': EventPayload };

export default defineNuxtPlugin((_nuxtApp) => {
    const emitter: Emitter<Events> = mitt<Events>()

    const sseEndpoint: string = _nuxtApp.$config?.public?.sseUrl as string || ''

    let stream: EventSource | null

    function listenToStream(event: MessageEvent) {
        const message = JSON.parse(event.data)
        emitter.emit('server:update', message)
    }

    const sse = {
        connect() {
            if (!stream) {
                stream = new EventSource(sseEndpoint);
                stream.addEventListener('message', listenToStream);
            }
            return this
        },
        disconnect() {
            if (stream) {
                stream.removeEventListener('message', listenToStream);
                stream.close()
                stream = null
            }
            return this
        },
        emitter
    }

    return { provide: { sse } }
})
