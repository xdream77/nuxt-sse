import { createEventStream, defineEventHandler } from "#imports";
import { EventPayload, useSseEmitter } from "./utils/tools";

export default defineEventHandler((event) => {
    const stream = createEventStream(event);
    const emitter = useSseEmitter();
    
    stream.onClosed(() => {
        emitter.off('update:client', sendUpdateToClient);
        event.waitUntil( stream.close() ) 
    });

    function sendUpdateToClient(data: EventPayload){
        stream.push(JSON.stringify(data));
    }
    
    emitter.on('update:client', sendUpdateToClient)
    
    return stream.send();
  })