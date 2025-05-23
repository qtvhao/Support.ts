import { EventConstructor, IDomainEvent, IEventTopicMapper } from "contracts.ts";

export class EventTopicMapper implements IEventTopicMapper {
  private static readonly topicToEventMap: Map<string, EventConstructor<IDomainEvent>> = new Map([
    // Add mappings: [topic, eventConstructor]
    // ['user.created', UserCreatedEvent],
    // ['order.placed', OrderPlacedEvent],
    // ...
  ]);

  private static readonly eventToTopicMap: Map<EventConstructor<IDomainEvent>, string> = new Map(
    Array.from(EventTopicMapper.topicToEventMap.entries()).map(([topic, constructor]) => [constructor, topic])
  );

  getEventConstructor(topic: string): EventConstructor<IDomainEvent> | undefined {
    return EventTopicMapper.topicToEventMap.get(topic);
  }

  getTopicForEvent(event: EventConstructor<IDomainEvent>): string {
    const topic = EventTopicMapper.eventToTopicMap.get(event);
    if (!topic) {
      throw new Error(`No topic mapped for event constructor: ${event.name}`);
    }
    return topic;
  }
}