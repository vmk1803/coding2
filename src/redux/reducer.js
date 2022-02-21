import { ADD_DATA, SORT_DATA } from "./actionTypes";

const init = {
  data: [],
  sortedData: [],
};

const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_DATA:
      return { ...state, data: payload };
    case SORT_DATA:
      return { ...state, sortedData: payload };
    default:
      return state;
  }
};

export { reducer };
