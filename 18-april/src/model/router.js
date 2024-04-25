module.exports = (function () {
  const express = require("express");
  const User = require("./user");
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  const router = express.Router();

  //create new user
  router.post("/users", async (req, res) => {
    console.log(req.body);
    const { username, email, password, firstName, lastName, age } = req.body;
    try {
      const user = new User({
        username,
        email,
        password,
        firstName,
        lastName,
        age,
      });
      await user.save();
      res.redirect("/users")
    } 
    catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  router.get("/users", async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
//for update    //user/1
  router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { username, email, password, firstName, lastName, age } = req.body;

    try {
      const user = await User.findByIdAndUpdate(id, {
        username,
        email,
        password,
        firstName,
        lastName,
        age,
      });
      res.send(user);
    } 
    catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  //delete users
  router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  return router;
})();
