import * as authService from "../services/authService.js";

export const showSignup = (req, res) => {
  if (req.user) {return res.redirect("/groups");}
  res.render("signup", {
    title: "Sign Up",
    error: null
  });
};

export const signup = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body);
    if (!result.ok) {
      return res.status(result.error.status).render("signup", {
        title: "Sign Up",
        error: result.error.message
      });
    }
    req.session.regenerate((error) => {
      if (error) {return next(error);}
      req.session.userId = result.value.id;
      req.session.save((saveError) => {
        if (saveError) {return next(saveError);}
        res.redirect("/groups");
      });
    });
  } catch (error) {next(error);}
};

export const showLogin = (req, res) => {
  if (req.user) {return res.redirect("/groups");}
  res.render("login", {
    title: "Log In",
    error: null
  });
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    if (!result.ok) {
      return res.status(result.error.status).render("login", {
        title: "Log In",
        error: result.error.message
      });
    }
    req.session.regenerate((error) => {
      if (error) {return next(error);}
      req.session.userId = result.value.id;
      req.session.save((saveError) => {
        if (saveError) {return next(saveError);}
        res.redirect("/groups");
      });
    });
  } catch (error) {next(error);}
};

export const logout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {return next(error);}
    res.clearCookie("connect.sid");
    res.redirect("/groups");
  });
};