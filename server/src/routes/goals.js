import { Router } from "express";
import {
  listGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalsController.js";

const router = Router();

router.get("/", listGoals);
router.post("/", createGoal);
router.patch("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
