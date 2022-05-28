// the useReducer is an alternative to useState but more complex, powerful and flexible (can be more specific)
// useState is a syntactic sugar of useReducer that simplifies it

// reducer function receives 2 parameters
// will receive the current state
// will receive the action we want to implement to the state
// based on the action, the function will update the state one way or another
// action is an object with 2 keys, type and data
// the 'type' key determines what is the action
// the 'data' key contains the data necessary to update the state

// the function returns the updated state -> MUST return or will throw an error

export const reducer = (state, action) => {
  console.log(state);
  console.log(action);

  switch (action.type) {
    // state reverts to default values
    case "cleanState": {
      return {
        messageList: [],
        loggegInUser: "",
      };
    }
    case "setMessageList": {
      // populates the messageList array with the inital values
      return {
        // spread operator updates the destructured state
        ...state,
        // action.data allows us to access the data and assigns/updates the data to messageList
        messageList: action.data,
      };
    }
    case "addMessage": {
      // receives a message and updates it to the list
      return {
        ...state,
        // action.data takes the new data and adds to beginning of list and '...state.messageList' destructures the message list from state and includes it after newest message
        messageList: [action.data, ...state.messageList],
      };
    }

    case "setLoggedInUser": {
      // updates the loggedin user value
      return {
        ...state,
        // action.data takes the new data (username) and '...state.messageList' destructures the message list and includes it after newest message
        loggedInUser: action.data,
      };
    }
    // If any of the above cases above don't work, return state as default
    default:
      return state;
  }
};
