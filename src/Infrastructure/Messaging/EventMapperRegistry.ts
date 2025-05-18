import { IDomainEvent, IEventMapper } from "contracts.ts";

/**
 * Maintains a registry of event mappers by event name.
 * Supports adding and retrieving mappers for serialization and deserialization.
 */
export class EventMapperRegistry {
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
