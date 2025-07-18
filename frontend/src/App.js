import React, { useState } from "react";
import "./App.css";
import UserSelection from "./components/UserSelection";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [lastClaim, setLastClaim] = useState(null);

  const handleClaimSuccess = (points, totalPoints) => {
    setLastClaim({ points, totalPoints });
  };

  return (
    <div className="App">
      <h1>Leaderboard System</h1>

      <UserSelection
        onUserSelect={() => setLastClaim(null)}
        onClaimPoints={handleClaimSuccess}
      />

      {lastClaim && (
        <div className="claim-notification">
          Successfully claimed {lastClaim.points} points! Total:{" "}
          {lastClaim.totalPoints}
        </div>
      )}

      <Leaderboard />
    </div>
  );
}

export default App;
