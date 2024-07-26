// globa  constiables
const toggleBtn = document.querySelector('#toggle');
const mode = localStorage.getItem('mode');
//darkmod consts^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const daylinks = document.querySelectorAll('.dayLink');

//task inpu consts^^^^^^^^^^^^^^^^^^^^^^^^^^^
const taskFormEl = document.querySelector('#taskInputForm');
const taskNameInp = document.querySelector('#TaskNameInp');
const taskDayInp = document.querySelector('#TaskDayInp');
const taskStartHr = document.querySelector('#TaskStartHr');
const taskStartMin = document.querySelector('#TaskStartMin');
const taskDurationInp = document.querySelector('#TaskDurationInp');
const taskIndicatorEl = document.querySelector('#taskIndicator');
//employee inpu consts ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const empFormEl = document.querySelector('#employeeInputForm')
const firstNameInp = document.querySelector('#firstNameInp');
const lastNameInp = document.querySelector('#lastNameInp');
const empIndicatorEl = document.querySelector('#empIndicator');


//when "day" is clicked, opens day.html?day=*day clicked, no asteriks*
const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

daylinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    location.assign(`day.html?day=${event.target.dataset.id}`)
  })
});
//darkmode stuff commented out for simplicity sake and debugging
// function lastKnownMode() {


//   if (mode === 'light') {
//     document.body.classList.replace('dark', mode);
//     toggleBtn.textContent = '☀️';
//   } else {
//     document.body.classList.replace('light', mode);
//     toggleBtn.textContent = '🌙';
//   }
// }


// function darkModeToggle() {

//   if (document.body.className == 'light') {
//     toggleBtn.textContent = '🌙';
//     document.body.className = 'dark';
//     localStorage.setItem('mode', 'dark');
//   } else {
//     toggleBtn.textContent = '☀️';
//     document.body.className = 'light';
//     localStorage.setItem('mode', 'light');
//   }
// }
//DARKMODE^^^^^^^^^^^^^^^^^^^^^^^^
//NEED BUTTON IN HEADER, ID NAMES MATTER


//toggleBtn.addEventListener('click', darkModeToggle);



function renderTasks() {
  // TODO: Write function that renders tasks to calendar

  // create HTML elements

  // add content to elements from local storage
}

function renderStats() {
  // Pull member stats and task stats from local storage (might calculate in this function)

  //Display to page
}


function taskStoreLocalStorage(newTaskData) {
  let existingTaskData = pullTaskData();
  let taskData = existingTaskData;
  newTaskData.id = existingTaskData.length
  taskData.push(newTaskData);
  let updatedTaskData = JSON.stringify(taskData);
  localStorage.setItem('taskData', updatedTaskData)
}


function addTask(event) {
  event.preventDefault();

  if (!taskNameInp.value || !taskDayInp.value || !taskStartHr.value || !taskStartMin.value || !taskDurationInp.value) {
    taskIndicatorEl.textContent = "Cannot be Blank.";
    return;
  } else if (!weekdays.includes(taskDayInp.value)) {
    taskIndicatorEl.textContent = "Must enter a day of the week.";
    return;
  } else if (isNaN(Number(taskStartHr.value)) || isNaN(Number(taskStartMin.value)) || isNaN(Number(taskDurationInp.value))) {
    taskIndicatorEl.textContent = "Please enter only positive numbers for start and duration."
    return;
  } else if (Number(taskStartHr.value) >= 24 || Number(taskStartHr.value) < 0 || Number(taskStartMin.value) >= 60 || Number(taskStartMin.value) < 1) {
    taskIndicatorEl.textContent = "Please enter a valid time format."
    return;
  }

  const taskData = {
    task: taskNameInp.value,
    assigned: [],
    day: taskDayInp.value,
    startHr: Number(taskStartHr.value),
    startMin: Number(taskStartMin.value),
    duration: Number(taskDurationInp.value),
  };
  
  taskStoreLocalStorage(taskData);
  document.getElementById("taskInputForm").reset();
  
  taskIndicatorEl.textContent = "Success! Add another?";

  setTimeout(function () {
    taskIndicatorEl.textContent = "";
  }, 5000);

  //renderTasks();  i think these will go in day.js and will be called when the page is switched
  //renderStats();
}


// to pull an employee's specific info: selectedEmpData = pullEmpData()[EMP_INDEX].KEY; pullTaskDat()[no-task-index].KEY;

function empStoreLocalStorage(newEmpData) {
  let existingEmpData = pullEmpData();
  let empData = existingEmpData;
  empData.push(newEmpData);
  let updatedEmpData = JSON.stringify(empData);
  localStorage.setItem('empsData', updatedEmpData)
}

function addEmp(event) {
  event.preventDefault();

  if (!firstNameInp.value || !lastNameInp.value) {
    empIndicatorEl.textContent = "Name Fields required." //string cant be too long or it wont show.
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

  setTimeout(function () {
    empIndicatorEl.textContent = "";
  }, 5000);


  //renderTasks();  i think these will go in day.js and will be called when the page is switched
  //renderStats();
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

//MOVED FUNCTIONS FOR ASSIGN TO DAY.JS


//create a function to save the assigned emp to task for day, while not allowing duplicates.


taskFormEl.addEventListener('submit', addTask);
empFormEl.addEventListener('submit', addEmp);




//are the below calls necessary with them being called in the above functions?
//renderTasks();
//renderStats();
//lastKnownMode();

renderWeek();