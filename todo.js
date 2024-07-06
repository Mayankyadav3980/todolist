let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


function renderList () {
    taskList.innerHTML ='task'
}

function markTaskAsComplete (taskId) {
    let newTasks = tasks.map( obj => {
        if(obj.id == taskId){
            return { ...obj, done:!(obj.done)};
        }
        else{
            return obj;
        }
    })
    tasks = newTasks;
    renderList();
    showNotification('task toggled success')
}

function deleteTask (taskId) {
    let newTasks = tasks.filter(obj => obj.id !== taskId )
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully')
}

function addTask (task) {
   
    tasks.push(task);
    showNotification('Task added successfullu')
    renderList();
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
if(e.key == 'Enter'){
    const text = e.target.value;
    if(!text){ showNotification('enter todo') };
    const task = { 
        id: Date.now().toString,
        task,
        done: false
    }
    e.target.value = '';
    addTask(task);
}
}

addTaskInput.addEventListener('keypress', handleInputKeypress);