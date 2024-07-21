// global variables
const toggleBtn = document.querySelector('#toggle');
const mode = localStorage.getItem('mode')
const daylinks = document.querySelectorAll('.dayLink')

const formEl = document.querySelector('#form')
const taskNameInp = document.querySelector('#TaskNameInp')


daylinks.forEach((link) => {
  link.addEventListener("click", function(event){
    location.assign(`day.html?day=${event.target.dataset.id}`)
  })
} )


function lastKnownMode () {
  
  
  if (mode === 'light') {
    document.body.classList.replace('dark', mode);
    toggleBtn.textContent = '☀️';
  } else {
    document.body.classList.replace('light', mode);
    toggleBtn.textContent = '🌙';
  }
}


function darkModeToggle() {

    if (document.body.className == 'light') {
      toggleBtn.textContent = '🌙';
      document.body.className = 'dark';
      localStorage.setItem('mode', 'dark');
    } else {
      toggleBtn.textContent = '☀️';
      document.body.className = 'light';
      localStorage.setItem('mode', 'light');
    }
}
//DARKMODE^^^^^^^^^^^^^^^^^^^^^^^^
//NEED BUTTON IN HEADER, ID NAMES MATTER


toggleBtn.addEventListener('click', darkModeToggle);



function renderTasks() {
    // TODO: Write function that renders tasks to calendar

    // create HTML elements

        // add content to elements from local storage
}

function renderStats() {
    // Pull member stats and task stats from local storage (might calculate in this function)

    //Display to page
}

function taskStoreLocalStorage (newTaskData) {
  let existingTaskData = localStorage.getItem('TaskData');
  let blogData = existingTaskData ? JSON.parse(existingTaskData) : [];
  blogData.push(newTaskData);
  let updatedTaskData = JSON.stringify(TaskData);
  localStorage.setItem('blogPosts', updatedTaskData)
}

function addTask(event) { //will need an event listener for button
    event.preventDefault();
    
    if (!taskNameInp.value) {
      const errorEl = document.querySelector('#error');
      errorEl.textContent = "Please input new task."
      return console.log(taskData);
  }
      
      const taskName = {
          task: taskNameInp.value,
      };

      taskStoreLocalStorage(taskName);

    //renderTasks();
    //renderStats();
}

function addTeamMember(event) { //eventlistener
    event.preventDefault();
    // TODO: Mngr/user input, maybe also can store info regarding salary or role stored
    let newMember = true;

    while (newMember) {
        //Input here (task assignment?)

        //Store client-side

        //See if we will add more, if no

        newMember = false;
    }
    renderTasks();
    renderStats();
}

formEl.addEventListener('submit', addTask);
//are the below calls necessary with them being called in the above functions?
renderTasks();
renderStats();
lastKnownMode();