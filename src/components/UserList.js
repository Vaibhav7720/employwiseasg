import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/actions/userActions";
import EditUser from "./EditUser";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [page, setPage] = useState(1);
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    const result = await dispatch(deleteUser(id));
    if (result.success) {
      setMessage(result.message);
    } else {
      setMessage("Failed to delete user. Please try again.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSaveEdit = () => {
    setEditingUserId(null);
    setMessage("User details updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-white shadow-lg">
        User Management System
      </h1>
      {message && (
        <p
          className={`text-center p-4 rounded-lg ${
            message.includes("successfully")
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          } shadow-md`}
        >
          {message}
        </p>
      )}
      {loading ? (
        <p className="text-center text-white text-xl mt-8">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) =>
            editingUserId === user.id ? (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-lg p-6 transform transition hover:scale-105"
              >
                <EditUser
                  user={user}
                  closeModal={() => setEditingUserId(null)}
                  onSave={handleSaveEdit}
                />
              </div>
            ) : (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-lg p-6 transform transition hover:scale-105"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-24 h-24 rounded-full shadow-md mb-4 border-4 border-blue-500"
                  />
                  <h2 className="text-xl font-semibold text-gray-700">
                    {`${user.first_name} ${user.last_name}`}
                  </h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                <div className="flex justify-around mt-6">
                  <button
                    onClick={() => setEditingUserId(user.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg mx-2 hover:bg-gray-800 transition disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === 2}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg mx-2 hover:bg-gray-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
