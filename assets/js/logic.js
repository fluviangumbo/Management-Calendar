// Pulls Data from Local Storage

function pullTaskData () {
    let taskList = JSON.parse(localStorage.getItem('taskData')) || [];
    return taskList;
}


function pullEmpData () {
  let stored = JSON.parse(localStorage.getItem('empsData')) || [];
  return stored;
}


//Calculate Stat Inputs
function calcDayHours () {
  const totalHours = [];
  const tasks = pullTaskData();


  for (let i = 0; i < 7; i++) {
    let dayHours = 0;
    for (let j = 0; j < tasks.length; j++) {
      if (weekdays[i] === tasks[j].day) {
        dayHours += Number((tasks[j].assigned.length)*(tasks[j].duration));
      }
    }
    totalHours.push(dayHours);
  }
  
  return totalHours;
}


function calcDayTasks() {
  const taskCount = [];
  const tasks = pullTaskData();

  let dayCount = 0;

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < tasks.length; j++) {
      if (weekdays[i] === tasks[j].day) {
        dayCount++;
      }
    }
    taskCount.push(dayCount);
    dayCount = 0;
  }
  return taskCount;
}