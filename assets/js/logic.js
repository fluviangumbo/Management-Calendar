
function pullTaskData () { //adding for use on day.html and modals, see pullEmpData()
    let taskList = JSON.parse(localStorage.getItem('taskData')) || [];
    return taskList;
  }

  function pullEmpData () { //adding separate function for multiple calls throughout logic
    let stored = JSON.parse(localStorage.getItem('empsData')) || [];
    return stored;
  }
