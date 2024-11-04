let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoItem = document.getElementById("addTodoItem");
let saveTodoItem = document.getElementById("saveTodoItem");

//Get data from Local Storage//
function getDataFromLocalStorage(){
    let getData = localStorage.getItem("todoList");
    let parsedData = JSON.parse(getData);

    if(parsedData === null){
        return[]
    }else{
        return parsedData
    }
}

todoList = getDataFromLocalStorage();

//Store the data into local storage//
function storeDataLocalStorage(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
saveTodoItem.onclick = function(){
    storeDataLocalStorage()
}

//Add todo items//
function  onAddTodoItems(){
    let userInputElement = document.getElementById("inputElement");
//Get user input value//
    let userInputValue = userInputElement.value; 

//Find the array length//
    let todosCount = todoList.length;

//whenever we can add item then increase the item//
    todosCount = todosCount + 1

//we can try to without user input value then it show the alert message//
    if(userInputValue === ""){
        alert("Enter a valid text")
        return;
    }
//Create new object and add new item//
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked:false
    }
//push the new item in todoList.then it will be stored in local storage.//
    todoList.push(newTodo);

    createAndAppendTodo(newTodo);
    userInputElement.value = ""
}

addTodoItem.onclick = function(){
    onAddTodoItems()
}

//checkbox label textdecoration line through//
function  onTodoStatusChange(checkboxId,labelId,todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");
    // if(checkboxElement.checked === true){
    //     labelElement.classList.add("checked")
    // }else{
    //     labelElement.classList.remove("checked")
    // }

    //Persist the checked status//
    let eachCheckIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if(eachTodoId === todoId){
            return true
        }
        else{
            return false
        }
    })

    let todoObject = todoList[eachCheckIndex];

    if(todoObject.isChecked === true){
        todoObject.isChecked = false;
    }else{
        todoObject.isChecked = true;
    }
}

//Delete Todo Item//

function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

//Exampl Find Index method//
// let array = [
//     {
//         text:"Learn HTML",
//         uniqueNo:1
//     },
//     {
//         text:"Learn CSS",
//         uniqueNo:2
//     }
// ]

// let eachIndex = array.findIndex(function(eachItem){
//     if(eachItem.uniqueNo === 2){
//         return true
//         }
//         else{
//             return false
//         }
// })
// console.log(eachIndex);

//Delete the item in local storage//
    let deleteItemIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo"+ eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true
        }
        else{
            return false
        }
    })
    todoList.splice(deleteItemIndex,1)
}

//Creating todolist dynamically//
function createAndAppendTodo(todo){
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;


    let todoElements = document.createElement("i");
    todoElements.classList.add("d-flex","flex-row","todo-element")
    todoElements.id=todoId;
    todoItemsContainer.appendChild(todoElements);
    
    let inputEl = document.createElement("input");
    inputEl.classList.add("input-element")
    inputEl.type="checkbox";
    inputEl.id=checkboxId;
    inputEl.checked = todo.isChecked
    inputEl.onclick = function(){
        onTodoStatusChange(checkboxId,labelId,todoId)
    }
    todoElements.appendChild(inputEl);
    
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex","flex-row","label-container")
    todoElements.appendChild(labelContainer);
    
    let labelElement = document.createElement("label");
    labelElement.classList.add("label-element")
    labelElement.setAttribute("for",checkboxId);
    labelElement.id=labelId;
    labelElement.textContent=todo.text;
    if(todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
    
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("deleteContainer");
    labelContainer.appendChild(deleteIconContainer);
    
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function(){
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
    
    
}

for(let todo of todoList){
    createAndAppendTodo(todo)
}


