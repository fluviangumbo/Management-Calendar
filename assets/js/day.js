const day = new URLSearchParams(location.search).get("day")
const backBtn = document.querySelector('#back');
// pulls data 
const allTasks = pullTaskData();
const allEmps = pullEmpData();
const taskEl = document.querySelector('#taskDisplay');
const rosterEl = document.querySelector('#empDisplay');

const currentDayTasks = allTasks.filter( function (task) {
  return task.day === day 
});

// TENTATIVE FUNCTIONALITY FOR ROSTER DISPLAY, NEED TO BE ABLE TO ASSIGN TASKS TO TEST
 const currentDayEmpByIndex = buildRoster();
 
 function buildRoster () {
  const roster = [];

  currentDayTasks.forEach(function (assignment) {
    assignment.assigned.forEach(function (employee) {
      roster.push(employee);
    });
  });

  const empArray = [];
  
  roster.forEach(function (index) {
    if (!empArray.includes(index)) {
      empArray.push(index);
    }
  });

  return empArray;
};


function dayEmployees (assignedArray) {
  if (assignedArray.length > 0) {
    assignedArray.forEach(function (working) {
      const worker = document.createElement('li');
      worker.textContent = `${allEmps[working].firstName} ${allEmps[working].lastName}`;
      rosterEl.appendChild(worker);
    });
  } else {
    const noAssigned = document.createElement('li');
    noAssigned.textContent = "No employees are currently assigned to tasks today.";
    rosterEl.appendChild(noAssigned);
  }
}


function buildDay () {
  if (currentDayTasks.length > 0) {
    currentDayTasks.forEach(function (task) {
      taskBuilder('div', task, taskEl);
    });
  } else {
    blankTasks();
  }
}


function blankTasks () {
  const blank = document.createElement('div');
  blank.textContent = "No tasks yet!";
  taskEl.appendChild(blank);
}


function taskBuilder (type, task, parentEl) {
  const elem = document.createElement(type);
  elem.classList.add('card-body2');

  const taskName = task.task; //don't use .value here, think that's for inputs
  const taskStart = `${task.startHr}:${task.startMin}`;
  const taskDuration = task.duration;

  const title = document.createElement('h5');
  title.textContent = taskName;
  title.classList.add('card-title');

  const info = document.createElement('p');
  info.textContent = `Start Time: ${taskStart}  Duration: ${taskDuration}`;
  info.classList.add('card-text');
  
  const empList = document.createElement('ul');
  if (task.assigned.length > 0) {
    fetchTaskEmps(empList, task);
  } else {
    const noEmp = document.createElement('li');
    noEmp.textContent = "No employees assigned to task."
    empList.appendChild(noEmp);
  }

  elem.appendChild(title);
  elem.appendChild(info);
  elem.appendChild(empList);

  parentEl.appendChild(elem);
}


function fetchTaskEmps(assignedEl, dayTask) {
    for(let i = 0; i < allEmps.length; i++) {
      if (dayTask.assigned.includes(i)) {
        empBuilder('li', allEmps[i], assignedEl);
      }
    }
}


function empBuilder (type, empIndexed, parentEl) {
  const emp = document.createElement(type);
  emp.textContent = `${empIndexed.firstName} ${empIndexed.lastName} assigned.`;
  parentEl.appendChild(emp);
}
    

let redirectURL = '';
const redirectPage = function (url) {
    redirectURL = url;
    location.assign(url);
};


backBtn.addEventListener('click', function() {redirectPage('index.html')});


dayEmployees(currentDayEmpByIndex);
buildDay();