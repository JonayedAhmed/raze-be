const mongoose = require('mongoose');
const app = require('./app');
const { port, mongoConnectionString } = require('./config/config');
const logger = require('./utils/logger');


// Database connection
mongoose.connect(mongoConnectionString)
    .then(() => {
        logger.info('Database connection successful!');

        // server connection
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch(err => logger.error(err));