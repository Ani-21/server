const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config();

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res.status(400).json({ msg: "Username and password are required." });

  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.status(409).json({ msg: "User already exists" });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPwd,
    };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.status(201).json(usersDB.users);
  } catch (err) {
    res.status(500);
  }
};

module.exports = { handleNewUser };
