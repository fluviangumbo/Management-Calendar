// global variables
const toggleBtn = document.querySelector('#toggle');
const mode = localStorage.getItem('mode')
//above are the vars for the darkmode toggle, it stores and calls the mode locally

function renderTasks() {
    // TODO: Write function that renders tasks to calendar

    // create HTML elements

        // add content to elements from local storage
}

function renderStats() {
    // Pull member stats and task stats from local storage (might calculate in this function)

    //Display to page
}

function addTask(event) { //will need an event listener for button
    event.preventDefault();
    // TODO: Input from mngr/user (modal/sidebar? popup?)
        // Start time: value
        // Duration: value

    // Store this in localStorage with other tasks

    renderTasks();
    renderStats();
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

//below is light/dark toggle for the page, new consts will be at the top.

function lastKnownMode () {
    document.body.className = mode;
    if (mode === 'light') {
      toggleBtn.textContent = '☀️';
    } else {
      toggleBtn.textContent = '🌙';
    }
  }
  
  function darkModeToggle() {
  
      if (document.body.className == 'light') {
        toggleBtn.textContent = '🌙';
        document.body.className = 'dark';
        localStorage.setItem('mode', 'dark')
      } else {
        toggleBtn.textContent = '☀️';
        document.body.className = 'light';
        localStorage.setItem('mode', 'light')
      }
  }
  
  //button will need id of 'button'.
  toggleBtn.addEventListener('click', function () {
    
    darkModeToggle()
  })

renderTasks();
renderStats();
