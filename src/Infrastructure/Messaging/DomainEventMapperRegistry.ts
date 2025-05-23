import { IDomainEvent, IDomainEventMapper, IDomainEventMapperRegistry } from "contracts.ts";

/**
 * Maintains a registry of event mappers by event name.
 * Supports adding and retrieving mappers for serialization and deserialization.
 */
export class DomainEventMapperRegistry implements IDomainEventMapperRegistry {
  private readonly mappers: Map<string, IDomainEventMapper<any, any>> = new Map();

  get(eventName: string): IDomainEventMapper<any, any> | undefined {
    return this.mappers.get(eventName);
  }

  set<T extends IDomainEvent, U>(
    eventName: string,
    mapper: IDomainEventMapper<U, T>,
  ): void {
    this.mappers.set(eventName, mapper);
  }
}
