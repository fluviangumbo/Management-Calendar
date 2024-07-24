const day = new URLSearchParams(location.search).get("day")
console.log(day)
// pulls data 
const allTasks = pullTaskData()
const currentDayTasks = allTasks.filter(function(task){
    return task.day === day 
})

function fetchTaskEmps(){
    const allTasks= pullTaskData();
    const allEmps= pullTaskData();
}
// select task for that day 
    for(let i=0; i<allEmps.lengths;i++){
  if(task.assigned.includes(i)){
    allEmps[i]
    empBuilder(div,allEmps[i],empEl)
  }
    }