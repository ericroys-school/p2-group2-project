import { Router } from "express";
import { apiRoutes } from "./api/index.js";
import { uiRoutes } from "./ui/index.js";

const router = Router();
router.use('/', uiRoutes);
router.use('/api', apiRoutes);

export {
    router
}