import { useSseEmitter } from "#sse"


export default defineEventHandler(() => {
    const emitter = useSseEmitter()
    emitter.emit('update:client', {
        event: 'hellosss',
        data: { geh: 'kackn' }
    })

    emitter.emit('update:client', {
        event: 'hello',
        data: { geh: 'weg' }
    })
    return 'Message Sent'
})