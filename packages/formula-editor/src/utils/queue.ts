export class Queue<Type> {
  private _elements: { [key: number]: Type } = {};
  private _head: number = 0;
  private _tail: number = 0;

  enqueue(item: Type): void {
    this._elements[this._tail] = item;
    this._tail++;
  }

  dequeue(): Type | undefined {
    if (this._tail === this._head) return undefined;

    const element = this._elements[this._head];
    delete this._elements[this._head];
    this._head++;

    return element;
  }

  peek(): Type | undefined {
    if (this.isEmpty()) return undefined;

    return this._elements[this._head];
  }

  isEmpty(): boolean {
    return this._head === this._tail;
  }
}
