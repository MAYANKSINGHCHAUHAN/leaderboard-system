const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/history", historyRoutes);

async function initializeUsers() {
  const User = require("");
  const count = await User.countDocuments();

  if (count === 0) {
    const defaultUsers = [
      { name: "Rahul", points: 0 },
      { name: "Kamal", points: 0 },
      { name: "Sanak", points: 0 },
      { name: "Priya", points: 0 },
      { name: "Amit", points: 0 },
      { name: "Neha", points: 0 },
      { name: "Vikram", points: 0 },
      { name: "Suman", points: 0 },
      { name: "Raj", points: 0 },
      { name: "Anjali", points: 0 },
    ];

    await User.insertMany(defaultUsers);
    console.log("Default users created");
  }
}

initializeUsers();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
