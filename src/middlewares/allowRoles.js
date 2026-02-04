const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ EC: 1, MS: "You don't have permission to access this api" });
    }
    next();
  };
};

export default allowRoles;
