const prisma = require("../lib/prisma.js");
const { getAdminStats } = require("../services/adminStatsService.js");
const { sendReplyEmail } = require("../services/emailService.js");
const { verifyRecaptcha } = require("../lib/recaptcha.js");

// GET ALL CONTACT MESSAGES
const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
};

// GET SINGLE CONTACT MESSAGE
const getSingleContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// MARK MESSAGE AS READ
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContact = await prisma.contact.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        status: "read",
      },
    });

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedContact,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update message",
    });
  }
};

// DELETE CONTACT MESSAGE
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contact.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};

// GET DASHBOARD STATS
const getStats = async (req, res) => {
  try {
    const stats = await getAdminStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};

const jwt = require("jsonwebtoken");

// LOGIN ADMIN
const login = async (req, res) => {
  try {
    const { password, captchaToken } = req.body;

    // Validate environment variables first to avoid silent failures or open vulnerabilities
    if (!process.env.ADMIN_PASSWORD) {
      console.error("Authentication failed: ADMIN_PASSWORD is not configured in environment variables");
      return res.status(500).json({
        success: false,
        message: "Admin authentication is not configured on the server",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("Authentication failed: JWT_SECRET is not configured in environment variables");
      return res.status(500).json({
        success: false,
        message: "Token service is not configured on the server",
      });
    }

    // Ensure password is provided and is not empty to prevent comparison of undefined/empty values
    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const captchaResult = await verifyRecaptcha(captchaToken);
    if (!captchaResult.success) {
      return res.status(captchaResult.status).json({
        success: false,
        message: captchaResult.message,
      });
    }

    if (password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// SEND REPLY TO CONTACT MESSAGE
const replyToContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required",
      });
    }

    const contact = await prisma.contact.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Send the email reply
    await sendReplyEmail({
      to: contact.email,
      subject: subject,
      message: message,
      originalMessage: contact.message,
      recipientName: contact.name,
    });

    // Mark the message as read since it has been replied to
    const updatedContact = await prisma.contact.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        status: "read",
      },
    });

    res.status(200).json({
      success: true,
      message: "Reply sent successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Reply error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send reply",
    });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  markAsRead,
  deleteContact,
  getStats,
  login,
  replyToContact,
};
