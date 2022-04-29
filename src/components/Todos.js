import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos, completeTodos } from "../redux/reducer";

// **********************************************

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};
// mapStateToProps is a function that takes in the state and returns an object
// we use mapStateToProps to connect the state to our component
// mapStateToProps doing the same thing as connect

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => {
      dispatch(addTodos(obj));
    },
    removeTodo: (id) => {
      dispatch(removeTodos(id));
    },
    updateTodo: (obj) => {
      dispatch(updateTodos(obj));
    },
    completeTodo: (id) => {
      dispatch(completeTodos(id));
    },
  };
};

// **********************************************

function Todos(props) {
  const [todo, setTodo] = useState("");
  console.log(props);
  // creating a state variable to hold the todo
  // console.log(todo);

  const inputRef = useRef(true)
  // creating a ref to hold the input

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }
  // changeFocus is a function that changes the focus of the input to the inputRef

  const update = (id, value, e) => {
     if(e.which === 13) {
  //     // 13 is the enter key code
  //     // and which is the key code of the enter key
  //     // if the enter key is pressed then we want to add the todo to the list.
       props.updateTodo({id, item: value});
       inputRef.current.disabled = true;
    };
  }
  // updateTodo is a function that updates the todo state variable

  
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        className="todo-input"
        placeholder="Write Something"
      />

      <button
        className="todo-button"
        onClick={() =>
          props.addTodo({
            id: Math.floor(Math.random() * 1000),
            item: todo,
            completed: false,
          })
        }
      >
        Add
      </button>
      <ul>
        {props.todos.map((todo) => {
          return (
            <li key={todo.item}>
              <textarea 
              ref={inputRef} 
              disabled={inputRef} 
              defaultValue={todo.item} 
              onKeyPress={(e)=> {
                 update(todo.id, inputRef.current.value, e)
              }} />
              <button onClick={() => changeFocus()}>Edit</button>
              <button onClick={()=> props.completeTodo(todo.id)} >Complete</button>
              <button onClick={() => props.removeTodo(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// we can use connect method to connect the store to our component
// export default Todos;
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
// connect takes in two arguments
// first argument is the mapStateToProps
// second argument is the mapDispatchToProps
// connect is a npm install @babel/core @babel/preset-env that takes in a component and returns a component
// connect is a higher order component
// because we don't need to map the dispatch to props
