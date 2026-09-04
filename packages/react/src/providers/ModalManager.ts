export const ModalManager = {
  stack: new Map<string, number>(),
  baseZIndex: 192,

  register(id: string, minZIndex?: number): number {
    const currentMaxZ = this.getMaxZIndex();
    const newZ = Math.max(currentMaxZ + 10, minZIndex ?? 0);
    this.stack.set(id, newZ);
    return newZ;
  },

  unregister(id: string): void {
    this.stack.delete(id);
  },

  getMaxZIndex(): number {
    if (this.stack.size === 0) return this.baseZIndex;
    return Math.max(...this.stack.values());
  },

  isTopModal(id: string): boolean {
    if (this.stack.size === 0) return false;
    const entries = Array.from(this.stack.entries());
    const sorted = entries.sort((a, b) => b?.[1] - a?.[1]);
    return sorted?.[0]?.[0] === id;
  },

  generateUniqueId(prefix = "modal"): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  }
};
