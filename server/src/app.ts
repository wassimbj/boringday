import express from "express";
import CategoryController from "./controllers/CategoryController";
const app = express();
import TaskController from "./controllers/TaskController";
import cors from "cors";
import session from "express-session";
import AuthController from "./controllers/AuthController";

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

app.use(
  session({
    name: "ssid",
    secret: process.env.SESSION_KEY as unknown as string, // Put whatever here
    resave: true,
    saveUninitialized: true,
    unset: "destroy",
    cookie: {
      // secure: process.env.IS_PROD as unknown as boolean,
      // httpOnly: process.env.IS_PROD as unknown as boolean,
      maxAge: 864000000, // 10 days in ms
      // sameSite: "none",
      // domain: process.env.WEBSITE_URL,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

app.post("/task/create", TaskController.create);
app.post("/task/update", TaskController.update);
app.get("/task/delete/:id", TaskController.delete);
app.get("/tasks/:date", TaskController.getTasksByDate);
app.get("/task/:id", TaskController.getTaskById);
app.get("/tasks/week/:date", TaskController.getNumberOfTasksOfGivenWeek);
app.get("/tasks/c/:category", TaskController.getTasksByCategory);

app.post("/category/create", CategoryController.create);
app.post("/category/update", CategoryController.update);
app.get("/category/delete/:id", CategoryController.delete);
app.get("/category/:id", CategoryController.getCategoryById);
app.get("/categories", CategoryController.getCategories);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
