import { EventName } from "../../enums/events/event-names";

export default interface INotify {
  notify(nameEvent: EventName): void;
}
