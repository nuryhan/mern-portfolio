const experienceSchema = require("../models/experienceModel");
const mongoose = require("mongoose");

exports.getExperience = async (req, res) => {
  const experience = await experienceSchema.find();

  try {
    res.json(experience);
  } catch (error) {
    res.status(500).json({ msg: "server problem" });
  }
};

exports.addExperience = async (req, res) => {
  const { experience } = req.body;
  try {
    const newExperience = new experienceSchema({
      experience,
    });

    await newExperience.save();
    res.json(newExperience);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const experience = await experienceSchema.findById(req.params.id);
    res.json(experience);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

exports.updateExperienceById = async (req, res) => {
  const { id } = req.params;
  const { experience } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No experience matched with id: ${id}`);

  try {
    const updatedExperience = { experience };
    await experienceSchema.findByIdAndUpdate(id, updatedExperience, {
      new: true,
    });
    res.json({ msg: "Item updated" });
  } catch (error) {
    res.status(500).json({ msg: "server updated error" });
  }
};

exports.delExperienceById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No experience with this id: ${id}`);

  try {
    await experienceSchema.findByIdAndRemove(id);
    res.json({ msg: "experience deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
