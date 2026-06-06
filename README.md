# Cognifyz Level 4: Task 7 — Advanced API Usage & External API Integration

An expert-tier full-stack application built for the **Cognifyz Technologies Full Stack Development Internship**. This project transitions from a self-contained local environment into a connected, scalable, and resilient cloud-capable infrastructure by implementing real-time third-party API integration, traffic rate-limiting, and an advanced centralized error handling pipeline.

---

## 🎯 Project Objectives
* **External API Synchronization:** Asynchronously consume live weather metrics from the third-party Open-Meteo telemetry network.
* **Traffic Security Wall:** Shield application routes against automated brute-force scripts and Denial of Service (DoS) traffic spike patterns.
* **Centralized Exception Catching:** Prevent runtime application drops or data stack leaks through a unified global error interceptor middleware.
* **OAuth 2.0 Conceptual Mapping:** Review and document enterprise-grade tokenized authentication architectures.

---

## 📂 Project Directory Structure
```text
task7-advanced-api/
├── middleware/
│   ├── rateLimiter.js     # Custom traffic firewall (express-rate-limit)
│   └── errorHandler.js    # Centralized global exception catcher
├── views/
│   └── dashboard.ejs      # Real-time data visualization UI template
├── server.js              # Core gateway router & async aggregator
└── package.json           # Manifest tracking project dependencies"# TASK7-Cognify" 
