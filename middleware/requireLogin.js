export const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in.");
  }
  next();
};