import fs from "fs";

export interface Task {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

export class TaskManager {
  private readonly pathFile: string;
  private readonly tasks: Task[];

  constructor(pathFile: string) {

    this.pathFile = pathFile;
    this.tasks = this.loadFile();
  }

  private loadFile(): Task[] {
    if (fs.existsSync(this.pathFile)) {
      const data = fs.readFileSync(this.pathFile, "utf-8");
      return JSON.parse(data);
    }
    try {
      fs.writeFileSync(this.pathFile, JSON.stringify([]));
      return [];
    } catch (error) {
      console.log("Error writing file:", error);
      return [];
    }
  }
  private saveTasks(): void {
    fs.writeFileSync(this.pathFile, JSON.stringify(this.tasks, null, 2));
  }

  public addTask(description: string): void {
    const task: Task = {
      id: this.tasks.length + 1,
      description,
      status: "todo",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    this.tasks.push(task);
    this.saveTasks();
    console.log("Task added successfully");
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public getTasksByStatus(status: "todo" | "in-progress" | "done"): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  public updateTask(id: number, status: "todo" | "in-progress" | "done") {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      console.error("Task not found");
      return;
    }
    task.status = status;
    task.updatedAt = new Date().toDateString();
    this.saveTasks();
    console.log("Task updated successfully");
  }

  public deleteTask(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      console.error("Task not found");
      return;
    }
    this.tasks.splice(index, 1);
    this.saveTasks();
    console.log("Task deleted successfully");
  }

  public markTaskAsDone(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      console.error("Task not found");
      return;
    }
    task.status = "done";
    task.updatedAt = new Date().toDateString();
    this.saveTasks();
    console.log("Task marked as done successfully");
  }

  public markTaskAsInProgress(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      console.error("Task not found");
      return;
    }
    task.status = "in-progress";
    task.updatedAt = new Date().toDateString();
    this.saveTasks();
    console.log("Task marked as in-progress successfully");
  }
}
