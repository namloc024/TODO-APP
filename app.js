let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        accepDate();
        add.setAttribute("date-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("date-bs-dismiss", "");
        })();
    }
};

let date = [{}];
let accepDate = () => {
    date.push({
        text: textInput.value,
        date: dateInput.value,
        descript: textarea.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
};
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x,y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick="deleteTask(this);createTask()" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });
    resetForm();
};
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
};
let resetForm = () => {
    textInput.value = "";
    dateInput.value ="";
    textarea.value ="";
};
(() =>{
    data = JSON.parse(localStorage.getItem("data")) ||[]
    console.log(data);
    createTasks();
})();
