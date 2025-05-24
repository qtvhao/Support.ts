import {
  EventConstructor,
  IDomainEvent,
  IEventTopicMapper,
} from "contracts.ts";
export class EventTopicMapper implements IEventTopicMapper {
  private readonly topicToEventMap = new Map<
    string,
    EventConstructor<IDomainEvent>
  >();
  private readonly eventToTopicMap = new Map<
    EventConstructor<IDomainEvent>,
    string
  >();

  register(topic: string, constructor: EventConstructor<IDomainEvent>): void {
    this.topicToEventMap.set(topic, constructor);
    this.eventToTopicMap.set(constructor, topic);
  }

  getEventConstructor(
    topic: string,
  ): EventConstructor<IDomainEvent> | undefined {
    return this.topicToEventMap.get(topic);
  }

  getTopicForEvent(event: EventConstructor<IDomainEvent>): string {
    const topic = this.eventToTopicMap.get(event);
    if (!topic) {
      throw new Error(`No topic mapped for event constructor: ${event.name}`);
    }
    return topic;
  }
}
