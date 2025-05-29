import {
  EventConstructor,
  IDomainEvent,
  IDomainEventMapper,
  IDomainEventMapperRegistry,
  Message,
} from "contracts.ts";

// Support.ts/src/Infrastructure/Messaging/DomainEventMapperRegistry.ts
export class DomainEventMapperRegistry
  implements IDomainEventMapperRegistry<IDomainEvent, Message> {
  private registry = new Map<
    EventConstructor<IDomainEvent>,
    IDomainEventMapper<Message, IDomainEvent>
  >();

  set<T extends IDomainEvent>(
    eventCtor: EventConstructor<T>,
    domainEventMapper: IDomainEventMapper<Message, IDomainEvent>,
  ): void {
    this.registry.set(eventCtor, domainEventMapper);
  }

  get<T extends IDomainEvent>(
    eventCtor: EventConstructor<T>,
  ): IDomainEventMapper<Message, IDomainEvent> {
    const mapper = this.registry.get(eventCtor);
    if (!mapper) {
      throw new Error(
        `No domain event mapper registered for constructor: ${eventCtor.name}`,
      );
    }
    return mapper;
  }
}
