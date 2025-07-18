import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
    fetchHistory();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/history");
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleClaimSuccess = () => {
    fetchLeaderboard();
    fetchHistory();
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leaderboard-container">
        <div className="current-rankings">
          <h3>Current Rankings</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="point-history">
          <h3>Point History</h3>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Points</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record._id}>
                  <td>{record.userId?.name || "Unknown"}</td>
                  <td>+{record.points}</td>
                  <td>{new Date(record.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
