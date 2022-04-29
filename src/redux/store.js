import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
// creating the configureStore for the redux store
// configureStore is a function that takes in a reducer and returns a store

const store = configureStore({
    reducer:reducer
})
// store created for reducer

export default store;
// exporting the store


// store created and now we can use the store in our components
// we can connect the store to our components using react-redux


