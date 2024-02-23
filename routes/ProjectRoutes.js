const express = require('express');
const ProjectController = require('../controllers/ProjectController');
const router = express.Router();
router.get('/', ProjectController.findAll);
router.get('/:id', ProjectController.findOne);
router.post('/', ProjectController.create);
router.patch('/:id', ProjectController.update);
router.delete('/:id', ProjectController.destroy);
module.exports = router;
