import React, { useState, useEffect } from "react";
import axios from "axios";

const UserSelection = ({ onUserSelect, onClaimPoints }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    onUserSelect(e.target.value);
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/claim",
        {
          userId: selectedUser,
        }
      );
      onClaimPoints(response.data.points, response.data.totalPoints);
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/users", {
        name: newUserName,
      });
      setNewUserName("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="user-selection">
      <h2>User Selection</h2>
      <div>
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={handleClaimPoints} disabled={!selectedUser}>
          Claim Points
        </button>
      </div>

      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter new user name"
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserSelection;
