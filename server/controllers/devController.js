const Developer = require('../models/Developer');

// --- MODIFIED FUNCTION ---
// Updated to handle search, domain, and techstack query parameters
exports.getDevelopers = async (req, res) => {
  try {
    // Extract filter criteria from query parameters
    const { domain, techstack, search } = req.query;

    // Base filter to only get developers belonging to the logged-in user
    let filter = { user: req.user.id };

    // Add domain to the filter object if the domain query parameter exists
    if (domain) {
      filter.domain = domain;
    }

    // Add techstack to filter. It requires the developer to have ALL specified techs.
    if (techstack) {
      // API receives techstack as a comma-separated string, so we split it into an array
      const techStackArray = techstack.split(',');
      filter.techstack = { $all: techStackArray };
    }

    // Add a general search term filter. It searches across multiple fields.
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },      // Case-insensitive regex search
        { email: { $regex: search, $options: 'i' } },
        { domain: { $regex: search, $options: 'i' } },
      ];
    }

    const developers = await Developer.find(filter);
    res.json(developers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// --- UNCHANGED FUNCTIONS BELOW ---

exports.addDeveloper = async (req, res) => {
  const { name, email, phone, github, linkedin, domain, techstack } = req.body;
  try {
    // Ensure techstack is an array. If it's a string, split it.
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
  
  // Ensure techstack is an array before updating
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

    // Ensure user owns developer
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