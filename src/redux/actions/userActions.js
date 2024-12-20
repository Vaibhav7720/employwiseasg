import axios from "axios";

export const fetchUsers = (page) => async (dispatch) => {
  dispatch({ type: "FETCH_USERS_REQUEST" });
  try {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
  }
};
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.delete(`https://reqres.in/api/users/${id}`);
    if (response.status === 204) {
      const updatedUsers = getState().users.users.filter(
        (user) => user.id !== id
      );
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: updatedUsers });
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return { success: true, message: "User deleted successfully!" };
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "Failed to delete user. Please try again.",
    };
  }
};

export const editUser = (id, userData) => async (dispatch, getState) => {
  try {
    const response = await axios.put(
      `https://reqres.in/api/users/${id}`,
      userData
    );

    if (response.status === 200) {
      const updatedUsers = getState().users.users.map((user) =>
        user.id === id ? { ...user, ...userData } : user
      );
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: updatedUsers });

      // Return success message
      return { success: true, message: "User updated successfully!" };
    }
  } catch (error) {
    console.error("Error updating user:", error);

    // Return error message
    return {
      success: false,
      message: "Failed to update user. Please try again.",
    };
  }
};
