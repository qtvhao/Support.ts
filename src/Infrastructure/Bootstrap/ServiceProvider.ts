import { IApplication, IServiceProvider } from "contracts.ts";
export abstract class ServiceProvider implements IServiceProvider {
  app: IApplication;

  protected static publishes: Record<string, string[]> = {};
  private bootingCallbacks: (() => void)[] = [];
  private bootedCallbacks: (() => void)[] = [];
  private shutdownCallbacks: (() => void)[] = [];

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
      callback();
    }
  }

  /**
   * Execute all booted callbacks
   */
  public async callBootedCallbacks(): Promise<void> {
    for (const callback of this.bootedCallbacks) {
      callback();
    }
  }

  public onShutdown(callback: () => void, toStart: boolean = false): void {
    this.addCallback(this.shutdownCallbacks, callback, toStart);
  }

  public callShutdownCallbacks(): void {
    for (const callback of this.shutdownCallbacks) {
      callback();
    }
  }

  /**
   * Declare the services this provider registers
   */
  public provides(): string[] {
    return [];
  }
}
