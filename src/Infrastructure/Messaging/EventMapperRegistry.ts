// Support.ts/src/Infrastructure/Messaging/EventMapperRegistry.ts
import { IDomainEvent, IEventMapper, IEventMapperRegistry } from "contracts.ts";

/**
 * Maintains a registry of event mappers by event name.
 * Supports adding and retrieving mappers for serialization and deserialization.
 */
export class EventMapperRegistry implements IEventMapperRegistry {
  private readonly mappers: Map<string, IEventMapper<any, any>> = new Map();

  get(eventName: string): IEventMapper<any, any> | undefined {
    return this.mappers.get(eventName);
  }

  set<T extends IDomainEvent, U>(
    eventName: string,
    mapper: IEventMapper<U, T>,
  ): void {
    this.mappers.set(eventName, mapper);
  }
}
