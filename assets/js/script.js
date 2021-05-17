var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");

var taskFormHandler = function () {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formE1.reset();

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskE1
    createTaskE1(taskDataObj);
}

var createTaskE1 = function (taskDataObj) {
    //create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    //add task ID as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    //give it a class name
    taskInfoE1.className = "task-info";
    //add HTML content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemE1.append(taskInfoE1);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoE1.appendChild(listItemE1);

    taskIdCounter++;
}

var createTaskActions = function (taskId) {
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";

    //add edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonE1);

    //create delete button
    var delButtonE1 = document.createElement("button");
    delButtonE1.textContent = "Delete";
    delButtonE1.className = "btn delete-btn";
    delButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(delButtonE1);

    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(statusSelectE1);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectE1.appendChild(statusOptionEl);
    }

    return actionContainerE1;
};

var taskButtonHandler = function (event) {
    // get target element from event
    var targetE1 = event.target;

    if(targetE1.matches(".edit-btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetE1.matches(".delete-btn")) {
        //get element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    document.querySelector("#save-task").textContent = "Save Task";
    formE1.setAttribute("data-task-id", taskId);
}

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

formE1.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);