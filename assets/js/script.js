// globa  constiables
const toggleBtn = document.querySelector('#toggle');
const mode = localStorage.getItem('mode');
//darkmod consts^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const daylinks = document.querySelectorAll('.dayLink');
//
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
const empAssignBtn = document.querySelector('#empAssignment')
const assignBtn = document.querySelector('#assignmentBtn')
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

function pullTaskData () { //adding for use on day.html and modals, see pullEmpData()
  let taskList = JSON.parse(localStorage.getItem('taskData')) || [];
  return taskList;
}

function taskStoreLocalStorage(newTaskData) {
  let existingTaskData = pullTaskData();
  let taskData = existingTaskData;
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

function pullEmpData () { //adding separate function for multiple calls throughout logic
  let stored = JSON.parse(localStorage.getItem('empsData')) || [];
  return stored;
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
    firstName: firstNameInp.value,
    lastName: lastNameInp.value,
    index: newEmpIndex,
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
// create a function that populates the form select element in the offcanvas using the 
function populateEmpOffCanv() {
  let selectElement = document.getElementById('nameSelect');
  let existingEmpData = pullEmpData();
  selectElement.innerHTML = '';
  
  existingEmpData.forEach(function (employee) {
  const optionElement = document.createElement('option');
    optionElement.text = `${employee.firstName} ${employee.lastName}`;
    selectElement.appendChild(optionElement);
});
}

function populateTaskOffCanv() {
  let selectElement = document.getElementById('taskSelect');
  let existingTaskData = pullTaskData();
  selectElement.innerHTML = '';
  
  existingTaskData.forEach(function (taskData) {
  const optionElement = document.createElement('option');
    optionElement.text = `${taskData.task}`;
    selectElement.appendChild(optionElement);
});
}


function calcDayHours () {
  let totalHours = 0;
  pullTaskData()
  pullEmpData()

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < allTasks.length; j++) {
      if (weekday[i] === allTasks[j].day) {
        totalHours += (allTasks[j].assigned.length)*(allTasks[j].duration);
      }
    }
  }
  
  return totalHours;
}

//create a function to save the assigned emp to task for day, while not allowing duplicates.


taskFormEl.addEventListener('submit', addTask);
empFormEl.addEventListener('submit', addEmp);
empAssignBtn.addEventListener('click', populateEmpOffCanv);
empAssignBtn.addEventListener('click', populateTaskOffCanv);



//are the below calls necessary with them being called in the above functions?
//renderTasks();
//renderStats();
//lastKnownMode();