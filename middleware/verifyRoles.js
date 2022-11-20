const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesRoute = [...allowedRoles];
    console.log(req.roles);
    console.log(rolesRoute);
    const result = req.roles
      .map((role) => rolesRoute.includes(role))
      .find((val) => val === true);

    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
