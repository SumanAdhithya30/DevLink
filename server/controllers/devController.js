const Developer = require('../models/Developer');

exports.getAllDevelopers = async (req,res) => {
    const userId = req.user.id;
    const devs = await Developer.find({ user: userId });
    res.json(devs);
};

exports.addDeveloper = async (req,res) => {
    const newDev = new Developer({
        ...req.body,
        user: req.user.id
    });
    const savedDev = await newDev.save();
    res.status(201).json(savedDev);
};

exports.updateDeveloper = async (req,res) => {
    const dev = await Developer.findOneAndUpdate(
        { _id: req.params.id, user:req.user.id},
        req.body,
        { new: true }
    );
    if(!dev) return res.status(404).json({ msg: 'Developer not found' });
    res.json(dev);
}

exports.deleteDeveloper = async (req,res) => {
    const dev = await Developer.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });
  if (!dev) return res.status(404).json({ msg: "Developer not found" });
  res.json({ msg: "Developer deleted" });
};