import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const reducer = (count = 0, action) => {
  // data의 modifier = reducer
  if (action.type === "ADD") {
    // 전송한 msg의 action을 췍
    console.log("만약 'ADD'가 실행된다면 도토잠보를 보여주세요 🐘");
    return ++count;
  } else if (action.type === "MINUS") {
    console.log("만약 'ADD'가 실행된다면 물잇구럭을 보여주세요 🦭");
    return --count;
  } else {
    return count;
  }
};

const countStore = createStore(reducer); // data의 store을 create하고

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: "ADD" });
};

const handleMinus = () => {
  countStore.dispatch({ type: "MINUS" });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
