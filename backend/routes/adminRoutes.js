const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllContacts,
  getSingleContact,
  markAsRead,
  deleteContact,
  getStats,
  login,
  replyToContact,
} = require("../controllers/adminController.js");

const router = express.Router();

// Public route
router.post("/login", login);

// Protected routes
router.use(authMiddleware);

router.get("/stats", getStats);
router.get("/messages", getAllContacts);
router.get("/messages/:id", getSingleContact);
router.put("/messages/:id/read", markAsRead);
router.post("/messages/:id/reply", replyToContact);
router.delete("/messages/:id", deleteContact);

module.exports = router;
