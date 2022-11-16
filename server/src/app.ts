import express from "express";
const app = express();
import TaskController from "./controllers/TaskController";

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/task/create", TaskController.create);

// TODO: create task
// TODO: update task
// TODO: delete task
// TODO: get date tasks
// TODO: create category
// TODO: get tasks by category
// TODO: get categories
// TODO: get calendar tasks

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
