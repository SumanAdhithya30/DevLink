const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const{
    getAllDevelopers,
    addDeveloper,
    updateDeveloper,
    deleteDeveloper
} = require('../controllers/devController');

router.get('/', protect, getAllDevelopers);
router.post('/',protect, addDeveloper);
router.put('/:id', protect, updateDeveloper);
router.delete('/:id', protect, deleteDeveloper);


module.exports = router;
