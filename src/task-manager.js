"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const fs_1 = __importDefault(require("fs"));
class TaskManager {
  constructor(pathFile) {
    this.pathFile = pathFile;
    this.tasks = this.loadFile();
  }
  loadFile() {
    if (fs_1.default.existsSync(this.pathFile)) {
      const data = fs_1.default.readFileSync(this.pathFile, "utf-8");
      return JSON.parse(data);
    }
    try {
      fs_1.default.writeFileSync(this.pathFile, JSON.stringify([]));
      return [];
    } catch (error) {
      console.log("Error writing file:", error);
      return [];
    }
  }
  saveTasks() {
    fs_1.default.writeFileSync(
      this.pathFile,
      JSON.stringify(this.tasks, null, 2),
    );
  }
  addTask(description) {
    const task = {
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
}
exports.TaskManager = TaskManager;
