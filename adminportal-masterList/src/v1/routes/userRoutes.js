const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");


router.post("/login", userController.userLogin);
router.post("/sendupdate", userController.sendUpadte);
router.post("/analytics", userController.analytics);
router.post("/status", userController.status);
router.get("/masterlist", userController.masterList);
router.post("/masterlist/update", userController.masterUpdate);
router.post("/masterlist/available", userController.getAvailableCount);

module.exports = router;