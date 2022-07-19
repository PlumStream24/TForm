interface SyncManager {
    getTags(): Promise<string[]>;
    register(tag: string): Promise<void>;
}
  
declare global {
    interface ServiceWorkerRegistration {
        readonly sync: SyncManager;
    }
}

export {};