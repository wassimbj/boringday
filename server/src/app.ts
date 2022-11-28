import express from "express";
import CategoryController from "./controllers/CategoryController";
const app = express();
import TaskController from "./controllers/TaskController";
import cors from "cors";
import AuthController from "./controllers/AuthController";
import sessionConfig from "./config/session";

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

app.use(sessionConfig());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ######### user routes #########
app.post(
  "/auth/login",
  AuthController.isNotAuthenticated,
  AuthController.login
);

app.post(
  "/auth/join",
  AuthController.isNotAuthenticated,
  AuthController.createAccount
);

app.get(
  "/auth/me",
  AuthController.isAuthenticated,
  AuthController.getLoggedInUser
);

app.get("/auth/logout", AuthController.isAuthenticated, AuthController.logout);

// ############ task routes ############

app.post("/task/create", AuthController.isAuthenticated, TaskController.create);
app.post("/task/update", AuthController.isAuthenticated, TaskController.update);
app.get(
  "/task/delete/:id",
  AuthController.isAuthenticated,
  TaskController.delete
);
app.get(
  "/tasks/:date",
  AuthController.isAuthenticated,
  TaskController.getTasksByDate
);
app.get(
  "/task/:id",
  AuthController.isAuthenticated,
  TaskController.getTaskById
);
app.get(
  "/tasks/week/:date",
  AuthController.isAuthenticated,
  TaskController.getNumberOfTasksOfGivenWeek
);
app.get(
  "/tasks/c/:category",
  AuthController.isAuthenticated,
  TaskController.getTasksByCategory
);

// ############ category routes ############

app.post(
  "/category/create",
  AuthController.isAuthenticated,
  CategoryController.create
);
app.post(
  "/category/update",
  AuthController.isAuthenticated,
  CategoryController.update
);
app.get(
  "/category/delete/:id",
  AuthController.isAuthenticated,
  CategoryController.delete
);
app.get(
  "/category/:id",
  AuthController.isAuthenticated,
  CategoryController.getCategoryById
);
app.get(
  "/categories",
  AuthController.isAuthenticated,
  CategoryController.getCategories
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
