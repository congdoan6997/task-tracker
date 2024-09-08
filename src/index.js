#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_task_command_1 = require("./commands/add-task-command");
const task_manager_1 = require("./task-manager");
const taskManager = new task_manager_1.TaskManager("tasks.json");
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Please provide a command");
  process.exit(1);
}
const command = args[0];
const description = args.slice(1).join(" ");
switch (command) {
  case "add":
    const addTaskCommand = new add_task_command_1.AddTaskCommand(
      taskManager,
      description,
    );
    addTaskCommand.execute();
    break;
  default:
    console.log("Invalid command");
    process.exit(1);
}
