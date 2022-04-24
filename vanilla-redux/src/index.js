import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const reducer = () => {
  return "Hello";
};

const countStore = createStore(reducer);

console.log(countStore);
