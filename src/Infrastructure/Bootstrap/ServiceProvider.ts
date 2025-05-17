import { IServiceProvider, Application } from 'contracts.ts'
export abstract class ServiceProvider implements IServiceProvider {
  protected app: Application;

  protected static publishes: Record<string, string[]> = {};
  private bootingCallbacks: (() => void)[] = [];
  private bootedCallbacks: (() => void)[] = [];

  constructor(appInstance: Application) {
    this.app = appInstance;
  }

  /**
   * Register bindings in the IoC container
   */
  public abstract register(): void;

  /**
   * Register a callback to run during the booting phase
   */
  public booting(callback: () => void): void {
    this.bootingCallbacks.push(callback);
  }

  /**
   * Register a callback to run after the service has booted
   */
  public booted(callback: () => void): void {
    this.bootedCallbacks.push(callback);
  }

  /**
   * Execute all booting callbacks
   */
  public callBootingCallbacks(): void {
    for (const callback of this.bootingCallbacks) {
      callback();
    }
  }

  /**
   * Execute all booted callbacks
   */
  public callBootedCallbacks(): void {
    for (const callback of this.bootedCallbacks) {
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
