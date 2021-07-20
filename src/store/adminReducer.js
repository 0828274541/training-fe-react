const INITIAL_STATE = {
  userList: null,
  bookList: null,
  categoryList: null
};
// -----------------------|| CUSTOMIZATION REDUCER ||-----------------------

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        userList: action.payload.userList
      };
    case 'SET_BOOKS':
      return {
        ...state,
        bookList: action.payload.bookList
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categoryList: action.payload.categoryList
      };

    default:
      return state;
  }
};

export default adminReducer;
