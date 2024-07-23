import { useState, useEffect } from "react";
import "./App.css";
import { realtime_database } from "./firebase/realtime_database/services";
import { onValue, off } from "firebase/database";

function App() {
  const [data, setData] = useState([
    {
      text: "",
      isCompleted: false,
    },
  ]);
  const [todo, setTodo] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await realtime_database.sendData(...data);
    console.log(...data);
  };

  useEffect(() => {
    const unsubscribe = onValue(realtime_database.dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTodo(Object.entries(data));
        console.log(data);
      } else {
        setTodo([]);
      }
    });

    return () => {
      off(realtime_database.dataRef, unsubscribe);
    };
  }, []);
  console.log(todo);
  return (
    <>
      <div className="main">
        <div className="top">
          <form onSubmit={onSubmitHandler}>
            <div className="todo">
              <input
                type="text"
                className="todo-input"
                onChange={(e) => {
                  setData([{ text: e.target.value, isCompleted: false }]);
                }}
              />
            </div>
            <div className="todo-btn">
              <button className="todo-btn">Add Todo</button>
            </div>
          </form>
        </div>
        <div className="bottom">
          {todo.map((item, index) => {
            return (
              <div
                className="box"
                style={
                  item[1]?.isCompleted
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "trasperant" }
                }
                key={index}
              >
                <p className="input-show-todo" id={item[0]}>
                  {item[1]?.text}{" "}
                </p>
                <hr className="hr" />
                <div className="btn-group">
                  <div className="edit"></div>
                  <div className="delete">
                    <button
                      id={item[0]}
                      className="btn-social"
                      onClick={(e) => {
                        realtime_database.deleteDoc(e.target.id);
                      }}
                    >
                      ❌
                    </button>
                  </div>
                  <div className="compelte ">
                    <button
                      id={item[0]}
                      className="btn-social"
                      onClick={(e) => {
                        realtime_database.completeData(
                          e.target.id,
                          item[1].text
                        );
                      }}
                    >
                      ✅
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
