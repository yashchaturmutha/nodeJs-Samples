const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/adminController");

router.get("/", adminController.getAllUsers);
router.post("/login", adminController.login);
router.post("/createrole", adminController.createRole);
router.post("/editrole", adminController.editRole);
router.post("/remove", adminController.removeUser);
router.get("/region", adminController.getRegions);
router.get("/package", adminController.getPackage);
router.get("/offers", adminController.getOffers);
router.post("/offers/create", adminController.offers);
router.post("/offers/edit", adminController.editOffers);
router.post("/offers/remove", adminController.deleteOffers);





module.exports = router;