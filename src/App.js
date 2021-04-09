import { Fragment, useState, useRef, useEffect } from "react";
import "./css/App.css";
import mainIcon from "./images/checklist.svg";
import addItemIcon from "./images/add.svg";
import removeItemIcon from "./images/remove.svg";
import smileIcon from "./images/smile.svg";
import { v4 as uuidv4 } from "uuid";

function App() {
  const inputRef = useRef();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("list")) {
      setItems(JSON.parse(localStorage.getItem("list")));
    } else {
      localStorage.setItem("list", JSON.stringify([]));
    }
  }, []);

  const addItem = (e, flag) => {
    if (e.key === "Enter" || flag) {
      if (!inputRef.current.value) return;
      const obj = { id: uuidv4(), item: inputRef.current.value };
      setItems([obj, ...items]);
      inputRef.current.value = "";
      let localItems = JSON.parse(localStorage.getItem("list"));
      localItems.unshift(obj);
      localStorage.setItem("list", JSON.stringify(localItems));
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    let localItems = JSON.parse(localStorage.getItem("list"));
    localItems = localItems.filter((item) => item.id !== id);
    localStorage.setItem("list", JSON.stringify(localItems));
  };

  return (
    <Fragment>
      <div className="navbar">
        <div className="container">
          <p>
            To<span>Do</span>
          </p>
          <img src={mainIcon} alt="Icon" />
        </div>
      </div>
      <div className="add-item">
        <input
          type="text"
          id="list"
          ref={inputRef}
          onKeyDown={addItem}
          placeholder="Add Item"
        />
        <img
          src={addItemIcon}
          alt="Add Item"
          onClick={(e) => addItem(e, true)}
        />
      </div>
      {items.length > 0 ? (
        <div className="show-items">
          {items.map((item) => (
            <div key={item.id} className="container">
              <p>{item.item}</p>
              <img
                src={removeItemIcon}
                alt="Remove Icon"
                onClick={() => deleteItem(item.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="nolist">
          <p>No todos</p>
          <img src={smileIcon} alt="Smile" />
        </div>
      )}
    </Fragment>
  );
}

export default App;
