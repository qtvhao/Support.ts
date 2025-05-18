// Support.ts/src/Infrastructure/Messaging/EventMapperRegistry.ts
import { IDomainEvent, IEventMapper, IEventMapperRegistry } from "contracts.ts";

/**
 * Maintains a registry of event mappers by event name.
 * Supports adding and retrieving mappers for serialization and deserialization.
 */
export type EventCtor<T extends IDomainEvent> = new (...args: any[]) => T;

export class EventMapperRegistry implements IEventMapperRegistry {
  private readonly mappers: Map<Function, IEventMapper<any, any>> = new Map();

  get<T extends IDomainEvent>(ctor: EventCtor<T>): IEventMapper<any, T> | undefined {
    return this.mappers.get(ctor) as IEventMapper<any, T> | undefined;
  }

  set<T extends IDomainEvent, U>(ctor: EventCtor<T>, mapper: IEventMapper<U, T>): void {
    this.mappers.set(ctor, mapper);
  }
}
