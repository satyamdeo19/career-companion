const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user._id,
    });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({ message: 'Invalid task data' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
    // Implementation for updating a task
    const { title, description, status, dueDate } = req.body;
    try {
        const task = await Task.findById(req.params.id);

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(404).json({ message: 'Task not found' });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
    // Implementation for deleting a task
     try {
        const task = await Task.findById(req.params.id);

        if (!task || task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized or task not found' });
        }

        await task.deleteOne(); // Mongoose v6+
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(404).json({ message: 'Task not found' });
    }
};
