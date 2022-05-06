'use strict'
// Declare reusable variables
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("input");
const todoList = document.getElementById('list');
const uncheck = "fa-circle-thin";
const checked = "fa-check-circle";
const todoArray = JSON.parse(localStorage.getItem('todoItems'));

// Load Items from localStorage
if (todoArray) {
    todoArray.forEach(todoItem => {
        addTodo(todoItem);
    });    
}

// Set Date
function dateTime() {
    const today = new Date();
    const dateOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    const stringDate = today.toLocaleString('en-US', dateOptions);
    setInterval(dateTime, 1000);
    document.getElementById('date').textContent = stringDate;
}
dateTime();
(function () {
    const copyDate = new Date();
    const copyYear = copyDate.getFullYear();
    
    const copyright = document.querySelector('.copyright-year');
    copyright.textContent = copyYear;    
}());

 setTimeout(() => {document.querySelector(".guide").style.display = "none";}, 100000);

// Create and add todo items dynamically
function addTodo(todo) {

    let itemText = todoInput.value;
    if (todo) {
        itemText = todo.text;
    }

    //  dynamically create elements
    const item = document.createElement('li');
    const nestedDiv = document.createElement('div');
    const check = document.createElement('i');
    const todoText = document.createElement('p');
    const deleteBtn = document.createElement('i');

    item.classList.add("item");
    check.setAttribute('id', "complete-toggle");
    check.classList.add("fa", 'co');
    
    if (todo) {
        if (todo.completed) {
            check.classList.add(checked);
            todoText.classList.toggle("lineThrough")
        }
    }
    if (!check.classList.contains(checked)){
        check.classList.add(uncheck);
    }
    
    deleteBtn.classList.add("fa", "fa-trash-o", 'de');
    todoText.classList.add("text");
    todoText.textContent = itemText;
    nestedDiv.appendChild(check);
    nestedDiv.appendChild(todoText);
    item.appendChild(nestedDiv);
    item.appendChild(deleteBtn);

    // add item to list
    todoList.append(item);  

    updateLocalStorage();
    todoInput.value = ''; 
}

// Add to do on submit
todoForm.addEventListener('submit', (e) => { e.preventDefault(); addTodo(); });

// Add to do on click
document.getElementById("todo-add-icon").addEventListener('click', () =>
 {   
     if (todoInput.value === '') {
         todoInput.focus();
         todoInput.placeholder = "You Must Add Todo 😒";

         setTimeout(() => todoInput.placeholder = "Add a to-do", 1500);
     }else {
        addTodo();
     }
});

todoList.addEventListener("click", function (event) {
    const eventTarget = event.target;
    // Toggle complete
    if (eventTarget.id === 'complete-toggle') {
        eventTarget.parentNode.parentNode.querySelector(".text").classList.toggle("lineThrough");
        updateLocalStorage();
        todoInput.focus();
        if (eventTarget.classList.contains(uncheck)) {
            eventTarget.classList.toggle(uncheck);
            eventTarget.classList.toggle(checked);
            updateLocalStorage();
        } else if (eventTarget.classList.contains(checked)) {
         eventTarget.classList.toggle(checked);
         eventTarget.classList.toggle(uncheck);
         updateLocalStorage();
        }
    }

    // Delete Todo
    if (eventTarget.className === 'fa fa-trash-o de') {
        event.stopPropagation();
        eventTarget.parentNode.remove();  
        updateLocalStorage();      
        todoInput.focus();
    }
});

// Update LocalStorage
function updateLocalStorage() {
    const todosEl = document.querySelectorAll('.text');
    let todoArray = [];

    todosEl.forEach(listItem => {
        todoArray.push(
        {
            text: listItem.textContent,
            completed: listItem.parentNode.querySelector("#complete-toggle").classList.contains(checked)
        });
    });

    localStorage.setItem('todoItems', JSON.stringify(todoArray));
}

// reset
document.getElementById("clear").addEventListener('click', () => {
    localStorage.clear();
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
});
