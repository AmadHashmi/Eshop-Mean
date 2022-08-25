const { User } = require("../models/user");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    return res.status(500).json({ success: false });
  }
  res.send(userList);
});

// single
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    return res.status(500).send("User not found");
  }
  res.status(200).send(user);
});
router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcryptjs.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  user = await user.save();
  if (!user) {
    return res.status(400).send("The user not created!");
  }
  res.send(user);
});
// update user
router.put("/:id", async (req, res) => {
  const userExist = User.findById(req.params.id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcryptjs.hashSync(req.body.password, 10);
  } else {
    newPassword = userExist.passwordHash;
  }
  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  ).select("-passwordHash");

  if (!user) {
    return res.status(400).send("the user is not updated!");
  }
  res.send(user);
});

// login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    return res.status(400).send("User not found!");
  }
  if (user && bcryptjs.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    return res.status(200).send({ user: user.email, token: token });
  } else {
    return res.status(400).send("Password Wrong");
  }
});

// count
router.get("/get/count", async (req, res) => {
  const userCount = await User.countDocuments();
  if (!userCount) {
    return res.status(500).json({ success: false });
  }
  res.send({ userCount: userCount });
});

// DELETE

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "User is deleted successfully!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
