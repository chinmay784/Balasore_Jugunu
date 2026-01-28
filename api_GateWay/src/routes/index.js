const express = require("express");
const { authProxy, userProxy, driverProxy, tripProxy } = require("../config/proxy.config");
const router = express.Router();

router.use("/auth", authProxy);
router.use("/users",userProxy);
router.use("/drivers",driverProxy);
router.use("/trips",tripProxy)
// router.use("/users", userProxy); ... etc

module.exports = router;