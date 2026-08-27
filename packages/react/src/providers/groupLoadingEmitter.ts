export class GroupLoadingEmitter {
  listeners: Record<string, Set<(loading: boolean) => void>> = {};
  emit(group: string, loading: boolean) {
    if (this.listeners[group]) {
      this.listeners[group].forEach((cb) => {
        cb(loading);
      });
    }
  }
  subscribe(group: string, cb: (loading: boolean) => void) {
    if (!this.listeners[group]) this.listeners[group] = new Set();
    this.listeners[group].add(cb);
    return () => {
      this.listeners[group].delete(cb);
    };
  }
}

export const groupLoadingEmitter = new GroupLoadingEmitter();
