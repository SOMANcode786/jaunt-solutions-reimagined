const verifyRecaptcha = async (captchaToken) => {
  if (!captchaToken) {
    return {
      success: false,
      status: 400,
      message: "reCAPTCHA verification failed: Missing token",
    };
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.error("reCAPTCHA verification failed: RECAPTCHA_SECRET_KEY is not configured");
    return {
      success: false,
      status: 500,
      message: "reCAPTCHA verification is not configured",
    };
  }

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
    console.error("reCAPTCHA verification failed", verifyData["error-codes"]);
    return {
      success: false,
      status: 400,
      message: "reCAPTCHA verification failed. Please try again.",
    };
  }

  return { success: true };
};

module.exports = {
  verifyRecaptcha,
};
