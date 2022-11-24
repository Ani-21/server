const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.send(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req.body.id) return res.send(204).json({ message: "xf" });

  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user)
    return res
      .send(400)
      .json({ message: `No user with ID ${req.body.id} found` });

  const result = await User.deleteOne({ _id: req.body.id });

  res.json(result);
};

const getUser = async (req, res) => {
  if (!req.params.id) return res.send(204).json({ msg: "ID required" });

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user)
    return res
      .send(400)
      .json({ message: `No user with ID ${req.body.id} found` });

  res.json(user);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
