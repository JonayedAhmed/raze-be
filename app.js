// external imports
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const accountRouter = require('./router/accountRouter');
const { mongoConnectionString, cookieSecret } = require('./config/config');
const logger = require('./utils/logger');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser(cookieSecret));

// Use logger in middlewares
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routing setup
app.get("/", (req, res) => {
    res.json({ data: `${Date()} - Backend is running` });
})
app.use("/account", accountRouter);

// 404 not found handler
app.use(notFoundHandler);

// Common error handler
app.use(errorHandler);

module.exports = app;