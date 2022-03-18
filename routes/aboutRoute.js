const {
  getAbout,
  addAbout,
  getAboutId,
  updateAbout,
  delAbout,
} = require("../controllers/aboutController");

const router = require("express").Router();

// get about user
router.get("/about", getAbout);

// add about user
router.post("/about", addAbout);

// get specific user by id
router.get("/about/:id", getAboutId);

// update specific user by id
router.put("/about/update/:id", updateAbout);

// delete specific user by id
router.delete("/about/:id", delAbout);

module.exports = router;
