const eventReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENT":
      return action.payload;
    case "SET_EVENT_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// event will be on the redux state at:
// state.event
export default eventReducer;
