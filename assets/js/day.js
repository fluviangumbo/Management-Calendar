
const day = new URLSearchParams(location.search).get("day");
const backBtn = document.querySelector('#back');
// pulls data 
const allTasks = pullTaskData();

const currentDayTasks = allTasks.filter(function (task) {
    return task.day === day
});

function fetchTaskEmps() {
    const allTasks = pullTaskData();
    const allEmps = pullTaskData();

for (let i = 0; i < allEmps.lengths; i++) {
    if (task.assigned.includes(i)) {
        allEmps[i]
        empBuilder(div, allEmps[i], empEl)
    }
}};


let redirectURL = '';
const redirectPage = function (url) {
    redirectURL = url;
    location.assign(url);
};


backBtn.addEventListener('click', function() {redirectPage('index.html')});

