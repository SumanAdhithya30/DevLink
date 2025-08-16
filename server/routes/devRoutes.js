const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const developerController = require('../controllers/devController');

// IMPORTANT: Put more specific routes BEFORE general ones!

// @route    GET api/developers/stats
// @desc     Get developer statistics for the current user's dashboard
// @access   Private
router.get(
    '/stats',
    auth,
    developerController.getDeveloperStats 
);

// @route    GET api/developers
// @desc     Get all developers for the current user (with filtering)
// @access   Private
router.get(
    '/',
    auth,
    developerController.getDevelopers
);

// @route    POST api/developers
// @desc     Add a new developer
// @access   Private
router.post(
    '/',
    auth,
    developerController.addDeveloper
);

// @route    PUT api/developers/:id
// @desc     Update a developer
// @access   Private
router.put(
    '/:id',
    auth,
    developerController.updateDeveloper
);

// @route    DELETE api/developers/:id
// @desc     Delete a developer
// @access   Private
router.delete(
    '/:id',
    auth,
    developerController.deleteDeveloper
);

module.exports = router;