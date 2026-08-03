import { Router } from "express";
import * as studyGroupController from "../controllers/studyGroupController.js";

const router = Router();

router.get('/', studyGroupController.index);
router.get('/new', studyGroupController.showCreateForm);
router.post('/', studyGroupController.create);
router.delete('/:id', studyGroupController.remove);

export default router;
