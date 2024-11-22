import mitt, { Emitter } from 'mitt';

export type EventPayload = {
    event: string
    data: Record<string, unknown>
}

export type Events = {
    'update:client': EventPayload
};

const emitter: Emitter<Events> = mitt<Events>();
export function useSseEmitter(): Emitter<Events> { return emitter; }