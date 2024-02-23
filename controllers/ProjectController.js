const ProjectModel = require('../models/project');
// Create and Save a new project
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
  }

  const project = new ProjectModel({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  await project
    .save()
    .then((data) => {
      res.send({
        message: 'Project created successfully!!',
        project: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating project',
      });
    });
};

// Retrieve all projects from the database.
exports.findAll = async (req, res) => {
  try {
    const project = await ProjectModel.find();
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single project with an id
exports.findOne = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a project by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  await ProjectModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Project not found.`,
        });
      } else {
        res.send({ message: 'Project updated successfully.' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
// Project a project with the specified id in the request
exports.destroy = async (req, res) => {
  await ProjectModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Project not found.`,
        });
      } else {
        res.send({
          message: 'Project deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
