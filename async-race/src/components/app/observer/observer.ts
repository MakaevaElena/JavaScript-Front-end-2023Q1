import { EventName } from '../../../enums/events/events-names';

export default class Observer {
    private listeners = new Map<EventName, Array<<T>(param?: T) => void>>();

    subscribe(EventName: EventName, listener: <T>(param?: T) => void) {
        let listeners = this.listeners.get(EventName);
        if (!listeners) {
            listeners = new Array<<T>(param?: T) => void>();
            this.listeners.set(EventName, listeners);
        }
        listeners.push(listener);
    }

    notify<T>(EventName: EventName, param?: T) {
        const listenerArray = this.listeners.get(EventName);
        if (listenerArray) {
            listenerArray.forEach((listener) => listener(param));
        }
    }
}
