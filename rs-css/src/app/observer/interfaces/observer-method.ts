import { EventName } from "../../enums/events/event-names";

export default class ObserverMethod {
  private listeners = new Map<EventName, Array<<T>(param?: T) => void>>();

  subscribe(nameEvent: EventName, listener: <T>(param?: T) => void) {
    let listenerArray = this.listeners.get(nameEvent);
    if (!listenerArray) {
      listenerArray = new Array<<T>(param?: T) => void>();
      this.listeners.set(nameEvent, listenerArray);
    }
    listenerArray.push(listener);
  }

  notify<T>(nameEvent: EventName, param?: T) {
    const listenerArray = this.listeners.get(nameEvent);
    if (listenerArray) {
      listenerArray.forEach((listener) => listener(param));
    }
  }
}
