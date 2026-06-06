const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15-minute tracking window allocation
    max: 30, // Limit each IP to 30 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        success: false,
        error: "Too many requests matching your signature profile. Network cooling down. Please try again after 15 minutes."
    }
});

module.exports = apiLimiter;