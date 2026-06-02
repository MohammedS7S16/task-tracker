# Task Tracker CLI

A command-line interface app to track and manage your tasks, built with Node.js.
> Project from [roadmap.sh](https://roadmap.sh/projects/task-tracker)

---

## Features

- Add, update, and delete tasks
- Mark tasks as `in-progress` or `done`
- List all tasks or filter by status
- Data persisted locally in a `tasks.json` file

---

## Requirements

- Node.js

---

## Installation

```bash
git clone https://github.com/MohammedS7S16/task-tracker.git
cd task-tracker
node index.js
```

---

## Usage

Once running, the app accepts the following commands:

### Add a task
```
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)
```

### Update a task
```
task-cli update 1 "Buy groceries and cook dinner"
```

### Delete a task
```
task-cli delete 1
```

### Mark a task as in-progress
```
task-cli mark-in-progress 1
```

### Mark a task as done
```
task-cli mark-done 1
```

### List all tasks
```
task-cli list
```

### List tasks by status
```
task-cli list todo
task-cli list in-progress
task-cli list done
```

---

## Task Properties

Each task is stored with the following properties:

| Property | Description |
|---|---|
| `id` | Unique identifier |
| `description` | Task description |
| `status` | `todo`, `in-progress`, or `done` |
| `createdAt` | Timestamp when the task was created |
| `updatedAt` | Timestamp when the task was last updated |

---

## Data Storage

Tasks are saved in a `tasks.json` file in the project directory, created automatically on first use.

---

## License

MIT
