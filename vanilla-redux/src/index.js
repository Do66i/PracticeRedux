import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

//! NEVER USE MUTATE STATE
const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== parseInt(action.id)); //! WHY filter method ?
      return cleaned;
    default:
      return state;
  }
};

/* 
? State is read-only
? The only way to change the state is to emit an action, an object describing what happend.
! So you should NEVER mutate the state
? Remember to return new state objects, instead of mutating the previous state.
* => You don't modifine the state, RETURN the state.. a New one !
* => like... don't do that return state.push(action.text)
*/

const store = createStore(reducer);

store.subscribe(() => console.log("Store", store.getState()));

const dispatchAddTodo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  console.log(e.target.parentNode.id);
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  // createToDo(toDo);
  dispatchAddTodo(toDo);
};

form.addEventListener("submit", onSubmit);
