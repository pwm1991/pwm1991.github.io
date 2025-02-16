/**
 * Authenticate
 * Get latest hevy workouts
 * Use a high-watermark
 * For each new one
 * Get the date / type / total weight / goals
 *
 */

require('dotenv').config();
const pino = require('pino');

const log = pino({
    level: process.env.PINO_LOG_LEVEL || 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: ['email', 'HEVY_KEY'],
    },
});

const BASE_URL = 'https://api.hevyapp.com/v1',
    ENDPOINT = '/workouts/events',
    KNOWLEDGE = process.env.KNOWLEDGE || new Date('2025-01-01').toISOString();

if (!process.env.HEVY_KEY) {
    log.error('No HEVY_KEY found');
    process.exit(1);
}
log.info('HEVY_KEY found');

const getWorkouts = async () => {
    const headers = {
        accept: 'application/json',
        'api-key': process.env.HEVY_KEY,
    };
    const urlProperties = `page=1&pageSize=10&since=${KNOWLEDGE}`;
    const url = `${BASE_URL}${ENDPOINT}?${urlProperties}`;
    log.debug(url);
    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        log.debug(data.events);

        return data;
    } catch (e) {
        error(e);
        process.exit(1);
    }
};

getWorkouts();
