import { ADD_DATA, SORT_DATA } from "./actionTypes";

const addData = (payload) => ({
  type: ADD_DATA,
  payload,
});

const sortData = (payload) => ({ type: SORT_DATA, payload });

export { addData, sortData };
