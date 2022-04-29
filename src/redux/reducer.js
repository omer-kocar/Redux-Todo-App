import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// initialState needs to be an array for the reducer to work any other type will cause an error
const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // reducers are functions that take the current state and an action, and return the new state
    // addTodos
    addTodos: (state, action) => {
      // reducer has access to the state and action and can modify it
      state.push(action.payload);
      return state;
      // action.payload is the todo that was added
      // about payload: https://redux-toolkit.js.org/api/createSlice#payload
      // payload makes it easy to pass data to the reducer
      // payload works with redux-thunk
      // redux-thunk is a middleware that allows us to dispatch actions asynchronously
    },
    // removeTodos
    removeTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    // updateTodos
    updateTodos: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          // if the id of the item matches the id of the item that was updated
          return {
            ...item,
            completed: !item.completed,
            // ...item is a spread operator that takes all the properties of the item and adds them to the new object
          };
        }
        return item;
      });
    },
    // completeTodos
    completeTodos :  (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: true,
          };
        }
        return item;
      });
    }
  },
});

export const { addTodos, removeTodos, updateTodos, completeTodos } = addTodoReducer.actions;
// to export the actions in the reducer
export const reducer = addTodoReducer.reducer;
// adding the reducer to the store
