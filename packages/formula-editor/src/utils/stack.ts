export class Stack<Type> {
  private _elements: Type[] = [];

  push(item: Type): void {
    this._elements.push(item);
  }

  pop(): Type | undefined {
    return this._elements.pop();
  }

  top(): Type | undefined {
    return this._elements.at(-1);
  }

  isEmpty(): boolean {
    return this._elements.length === 0;
  }

  size(): number {
    return this._elements.length;
  }
}
