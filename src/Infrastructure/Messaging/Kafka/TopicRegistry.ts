import { IDomainEvent } from "contracts.ts";

/**
 * Associates Kafka topics with domain event constructors.
 * Used to determine the correct event class for a given topic.
 */
export class TopicRegistry {
  private readonly topics = new Map<string, new (...args: any[]) => IDomainEvent>();

  register(topic: string, eventCtor: new (...args: any[]) => IDomainEvent): void {
    this.topics.set(topic, eventCtor);
  }

  getEventCtor(topic: string): (new (...args: any[]) => IDomainEvent) | undefined {
    return this.topics.get(topic);
  }
}