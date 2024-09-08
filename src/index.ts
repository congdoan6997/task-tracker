#!/usr/bin/env node
import { TaskManager } from "./task-manager";
import { Command } from "commander";

const taskManager = new TaskManager("tasks.json");

const program = new Command();
program.name("task-cli").description("task tracker using cli").version("1.0.0");

program
  .command("add <description>")
  .description("add a new task")
  .action((description) => {
    taskManager.addTask(description);
  });

program
  .command("list")
  .description("list all tasks")
  .option("-s, --status <status>", "list tasks by status")
  .action((options) => {
    if (options.status) {
      console.log(taskManager.getTasksByStatus(options.status));
    } else {
      console.log(taskManager.getTasks());
    }
  });

program
  .command("update <id> <status>")
  .description("update task status")
  .action((id, status) => {
    taskManager.updateTask(Number(id), status);
  });

program
  .command("delete <id>")
  .description("delete a task")
  .action((id) => {
    taskManager.deleteTask(Number(id));
  });

program
  .command("mark-done <id>")
  .description("mark task as done")
  .action((id) => {
    taskManager.markTaskAsDone(Number(id));
  });

program
  .command("mark-in-progress <id>")
  .description("mark task as in progress")
  .action((id) => {
    taskManager.markTaskAsInProgress(Number(id));
  });

program.parse(process.argv);
