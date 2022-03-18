const router = require("express").Router();
const {
  getProject,
  addProject,
  getProjectById,
  updateProjectById,
  delProjectById,
} = require("../controllers/projectController");

// get project
router.get("/project", getProject);

// add project
router.post("/project", addProject);

// get specific project by idExperience
router.get("/project/:id", getProjectById);

// update project by id
router.put("/project/update/:id", updateProjectById);

// delete project by id
router.delete("/project/:id", delProjectById);

module.exports = router;
