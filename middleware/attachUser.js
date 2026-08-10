import * as authService from "../services/authService.js";

export const attachUser = async (req, res, next) => {
  try {
    req.user = null;
    if (req.session?.userId) {
      const user = await authService.getUserById(req.session.userId);
      if (user) {
        req.user = user;
      } else {
        req.session.destroy(() => {});
      }
    }
    next();
  } catch (error) {next(error);}
};