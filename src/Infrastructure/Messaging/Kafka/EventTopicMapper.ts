import { EventConstructor, IDomainEvent } from "contracts.ts";

/**
 * Associates Kafka topics with domain event constructors.
 * Used to determine the correct event class for a given topic.
 */
export class EventTopicMapper {
  private readonly topics = new Map<string, EventConstructor<IDomainEvent>>();

  register(topic: string, eventCtor: EventConstructor<IDomainEvent>): void {
    this.topics.set(topic, eventCtor);
  }

  getEventCtor(topic: string): (EventConstructor<IDomainEvent>) | undefined {
    return this.topics.get(topic);
  }
}