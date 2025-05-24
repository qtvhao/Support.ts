import {
  IDomainEvent,
  IDomainEventMapper,
  IDomainEventMapperRegistry,
  Message,
} from "contracts.ts";

/**
 * Associates Kafka topics with domain event constructors.
 * Used to determine the correct event class for a given topic.
 */
export class DomainEventMapperRegistry
  implements IDomainEventMapperRegistry<IDomainEvent, Message> {
  private readonly topics = new Map();

  set(
    topic: string,
    domainEventMapper: IDomainEventMapper<Message, IDomainEvent>,
  ): void {
    this.topics.set(topic, domainEventMapper);
  }

  get(topic: string): IDomainEventMapper<Message, IDomainEvent> {
    return this.topics.get(topic);
  }
}
