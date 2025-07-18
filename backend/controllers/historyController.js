const History = require;

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
