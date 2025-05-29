import { IApplication, IServiceProvider } from "contracts.ts";
export abstract class ServiceProvider implements IServiceProvider {
  app: IApplication;

  protected static publishes: Record<string, string[]> = {};
  private bootingCallbacks: (() => Promise<void>)[] = [];
  private bootedCallbacks: (() => Promise<void>)[] = [];
  private shutdownCallbacks: (() => Promise<void>)[] = [];

  constructor(appInstance: IApplication) {
    this.app = appInstance;
  }

  /**
   * Register bindings in the IoC container
   */
  protected addCallback(
    target: (() => void)[],
    callback: () => void,
    toStart: boolean = false,
  ): void {
    if (toStart) {
      target.unshift(callback);
    } else {
      target.push(callback);
    }
  }

  public abstract register(): void;

  /**
   * Register a callback to run during the booting phase
   */
  public booting(callback: () => void, toStart: boolean = false): void {
    this.addCallback(this.bootingCallbacks, callback, toStart);
  }

  /**
   * Register a callback to run after the service has booted
   */
  public booted(callback: () => void, toStart: boolean = false): void {
    this.addCallback(this.bootedCallbacks, callback, toStart);
  }

  /**
   * Execute all booting callbacks
   */
  public async callBootingCallbacks(): Promise<void> {
    for (const callback of this.bootingCallbacks) {
      await callback();
    }
  }

  /**
   * Execute all booted callbacks
   */
  public async callBootedCallbacks(): Promise<void> {
    for (const callback of this.bootedCallbacks) {
      await callback();
    }
  }

  public onShutdown(callback: () => void, toStart: boolean = false): void {
    this.addCallback(this.shutdownCallbacks, callback, toStart);
  }

  public async callShutdownCallbacks(): Promise<void> {
    for (const callback of this.shutdownCallbacks) {
      await callback();
    }
  }

  /**
   * Declare the services this provider registers
   */
  public provides(): string[] {
    return [];
  }
  public async mapEventTopics(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async registerEventMappers(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async subscribeEventHandlers(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
