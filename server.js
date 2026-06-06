const express = require('express');
const apiLimiter = require('./middleware/rateLimiter');
const globalErrorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3002;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

// 1. Apply Rate Limiting exclusively to our API channel endpoints
app.use('/api/', apiLimiter);

// 2. Main Workspace UI view route
app.get('/', async (req, res, next) => {
    try {
        // Default startup loading parameters (Visakhapatnam coordinates)
        const defaultLat = "17.6868";
        const defaultLon = "83.2185";
        
        const externalApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${defaultLat}&longitude=${defaultLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`;
        
        const response = await fetch(externalApiUrl);
        if (!response.ok) throw new Error("Could not fetch data from the external telemetry server.");
        
        const telemetry = await response.json();
        res.render('dashboard', { weatherData: telemetry, error: null });
    } catch (err) {
        next(err); // Route downstream directly into the advanced error engine
    }
});

// 3. Dynamic API endpoint that fetches data from an external third-party API
app.get('/api/telemetry', async (req, res, next) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        const structuralError = new Error("Latitude and Longitude values are mandatory parameters.");
        structuralError.status = 400;
        return next(structuralError);
    }

    try {
        const externalApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`;
        
        const response = await fetch(externalApiUrl);
        if (!response.ok) throw new Error("External data stream mapping dropped connections.");
        
        const telemetryData = await response.json();
        res.json({ success: true, source: "Third-Party Open-Meteo Cluster", data: telemetryData });
    } catch (err) {
        next(err);
    }
});

// 4. Fallback route to verify your custom error handler catches missing pages
app.get('/trigger-fault', (req, res, next) => {
    const controlledFault = new Error("Simulated system failure check for internship verification.");
    controlledFault.status = 500;
    next(controlledFault);
});

// 5. Connect Global Error Interceptor Pipeline (Must be declared last)
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`\n🚀 Expert Advanced API System Live: http://localhost:${PORT}\n`));