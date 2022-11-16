import express from "express";
import CategoryController from "./controllers/CategoryController";
const app = express();
import TaskController from "./controllers/TaskController";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/task/create", TaskController.create);
app.post("/task/update", TaskController.update);
app.get("/task/delete/:id", TaskController.delete);
app.get("/tasks/:date", TaskController.getTasksByDate);
app.get("/tasks/c/:category", TaskController.getTasksByCategory);

app.post("/category/create", CategoryController.create);
app.post("/category/update", CategoryController.update);
app.get("/category/delete/:id", CategoryController.delete);
app.get("/categories", CategoryController.getCategories);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
