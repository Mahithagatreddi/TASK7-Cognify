const globalErrorHandler = (err, req, res, next) => {
    console.error("🚨 System Pipeline Exception Caught:", err.message);

    const statusCode = err.status || 500;
    
    // Determine formatting strategy depending on client signature expectations
    if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
        return res.status(statusCode).json({
            success: false,
            error: err.message || "An unexpected error occurred in our background data streams."
        });
    }

    // Fallback UI view handler
    res.status(statusCode).render('dashboard', { 
        weatherData: null, 
        error: `System Alert: ${err.message || "Internal data loop extraction error."}` 
    });
};

module.exports = globalErrorHandler;