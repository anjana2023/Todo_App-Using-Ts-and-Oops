// src/TodoItem.ts
export default class TodoItem {
  constructor(
    public id: number,
    public text: string,
    public status: boolean = false
  ) {}

  toggleStatus(): void {
    this.status = !this.status;
  }
}
