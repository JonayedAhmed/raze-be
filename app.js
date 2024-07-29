// external imports
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const cors = require('cors'); // Import the cors package

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const accountRouter = require('./router/accountRouter');
const segmentRouter = require('./router/segmentRouter');
const subSegmentRouter = require('./router/subSegmentRouter');
const { mongoConnectionString, cookieSecret } = require('./config/config');
const logger = require('./utils/logger');

const app = express();

// Enable CORS for all routes
app.use(cors());

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

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use logger in middlewares
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routing setup
app.all("/raze", (req, res) => {
    res.json({ data: `${Date()} - Backend is running` });
})
app.use("/raze/account", accountRouter);
app.use("/raze/segment", segmentRouter);
app.use("/raze/subsegment", subSegmentRouter);

// 404 not found handler
app.use(notFoundHandler);

// Common error handler
app.use(errorHandler);

module.exports = app;
