const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    cat: req.body.cat,
    due: req.body.due,
    tag: req.body.tag,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.title != null) {
      todo.title = req.body.title;
    }
    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }
    if (req.body.cat != null) {
      todo.cat = req.body.cat;
    }
    if (req.body.due != null) {
      todo.due = req.body.due;
    }
    if (req.body.tag != null) {
      todo.tag = req.body.tag;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    console.log("delete todo");
    console.log(req.params.id);
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }

    res.json({ message: "Deleted Todo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
