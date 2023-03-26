const router = require("express").Router();
const User = require("../models/user");
const Verify = require("../models/verify");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,
    city: req.body.city,
  });

  try {
    const savedUser = await user.save();
    const arrayOfRandomNumbers = [];
    for (let i = 0; i < 4; i++) {
      arrayOfRandomNumbers.push(Math.floor(Math.random() * 10));
    }
    const verify = new Verify({
      user: savedUser._id,
      pin: arrayOfRandomNumbers,
    });
    await verify.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const user = await Verify.find({ user: req.body.userId });
    if (!user) {
      res.json({ message: "user not found" });
    }
    const equalsCheck = (a, b) => {
      return JSON.stringify(a) === JSON.stringify(b);
    };
    if (equalsCheck(user.at(-1).pin, req.body.pin)) {
      await Verify.findByIdAndRemove(user.at(-1)._id);
      res.json({ message: "verified" });
    } else {
      await Verify.findByIdAndRemove(user.at(-1)._id);
      res.json({ message: "not verified" });
    }
  } catch (err) {
    res.json({ message: "sdfsdf" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.userId);
    res.json({
      message: "User deleted",
    });
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
