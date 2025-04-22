const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const getDashboardOverview = require("../controllers/dashboardController");
const dashboardRouter = express.Router();

dashboardRouter.get("/", authMiddleware, getDashboardOverview);

module.exports = dashboardRouter;
