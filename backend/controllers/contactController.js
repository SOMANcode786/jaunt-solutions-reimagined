const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendContactEmail } = require("../services/emailService.js");

const submitContactForm = async (req, res) => {
  try {
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

    const captchaToken = req.body.captchaToken;
    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification failed: Missing token",
      });
    }

    // Verify reCAPTCHA token
    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captchaToken,
      }),
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification failed",
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
