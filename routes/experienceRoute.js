const {
  getExperience,
  addExperience,
  getExperienceById,
  updateExperienceById,
  delExperienceById,
} = require("../controllers/experienceController");

const router = require("express").Router();

// get education
router.get("/experience", getExperience);

// add education
router.post("/experience", addExperience);

// get specific education by idExperience
router.get("/experience/:id", getExperienceById);

// update education by id
router.put("/experience/update/:id", updateExperienceById);

// delete education by id
router.delete("/experience/:id", delExperienceById);

module.exports = router;
