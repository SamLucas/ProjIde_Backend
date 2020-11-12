import { Router } from "express";

import UserController from "@/controllers/User"
import PostController from "@/controllers/Post"

export const Routes = Router();

Routes.get("/status", (req, res) => {
  return res.json({ message: "Servidor esta funcionando." });
});

Routes.post("/users", UserController.store)

Routes.post("/posts", PostController.store)
Routes.get("/posts", PostController.listAll)

Routes.get("/posts/solicitations", PostController.solicitations)
Routes.get("/posts/unique/:post_id", PostController.show)
Routes.get("/posts/:user_id", PostController.index)

Routes.put("/posts", PostController.update)
Routes.put("/posts/aproved", PostController.changedAproved)
Routes.put("/posts/delete", PostController.changedDelete)
Routes.put("/posts/visible", PostController.changedVisible)