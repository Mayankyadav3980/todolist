var toDoListApp = (function () {
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
              ${task.completed && "checked"}  
              class="custom-checkbox" 
              onclick='toDoListApp.markTaskAsComplete(${task.id})'>

              <label for="${task.id}">${task.title}</label>
              <img src="bin.png" c
              lass="delete" 
              id="${task.id}" 
              onclick='toDoListApp.deleteTask(${task.id})' />    
             `;
      tasksList.append(li);
    }

    tasksCounter.innerHTML = tasks.length;
  }

  function markTaskAsComplete(taskId) {
    let newTasks = tasks.map((obj) => {
      if (obj.id == taskId) return { ...obj, completed: !obj.completed };
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
        alert("enter todo");
        return;
      }
      const task = {
        id: Date.now(),
        title: text,
        completed: false,
      };
      e.target.value = "";
      addTask(task);
    }
  }

  async function fetchData() {
    try {
      let resObj = await fetch("https://jsonplaceholder.typicode.com/todos");
      let jsonObj = await resObj.json();
      tasks = jsonObj.slice(0, 10);
      renderList();
    } catch (err) {
      console.log(err);
    }
  }

  function initializeApp() {
    fetchData();
    addTaskInput.addEventListener("keypress", handleInputKeypress);
  }
  initializeApp();

  return {
    tasks,
    markTaskAsComplete,
    deleteTask: deleteTask,
  };

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
})();
