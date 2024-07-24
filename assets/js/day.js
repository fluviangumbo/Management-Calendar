const day = new URLSearchParams(location.search).get("day")
const backBtn = document.querySelector('#back');
// pulls data 
const allTasks = pullTaskData();
const allEmps = pullEmpData();
const taskEl = document.querySelector('#taskDisplay');

const currentDayTasks = allTasks.filter( function (task) {
  return task.day === day 
});

currentDayTasks.forEach(function (task) {
  taskBuilder('div', task, taskEl);
});


function taskBuilder (type, task, parentEl) {
  const elem = document.createElement(type);
  const taskName = task.task.value;
  const taskStart = `${task.startHr.value}:${task.startMin.value}`;
  const taskDuration = task.durattion.value;

  const title = document.createElement('h2');
  title.textContent = taskName;

  const info = document.createElement('p');
  info.textContent = `Start Time: ${taskStart}  Duration: ${taskDuration}`;

  elem.appendChild(title);
  elem.appendChild(info);

  fetchTaskEmps(elem, task);
  
  parentEl.appendChild(elem);
}

function fetchTaskEmps(empEl, dayTask) { // right now we need a way to validate the day 
    // select task for that day 
    for(let i = 0; i < allEmps.lengths; i++) {
      if (dayTask.assigned.includes(i)) {
        allEmps[i];
        empBuilder('div', allEmps[i], empEl);
      }
    }
}

function empBuilder (type, empIndexed, parentEl) {
  const elem = document.createElement(type);
  elem.textContent = `${empIndexed.firstName} ${empIndexed.lastName} assigned.`;
  parentEl.appendChild(elem);
}
    

const redirectPage = function () {
    const redirectURL = 'index.html';
    location.assign(url);
  };


backBtn.addEventListener('click', function() {redirectPage('index.html')}); 

