const express = require("express");
const router = express.Router();
const Tasks = require("../models/TaskSchema");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required field" })
        .end();
    }
    const newTask = new Tasks(req.body);
    await newTask.save();
    res
      .status(201)
      .json({ success: true, message: "Task created successfully" });
  } catch (error) {
    console.error("Error occurred while posting tasks:", error);
    res.status(500).json({ success: false, message: "Error saving task" });
  }
});

// UPDATE the tasks
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req?.body;
    const task = await Tasks.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      data: task,
      message: "the task is updated successfully",
    });
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ success: false, message: "Error retrieving task" });
  }
});

//DELETE tasks
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Tasks.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "task deleted successfully" });
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ success: false, message: "Error retrieving task" });
  }
});

// PATCH the task
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const newStatus = !task.status;
    await Tasks.findByIdAndUpdate(id, { status: newStatus });
    res
      .status(200)
      .json({ success: true, message: `Status changed to ${newStatus}` });
  } catch (err) {
    console.error("Error toggling task status:", err);
    res
      .status(500)
      .json({ success: false, message: "Error toggling task status" });
  }
});

module.exports = router;
