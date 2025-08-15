const Developer = require('../models/Developer');


// handle search, domain, and techstack query parameters
exports.getDevelopers = async (req, res) => {
  try {
    const { domain, techstack, search } = req.query;
    let filter = { user: req.user.id };

    if (domain) {
      // Use regex for partial, case-insensitive domain matching
      filter.domain = { $regex: domain, $options: 'i' };
    }

    if (techstack) {
      const techStackArray = techstack.split(',');
      
      // --- THIS IS THE FIX ---
      // Create a case-insensitive regex for each tech term
      const techRegexArray = techStackArray.map(tech => new RegExp(tech.trim(), 'i'));

      // Use the $all operator to ensure the developer has all the specified technologies
      filter.techstack = { $all: techRegexArray };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const developers = await Developer.find(filter);
    res.json(developers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// --- FUNCTIONS BELOW ---

exports.addDeveloper = async (req, res) => {
  const { name, email, phone, github, linkedin, domain, techstack } = req.body;
  try {

    const techstackArray = Array.isArray(techstack)
      ? techstack
      : techstack.split(',').map(tech => tech.trim());

    const newDeveloper = new Developer({
      name,
      email,
      phone,
      github,
      linkedin,
      domain,
      techstack: techstackArray,
      user: req.user.id,
    });
    const developer = await newDeveloper.save();
    res.json(developer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateDeveloper = async (req, res) => {
  const { name, email, phone, github, linkedin, domain, techstack } = req.body;
  

  const techstackArray = Array.isArray(techstack)
      ? techstack
      : techstack.split(',').map(tech => tech.trim());

  const developerFields = { name, email, phone, github, linkedin, domain, techstack: techstackArray };

  try {
    let developer = await Developer.findById(req.params.id);
    if (!developer) return res.status(404).json({ msg: 'Developer not found' });

    // Ensure user owns developer
    if (developer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    developer = await Developer.findByIdAndUpdate(
      req.params.id,
      { $set: developerFields },
      { new: true }
    );
    res.json(developer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteDeveloper = async (req, res) => {
  try {
    let developer = await Developer.findById(req.params.id);
    if (!developer) return res.status(404).json({ msg: 'Developer not found' });


    if (developer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Developer.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Developer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};