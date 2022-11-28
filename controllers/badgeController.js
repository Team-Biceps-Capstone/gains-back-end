const Badge = require("../models/badgeModel");
const Challenge = require("../models/challengeModel")

const getBadge = async (req, res) => {
  try {
    const { name } = req.body;
    const badge = await Badge.getBadge(name);
    res.status(200).send(badge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBadgeInfo = async (req, res) => {
  try {
    
    const allBadgeInfo = await Badge.getBadge(req.params.name)
    res.status(200).send(allBadgeInfo);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBadge, getBadgeInfo };
