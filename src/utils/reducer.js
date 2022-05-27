// the useReducer is an alternative to useState but more complex, powerful and flexible (can be more specific)
// useState is a syntactic sugar of useReducer that simplifies it

// reducer function receives 2 parameters
// will receive the current state
// will receive the action we want to implement to the state
// based on the action, the function will update the state one way or another
// action is an object with 2 keys, type and data

export const reducer = (state, action) => {
  console.log(state);
  console.log(action);
};
