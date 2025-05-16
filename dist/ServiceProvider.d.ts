import { Container } from 'inversify';
export declare abstract class ServiceProvider {
    protected app: Container;
    protected static publishes: Record<string, string[]>;
    private bootingCallbacks;
    private bootedCallbacks;
    constructor(appInstance: Container);
    /**
     * Register bindings in the IoC container
     */
    abstract register(): void;
    /**
     * Register a callback to run during the booting phase
     */
    booting(callback: () => void): void;
    /**
     * Register a callback to run after the service has booted
     */
    booted(callback: () => void): void;
    /**
     * Execute all booting callbacks
     */
    callBootingCallbacks(): void;
    /**
     * Execute all booted callbacks
     */
    callBootedCallbacks(): void;
    /**
     * Declare the services this provider registers
     */
    provides(): string[];
    /**
     * Specify conditions under which this provider should be loaded
     */
    when(): string[];
}
