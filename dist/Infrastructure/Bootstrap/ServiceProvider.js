export class ServiceProvider {
    app;
    static publishes = {};
    bootingCallbacks = [];
    bootedCallbacks = [];
    constructor(appInstance) {
        this.app = appInstance;
    }
    /**
     * Register a callback to run during the booting phase
     */
    booting(callback) {
        this.bootingCallbacks.push(callback);
    }
    /**
     * Register a callback to run after the service has booted
     */
    booted(callback) {
        this.bootedCallbacks.push(callback);
    }
    /**
     * Execute all booting callbacks
     */
    callBootingCallbacks() {
        for (const callback of this.bootingCallbacks) {
            callback();
        }
    }
    /**
     * Execute all booted callbacks
     */
    callBootedCallbacks() {
        for (const callback of this.bootedCallbacks) {
            callback();
        }
    }
    /**
     * Declare the services this provider registers
     */
    provides() {
        return [];
    }
    /**
     * Specify conditions under which this provider should be loaded
     */
    when() {
        return [];
    }
}
