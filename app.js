//SELECTORS
const todoInput = document.querySelector(".todo-input"); //My input type text with todo-input class
const todoButton = document.querySelector(".todo-button"); //My button with todo-button class
const todoList = document.querySelector(".todo-list"); //My list with todo-list class
const filerOption = document.querySelector(".filter-todo"); //my select

//EVENT LISTENERS

todoButton.addEventListener("click", addTodo); //Everytime I click the button, I call my function addTodo

todoList.addEventListener("click", deleteCheck);

filerOption.addEventListener("click", filerTodo);

//FUNCTIONS

//In the parameter I write 'event' because I call this function In my eventListener for the button, so im passing an event object to this function

function addTodo(event) {
  //Prevent HTML Form from submitting
  event.preventDefault();

  //Create a div
  const todoDiv = document.createElement("div");

  //Add a class to the div
  todoDiv.classList.add("todo");

  //Create li
  const newTodo = document.createElement("li");

  //Add a value to the li (i add the value of the input type text, meaning the value that the user write on the input before clicking the button)
  newTodo.innerText = todoInput.value;

  //Add a class to the li
  newTodo.classList.add("todo-item");

  //Add the li inside the Div (append the li to the div)
  todoDiv.appendChild(newTodo);

  //Add the check mark button
  const completeButton = document.createElement("button");

  //Add the icon from fontawesome to the button (as i want to add the icon i need to use html tags, thats why i use innerHTML)
  completeButton.innerHTML = "<li class='fas fa-check'></li>";

  //Add a class to the check mark button
  completeButton.classList.add("complete-btn");

  //Add the check mark button inside de div
  todoDiv.appendChild(completeButton);

  //Add the trash button
  const trashButton = document.createElement("button");

  //Add the icon from fontawesome to the button (as i want to add the icon i need to use html tags, thats why i use innerHTML)
  trashButton.innerHTML = "<li class='fas fa-trash'></li>";

  //Add a class to the trash button
  trashButton.classList.add("trash-btn");

  //Add the trash button inside de div
  todoDiv.appendChild(trashButton);

  //Add the div inside my todoList (inside mi ul tags)
  todoList.appendChild(todoDiv);

  //Clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  //I save on the const item whatever we are click on the list (with console log e.target you can see how this works)
  const item = e.target;

  //TRASH BUTTON
  //Check if the element that was click had the class trast-btn (the trash button)
  if (item.classList[0] === "trash-btn") {
    //if so i save the parent of the element in a const in this case the element that had the class trash-btn is the button, so the parent would be de div that constains the button
    const todo = item.parentElement;

    //add a class to the div for the removing animation
    todo.classList.add("fall");

    //Add a event listener type transitionend(because on my css i have a transform for the class fall that i added to the div). Once the animation(transition that i have on css) is done then is going to execute the function and remove the div
    todo.addEventListener("transitionend", function () {
      //remove the parent (i remove the entire div). This executes after the event (the transition) is done
      todo.remove();
    });
  }

  saveLocalTodos(todoInput.value);

  //CHECK BUTTON
  //Check if the element that was click had the class complete-btn (the check mark button)
  if (item.classList[0] === "complete-btn") {
    //if so i save the parent of the element in a const
    const todo = item.parentElement;
    //I add a toogle class to the parent (to the div that constains the buttons)
    todo.classList.toggle("completed");
  }
}

//Filter function

function filerTodo(e) {
  const todos = todoList.childNodes; //Save all the elements in my list

  todos.forEach(function (todo) {
    switch (
      e.target.value //do a switch with the select options (e is referring to the event of my select)
    ) {
      case "all":
        todo.style.display = "flex"; //in the case that the select option that was click was 'all' then i show all the elements of my list

        break;

      case "completed": //in the case that the select option that was click was 'completed'
        if (todo.classList.contains("completed")) {
          //I checked the elements of my list that have the class 'completed'(i add this class in the check mark funtion)
          todo.style.display = "flex"; //I show the elements of my list that have the class 'completed'
        } else {
          todo.style.display = "none"; //If the elements dont have the class completed i dont show them
        }
        break;

      case "uncompleted": //in the case that the select option that was click was 'uncompleted'
        if (!todo.classList.contains("completed")) {
          //I checked the elements of my list that dont have the class 'completed'(i add this class in the check mark funtion)
          todo.style.display = "flex"; //I show the elements of my list that dont  have the class 'completed'
        } else {
          todo.style.display = "none"; //If the elements  have the class completed i dont show them
        }
        break;
    }
  });
}

//Function to save the todo list on my local storage
function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todo") === null) {
    todos = []; //if i dont have a todo list on local storage, then i create an empty array
  } else {
    //if i do have a todo list already, i save that list in a variable in the form of an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //I push the element that im adding to the array where i save the list
  todos.push(todo);

  //I put the list back to the local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}
