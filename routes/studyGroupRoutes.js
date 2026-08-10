import { Router } from "express";
import * as studyGroupController from "../controllers/studyGroupController.js";
import { requireLogin } from "../middleware/requireLogin.js"

const router = Router();

router.get('/', studyGroupController.index);              // public is fine
router.get('/new', requireLogin, studyGroupController.showCreateForm);
router.post('/', requireLogin, studyGroupController.create);
router.delete('/:id', requireLogin, studyGroupController.remove);

export default router;
