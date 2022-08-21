const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
// all
router.get(`/`, async (req, res) => {
  const categoriesList = await Category.find();
  if (!categoriesList) {
    res.status(500).json({ success: false });
  }

  res.status(200).send(categoriesList);
});
// single cat
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given id was not found" });
  }
  res.status(200).send(category);
});

// update single
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    return res.status(400).send("cannot update the category");
  }
  res.send(category);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();
  if (!category) {
    return res.status(404).send("the category cannot be created");
  }

  res.send(category);
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "the category deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "category not found",
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        success: false,
        error: err,
      });
    });
});
router.post(`/`, (req, res) => {});

module.exports = router;
