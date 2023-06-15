import { EventName } from "../enums/events/event-names";
import INotify from "./interfaces/i-notify";

export default class Observer {
  private listeners = new Map<EventName, Array<INotify>>();

  subscribe(nameEvent: EventName, listener: INotify) {
    let listenerArray = this.listeners.get(nameEvent);
    if (!listenerArray) {
      listenerArray = new Array<INotify>();
      this.listeners.set(nameEvent, listenerArray);
    }
    listenerArray.push(listener);
  }

  /**
   * В метод можно пробрасывать, кроме названия события, так же дополнительные данные,
   * которые необходимы подписчику
   */
  notify(nameEvent: EventName) {
    const listenerArray = this.listeners.get(nameEvent);
    if (listenerArray) {
      listenerArray.forEach((listener) => listener.notify(nameEvent));
    }
  }
}
