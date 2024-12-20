const initialState = {
  users: [],
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_USERS_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
