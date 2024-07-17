// global variables

// need to decide if built in HTML or if rendered each time, stretch goals?
//function renderCalendar() {}

function renderTasks() {
    // TODO: Write function that renders tasks to calendar

    // create HTML elements

        // add content to elements from local storage
}

function renderStats() {
    // Pull member stats and task stats from local storage (might calculate in this function)

    //Display to page
}

// Do we want to render some basic stats on tasks/hours/team-members?
// function renderStats() {}

function addTask(event) { //will need an event listener for button
    event.preventDefault();
    // TODO: Input from mngr/user (modal/sidebar? popup?)

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

renderCalendar();
renderTasks();
renderStats();