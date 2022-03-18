const aboutSchema = require("../models/aboutModel");
const mongoose = require("mongoose");

exports.getAbout = async (req, res) => {
  const about = await aboutSchema.find();

  try {
    res.json(about);
  } catch (error) {
    res.status(500).json({ msg: "server problem" });
  }
};

exports.addAbout = async (req, res) => {
  const { about } = req.body;
  try {
    const newAbout = new aboutSchema({
      about: about,
    });

    await newAbout.save();
    res.json(newAbout);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.getAboutId = async (req, res) => {
  try {
    const about = await aboutSchema.findById(req.params.id);
    res.json(about);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.updateAbout = async (req, res) => {
  const { id } = req.params;
  const { about } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No aboutPost matched with id: ${id}`);

  try {
    const updatedAbout = { about };
    await aboutSchema.findByIdAndUpdate(id, updatedAbout, {
      new: true,
    });
    res.json({ msg: "Item updated" });
  } catch (error) {
    res.status(500).json({ msg: "server updated error" });
  }
};

exports.delAbout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No aboutPost with this id: ${id}`);

  try {
    await aboutSchema.findByIdAndRemove(id);
    res.json({ msg: " Item deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
