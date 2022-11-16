const Constant = require("../models/constantModel");

const getConstant = async (req, res) => {
  const { name } = req.body;
  try {
    const constant = await Constant.getConstant(name);
    res.status(200).json({
      _id: constant.id,
      name: constant.name,
      items: constant.items,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getConstant };
