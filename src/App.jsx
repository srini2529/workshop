import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    const response = await axios.get("http://191.101.14.91:4040/todos");

    console.log(response.data);

    setTodos(response.data)
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // console.log("current todos", todos);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleClick() {
    setTodos((old) => {
      console.log("old", old);
      return [...old, text];
    });

    setText("");
  }

  function handleDelete(i) {
    setTodos((oldTodos) => {
      let updated = [...oldTodos];

      updated.splice(i, 1);

      return updated;
    });
  }

  return (
    <div>
      <input
        value={text}
        onChange={handleChange}
        type="text"
        placeholder="Enter text"
      />

      <button onClick={handleClick}>Add</button>
      <br />
      <br />

      {todos.map((e, i) => {
        return (
          <div>
            <span
              style={{
                paddingRight: "20px",
              }}
            >
              {e}
            </span>
            <button onClick={() => handleDelete(i)}>delete</button>
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}