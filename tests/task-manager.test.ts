import fs from "fs";
import path from "path";

import {TaskManager} from "../src/task-manager";
describe('TaskManager', () => {
    let taskManager: TaskManager;
    beforeEach(() => {
        taskManager = new TaskManager(path.join(__dirname, 'test-tasks.json'));
    });
    afterEach(() => {
        if(fs.existsSync(path.join(__dirname, 'test-tasks.json'))) {
            fs.rmSync(path.join(__dirname, 'test-tasks.json'));
        }
    })
    it('should add a new task', () => {
        const description = 'hello';
        taskManager.addTask(description);
        const tasks = taskManager.getTasks();
        expect(tasks.length).toBe(1);
        expect(tasks[0].description).toBe(description);
    });

    it('should get all tasks', () => {
        taskManager.addTask('hello');
        taskManager.addTask('test');
        taskManager.addTask('test2');
        const tasks = taskManager.getTasks();
        expect(tasks.length).toBe(3);
    });

    it('should get tasks by status', () => {
        taskManager.addTask('hello');
        taskManager.addTask('test');
        taskManager.addTask('test2');
        const tasks = taskManager.getTasksByStatus('todo');
        expect(tasks.length).toBe(3);
    })

    it('should update task status', () => {
        taskManager.addTask('hello');
        taskManager.updateTask(1, 'in-progress');
        const tasks = taskManager.getTasks();
        expect(tasks[0].status).toBe('in-progress');
    })

    it('should delete task', () => {
        taskManager.addTask('hello');
        taskManager.addTask('test');
        taskManager.deleteTask(1);
        const tasks = taskManager.getTasks();
        expect(tasks.length).toBe(1);
    })

    it('show mark task as done', () => {
        taskManager.addTask('hello');
        taskManager.markTaskAsDone(1);
        const tasks = taskManager.getTasks();
        expect(tasks[0].status).toBe('done');
    })

    it('should mark task as in progress', () => {
        taskManager.addTask('hello');
        taskManager.markTaskAsInProgress(1);
        const tasks = taskManager.getTasks();
        expect(tasks[0].status).toBe('in-progress');
    })


})