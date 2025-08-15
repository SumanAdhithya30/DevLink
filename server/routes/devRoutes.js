const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Make sure this path is correct for your auth middleware
const developerController = require('../controllers/devController');

// All routes in this file are prefixed with '/api/developers' (from your main server file)

// @route    GET api/developers
// @desc     Get all developers for the current user (with filtering)
// @access   Private
router.get(
    '/',
    auth,
    developerController.getDevelopers // Using the 'getDevelopers' function from the controller
);

// @route    POST api/developers
// @desc     Add a new developer
// @access   Private
router.post(
    '/',
    auth,
    developerController.addDeveloper // Using the 'addDeveloper' function
);

// @route    PUT api/developers/:id
// @desc     Update a developer
// @access   Private
router.put(
    '/:id',
    auth,
    developerController.updateDeveloper // Using the 'updateDeveloper' function
);

// @route    DELETE api/developers/:id
// @desc     Delete a developer
// @access   Private
router.delete(
    '/:id',
    auth,
    developerController.deleteDeveloper // Using the 'deleteDeveloper' function
);

module.exports = router;