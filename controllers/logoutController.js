const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(
    (person) => (person.refreshToken = refreshToken)
  );
  if (!foundUser) {
    res.clearCookies("jwt", { httpOnly: true });
    res.sendStatus(204);
  }

  try {
    const otherUsers = usersDB.users.filter(
      (person) => person.refreshToken !== foundUser.refreshToken
    );

    const currentUser = { ...foundUser, refreshToken: "" };

    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.clearCookies("jwt", { httpOnly: true });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = { handleLogout };
