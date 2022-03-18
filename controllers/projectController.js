const projectSchema = require("../models/projectModel");
const mongoose = require("mongoose");

exports.getProject = async (req, res) => {
  const project = await projectSchema.find();

  try {
    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: "server problem" });
  }
};

exports.addProject = async (req, res) => {
  const { project_id, title, description, images } = req.body;
  try {
    const newProject = new projectSchema({
      project_id,
      title,
      description,
      images,
    });

    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await projectSchema.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.updateProjectById = async (req, res) => {
  const { id } = req.params;
  const { project_id, title, description, images } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No project matched with id: ${id}`);

  try {
    const updatedProject = { project_id, title, description, images };
    await projectSchema.findByIdAndUpdate(id, updatedProject, {
      new: true,
    });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ msg: "server updated error" });
  }
};

exports.delProjectById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No project with this id: ${id}`);

  try {
    await projectSchema.findByIdAndRemove(id);
    res.json({ message: "project deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
