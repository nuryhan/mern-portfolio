const {
  getEducation,
  addEducation,
  getEducationById,
  updateEducationById,
  delEducationById,
} = require("../controllers/educationController");

const router = require("express").Router();

// get education
router.get("/education", getEducation);

// add education
router.post("/education", addEducation);

// get specific education by id
router.get("/education/:id", getEducationById);

// update education by id
router.put("/education/update/:id", updateEducationById);

// delete education by id
router.delete("/education/:id", delEducationById);

module.exports = router;
