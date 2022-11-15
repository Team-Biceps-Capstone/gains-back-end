const Badge = require("../models/badgeModel");

const getBadge = async (req, res) => {
  try {
    const { name } = req.body;
    const badge = await Badge.getBadge(name);
    res.status(200).send(badge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBadge };
