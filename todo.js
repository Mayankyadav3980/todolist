let tasks = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

function renderList() {
  tasksList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" 
              id="${task.id}" 
              ${task.done ? "checked" : ""}  
              class="custom-checkbox" 
              onclick='markTaskAsComplete(${task.id})'>

              <label for="${task.id}">${task.text}</label>
              <img src="bin.png" c
              lass="delete" 
              id="${task.id}" 
              onclick='deleteTask(${task.id})' />    
             `;
    tasksList.append(li);
  }

  tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete(taskId) {
  let newTasks = tasks.map((obj) => {
    if (obj.id == taskId) return { ...obj, done: !obj.done };
    else return obj;
  });
  tasks = newTasks;
  renderList();
}

function deleteTask(taskId) {
  let newTasks = tasks.filter((obj) => obj.id != taskId);
  tasks = newTasks;
  renderList();
}

function addTask(task) {
  tasks.push(task);
  renderList();
}

function handleInputKeypress(e) {
  if (e.key == "Enter") {
    const text = e.target.value;
    if (!text) {
      showNotification("enter todo");
      return;
    }
    const task = {
      id: Date.now(),
      text: text,
      done: false,
    };
    e.target.value = "";
    addTask(task);
  }
}
addTaskInput.addEventListener("keypress", handleInputKeypress);

// #example of event Deligation

// function handleClickListener(e){
//     const target = e.target;

//     if(target.className == 'delete'){
//         console.log('in handle click del');
//         const taskId = target.id;
//         deleteTask(taskId);
//         return;
//     }else if (target.className == 'custom-checkbox'){
//         const taskId = target.id;
//         markTaskAsComplete(taskId);
//     }
// }

// #example of event Deligation
// document.addEventListener('click', handleClickListener);
