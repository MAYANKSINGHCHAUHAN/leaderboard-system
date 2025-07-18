// const User = require("../models/User");
// const History = require("../models/History");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.points += points;
    await user.save();

    const history = new History({
      userId: user._id,
      points,
    });
    await history.save();

    res.json({ points, totalPoints: user.points });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
