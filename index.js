const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');

const DisplayDate = function (timestamp) {
  const dateObj = new Date(Number(timestamp));

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Timestamp';
  }

  const normalDate = dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return normalDate;
};

const readJsonFile = function () {
  let tasks;
  try {
    tasks = fs.readFileSync('tasks.json', 'utf8');
    const tasksObj = JSON.parse(tasks);

    return tasksObj;
  } catch (err) {
    return [];
  }
};

const writeJsonFile = function (tasksObj) {
  const tasksStr = JSON.stringify(tasksObj);
  fs.writeFileSync('tasks.json', tasksStr);
};

const addTask = function (taskWords) {
  const tasksObj = readJsonFile();

  const newTask = {
    id: tasksObj.length > 0 ? Math.max(...tasksObj.map(task => task.id)) + 1 : 0,
    description: taskWords.join(' '),
    status: 'todo',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  tasksObj.push(newTask);
  writeJsonFile(tasksObj);

  console.log(`Task added successfully (ID: ${newTask.id})`);
};

const updateTask = function (taskUpdateInfo) {
  const tasksObj = readJsonFile();
  const index = Number(taskUpdateInfo.shift());

  const elementIndex = tasksObj.findIndex(task => task.id === index);

  tasksObj[elementIndex].description = taskUpdateInfo.join(' ');
  tasksObj[elementIndex].updatedAt = Date.now();

  writeJsonFile(tasksObj);

  console.log(`Task updated successfully (ID: ${elementIndex})`);
};

const markInProgress = function (id) {
  const tasksObj = readJsonFile();
  const index = Number(id[0]);
  const elementIndex = tasksObj.findIndex(task => task.id === index);

  tasksObj[elementIndex].status = 'in-progress';
  tasksObj[elementIndex].updatedAt = Date.now();

  writeJsonFile(tasksObj);

  console.log(`Task is marked as in-progress (ID: ${elementIndex})`);
};

const markDone = function (id) {
  const tasksObj = readJsonFile();
  const index = Number(id[0]);
  const elementIndex = tasksObj.findIndex(task => task.id === index);

  tasksObj[elementIndex].status = 'done';
  tasksObj[elementIndex].updatedAt = Date.now();

  writeJsonFile(tasksObj);

  console.log(`Task is marked as done (ID: ${elementIndex})`);
};

const deleteTask = function (id) {
  const tasksObj = readJsonFile();
  const index = Number(id[0]);
  const elementIndex = tasksObj.findIndex(task => task.id === index);

  if (index > -1) tasksObj.splice(elementIndex, 1);

  writeJsonFile(tasksObj);

  console.log(`Task deleted successfully (ID: ${elementIndex})`);
};

const listTasks = function (listFilter) {
  const tasksObj = readJsonFile();
  let found = false;

  for (const task of tasksObj) {
    const { id, description, status, createdAt, updatedAt } = task;

    if (listFilter.length !== 0 && listFilter[0] !== status) continue;

    found = true;

    console.log(`\nTask:`);
    console.log(`  id ${id}:`);
    console.log(`  Description: ${description}`);
    console.log(`  Status: ${status}`);
    console.log(`  Created at: ${DisplayDate(createdAt)}`);
    console.log(`  Updated at: ${DisplayDate(updatedAt)}`);
  }

  if (!found && listFilter.length !== 0)
    console.log(`There is no tasks marked as ${listFilter[0]}`);
};

const taskTracker = function () {
  let keepRunning = true;

  while (keepRunning) {
    console.log('');
    let userInput = prompt('task-cli ');

    userInput = userInput.replaceAll('"', '');
    const userInputArr = userInput.split(' ');

    const command = userInputArr.shift();
    switch (command) {
      case 'add':
        addTask(userInputArr);
        break;
      case 'update':
        updateTask(userInputArr);
        break;
      case 'delete':
        deleteTask(userInputArr);
        break;
      case 'mark-in-progress':
        markInProgress(userInputArr);
        break;
      case 'mark-done':
        markDone(userInputArr);
        break;
      case 'list':
        listTasks(userInputArr);
        break;
      default:
        keepRunning = false;
        break;
    }
  }
};

// --- Main ---

taskTracker();
