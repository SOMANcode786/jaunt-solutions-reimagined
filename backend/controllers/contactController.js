const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendContactEmail } = require("../services/emailService.js");
const { verifyRecaptcha } = require("../lib/recaptcha.js");

const submitContactForm = async (req, res) => {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("Contact submission failed: DATABASE_URL is not configured");
      return res.status(500).json({
        success: false,
        message: "Contact form database is not configured",
      });
    }

    const { name, email, subject, message, company } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Validation failed: All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Validation failed: Invalid email address",
      });
    }

    const captchaResult = await verifyRecaptcha(req.body.captchaToken);
    if (!captchaResult.success) {
      return res.status(captchaResult.status).json({
        success: false,
        message: captchaResult.message,
      });
    }

    // Store in Database using Prisma
    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
        company: company || null,
        subject,
        message,
      },
    });

    // Send email notification to Admin asynchronously to not block user response
    sendContactEmail({ name, email, subject, message }).catch((emailError) => {
      console.error("Failed to send admin email notification:", emailError);
    });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while submitting your message",
    });
  }
};

module.exports = {
  submitContactForm,
};
