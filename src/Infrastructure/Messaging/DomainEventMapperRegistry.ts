import {
  IDomainEvent,
  IDomainEventMapper,
  IDomainEventMapperRegistry,
} from "contracts.ts";

/**
 * Associates Kafka topics with domain event constructors.
 * Used to determine the correct event class for a given topic.
 */
export class DomainEventMapperRegistry
  implements IDomainEventMapperRegistry<IDomainEvent, object> {
  private readonly topics = new Map();

  set(
    topic: string,
    domainEventMapper: IDomainEventMapper<object, IDomainEvent>,
  ): void {
    this.topics.set(topic, domainEventMapper);
  }

  get(topic: string): IDomainEventMapper<object, IDomainEvent> {
    return this.topics.get(topic);
  }
}
