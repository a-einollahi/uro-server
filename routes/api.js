const router = require("express").Router();
const fs = require("fs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  const user = {};

  const method = req.body.method;
  const module = req.body.module;
  const command = req.body.command;
  const payload = req.body.payload;

  defineUser(req, user);

  if (fs.existsSync(`./modules/${module}/${method}/${command}.js`)) {
    const cmd = require(`../modules/${module}/${method}/${command}`);
    const handler = new cmd();

    if (handler.access === "all" || handler.access.includes(user.role)) {
      try {
        const result = await handler.handler(payload, user);

        return res.json(result);
      } catch (err) {
        next(err);
      }
    }
  } else {
    res.status(404).json({ error_msg: "command handler is not found" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(501).json(err);

    if (!user) return res.status(501).json(info);

    req.logIn(user, (err) => {
      if (err) {
        return res.status(501).json(err);
      } else {
        const token = jwt.sign(
          {
            userId: req.user.id,
            username: req.user.username,
            email: req.user.email,
            first_seen: req.user.first_seen,
            active: req.user.active,
          },
          "tokenFORauthenticationINtheSITE",
          { expiresIn: "2 days" }
        );

        return res.status(200).json({
          message: "Logged in Successfully",
          user: {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role,
            email: req.user.email,
            first_seen: req.user.first_seen,
            active: req.user.active,
          },
          token: token,
        });
      }
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logged out Successfully" });
});

module.exports = router;

function defineUser(req, user) {
  if (!req.user) {
    user["id"] = null;
    user["username"] = null;
    user["role"] = null;
    user["first_seen"] = null;
  } else {
    user["id"] = req.user.id;
    user["username"] = req.user.username;
    user["role"] = req.user.role;
    user["first_seen"] = req.user.first_seen;
  }
}
