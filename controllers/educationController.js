const educationSchema = require("../models/educationModel");
const mongoose = require("mongoose");

exports.getEducation = async (req, res) => {
  const education = await educationSchema.find();

  try {
    res.json(education);
  } catch (error) {
    res.status(500).json({ msg: "server problem" });
  }
};

exports.addEducation = async (req, res) => {
  const { education } = req.body;
  try {
    const newEducation = new educationSchema({
      education,
    });

    await newEducation.save();
    res.json(newEducation);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.getEducationById = async (req, res) => {
  try {
    const education = await educationSchema.findById(req.params.id);
    res.json(education);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.updateEducationById = async (req, res) => {
  const { id } = req.params;
  const { education } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Education matched with id: ${id}`);

  try {
    const updatedEducation = { education };
    await educationSchema.findByIdAndUpdate(id, updatedEducation, {
      new: true,
    });
    res.json({ msg: "Item updated" });
  } catch (error) {
    res.status(500).json({ msg: "server updated error" });
  }
};

exports.delEducationById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Education with this id: ${id}`);

  try {
    await educationSchema.findByIdAndRemove(id);
    res.json({ msg: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
