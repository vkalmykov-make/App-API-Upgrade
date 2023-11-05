import express from "express";
import { AppController } from "../controllers/app-controller";

const router = express.Router();

router.get("/:name/:version/comparer", async (req, res, next) => {
  const { table } = req.query;
  const { name, version } = req.params;

  res.status(200).json({
    items: await AppController.getChanges({
      name,
      version,
      table: table as string
    })
      .catch(e => next(e))
  });
});

export default router;
