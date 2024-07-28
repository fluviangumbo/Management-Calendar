// global consts
const toggleBtn = document.querySelector('#toggle');
const mode = localStorage.getItem('mode');
//darkmod consts^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const daylinks = document.querySelectorAll('.dayLink');
//for the page change^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//task inpu constsvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const taskFormEl = document.querySelector('#taskInputForm');
const taskNameInp = document.querySelector('#TaskNameInp');
const taskDayInp = document.querySelector('#TaskDayInp');
const taskStartHr = document.querySelector('#TaskStartHr');
const taskStartMin = document.querySelector('#TaskStartMin');
const taskAMPM = document.querySelector('#TaskAMPM');
const taskDurationInp = document.querySelector('#TaskDurationInp');
const taskIndicatorEl = document.querySelector('#taskIndicator');
//employee inpu consts vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const empFormEl = document.querySelector('#employeeInputForm')
const firstNameInp = document.querySelector('#firstNameInp');
const lastNameInp = document.querySelector('#lastNameInp');
const empIndicatorEl = document.querySelector('#empIndicator');
//
const compFormEl = document.querySelector('#compNameInpForm');
const compNameInp = document.querySelector('#compNameInp');
const compIndicator = document.querySelector('#compIndicator');
const compNameModal = new bootstrap.Modal(document.getElementById('modalInputCompName'));
const stats = document.querySelector('#statsTable');


const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];


//when "day" is clicked, opens day.html?day=*day clicked*, no asteriks.vvvvvvvvv
daylinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    location.assign(`day.html?day=${event.target.dataset.id}`);
  })
});


function taskStoreLocalStorage(newTaskData) {
  let existingTaskData = pullTaskData();
  let taskData = existingTaskData;
  newTaskData.id = existingTaskData.length; // I think this is where your id field came from
  taskData.push(newTaskData);
  let updatedTaskData = JSON.stringify(taskData);
  localStorage.setItem('taskData', updatedTaskData);
}


function addTask(event) {
  event.preventDefault();

  if (!taskNameInp.value || !taskDayInp.value || !taskStartHr.value || !taskStartMin.value || !taskDurationInp.value) {
    taskIndicatorEl.textContent = "Cannot be Blank.";
    taskIndicatorEl.classList.add('invalid');

    return;
  } else if (Number(taskDurationInp.value) <= 0) {
    taskIndicatorEl.textContent = "Please enter a positive number for duration.";
    taskIndicatorEl.classList.add('invalid');

    return;
  } else if (Number(taskDurationInp.value) > 24) {
    taskIndicatorEl.textContent = "Task too long - consider breaking it up into subtasks!";
    taskIndicatorEl.classList.add('invalid');

    return;
  }

  const taskData = {
    task: taskNameInp.value,
    assigned: [],
    day: taskDayInp.value,
    startTime: `${taskStartHr.value}:${taskStartMin.value} ${taskAMPM.value}`,
    duration: Number(taskDurationInp.value),
  };
  
  taskStoreLocalStorage(taskData);
  document.getElementById("taskInputForm").reset();
  
  taskIndicatorEl.textContent = "Success! Add another?";
  taskIndicatorEl.classList.remove('invalid');
  taskIndicatorEl.classList.add('valid');

  setTimeout(function () {
    taskIndicatorEl.textContent = "";
  }, 5000);

  renderWeek();
}


function empStoreLocalStorage(newEmpData) {
  let existingEmpData = pullEmpData();
  let empData = existingEmpData;
  empData.push(newEmpData);
  let updatedEmpData = JSON.stringify(empData);
  localStorage.setItem('empsData', updatedEmpData);
}

function addEmp(event) {
  event.preventDefault();

  if (!firstNameInp.value || !lastNameInp.value) {
    empIndicatorEl.textContent = "Name Fields required." //string cant be too long or it wont show.
    empIndicatorEl.classList.add('invalid');

    return;
  }

  console.log(pullEmpData());
  console.log((pullEmpData()).length);

  let newEmpIndex = pullEmpData().length;

  const empData = {
    firstName: firstNameInp.value.trim(),
    lastName: lastNameInp.value.trim(),
    index: newEmpIndex,
    fullName: `${firstNameInp.value.trim()} ${lastNameInp.value.trim()}`
  };

  empStoreLocalStorage(empData);
  document.getElementById("employeeInputForm").reset();

  empIndicatorEl.textContent = "Success! Add another?";
  empIndicatorEl.classList.remove('invalid');
  empIndicatorEl.classList.add('valid');

  setTimeout(function () {
    empIndicatorEl.textContent = "";
  }, 5000);

  renderStats();
}


function renderWeek() {
  for (let i = 0; i < 7; i++) {
    dayInfo(i);
  }
}


function dayInfo(index) {
  const hoursArray = calcDayHours();
  const taskCountArr = calcDayTasks();
  const day = document.querySelector(`#${weekdays[index]}`);

  while (day.children.length > 1) {
    day.removeChild(day.children[1]);
  }
  
  const dayList = document.createElement('ul');
  dayList.classList.add('list-group');

  const taskItem = document.createElement('li');
  const hoursItem = document.createElement('li');
  taskItem.classList.add('list-group-item');
  hoursItem.classList.add('list-group-item');

  taskItem.textContent = `Task Count: ${taskCountArr[index]}`;
  hoursItem.textContent = `Total Work Hours: ${hoursArray[index]}`;

  dayList.appendChild(taskItem);
  dayList.appendChild(hoursItem);
  day.appendChild(dayList);
}


function renderStats() {
  const empStats = pullEmpData();
  const taskStats = pullTaskData();
  
  while (stats.children.length > 0) {
    stats.removeChild(stats.children[0]);
  }
  
  empStats.forEach(function(emp) {
    let empDisplay = {
      name: emp.fullName,
      tasks: 0,
      days: [],
    };
    let taskCounter = 0;
    let dayTracker = [];
    let dayUnordered = [];

    for (let i = 0; i < taskStats.length; i++) {
      if (taskStats[i].assigned.includes(emp.fullName)) {
        dayTracker.push(taskStats[i].day);
        taskCounter++;
      }
    }
    empDisplay.tasks = taskCounter;

    dayTracker.forEach(function(day) {
      if (!dayUnordered.includes(day)) {
        dayUnordered.push(day);
      }
    });

    for (let i = 0; i < 7; i++) {
      if (dayUnordered.includes(weekdays[i])) {
        empDisplay.days.push(weekdays[i]);
      }
    }

    const empStat = document.createElement('tr');
    
    const empRow = document.createElement('th');
    empRow.textContent = empDisplay.name;
    empRow.setAttribute('scope', 'row');

    const rowTasks = document.createElement('td');
    rowTasks.textContent = empDisplay.tasks;

    const rowDays = document.createElement('td');
    rowDays.textContent = empDisplay.days.join(', ');

    empStat.appendChild(empRow);
    empStat.appendChild(rowTasks);
    empStat.appendChild(rowDays);

    stats.appendChild(empStat);
  });
}


function initCompanyName() {
  let compName = localStorage.getItem('companyName') || '';
    
  if (!compName) {
    
    compNameModal.show();
    return;
  }
  compNameModal.hide();
  document.getElementById('companyName').textContent = compName;
}


function setCompanyName(event) {
  event.preventDefault();
  localStorage.setItem('companyName', document.getElementById('compNameInp').value.trim());
  initCompanyName();
}


taskFormEl.addEventListener('submit', addTask);
empFormEl.addEventListener('submit', addEmp);
compFormEl.addEventListener('submit', setCompanyName);

initCompanyName();
renderWeek();
renderStats();