/**
 * Authenticate
 * Get latest hevy workouts
 * Use a high-watermark
 * For each new one
 * Get the date / type / total weight / goals
 *
 */

require('dotenv').config();

const log = require('./src/logger');
const { parseWorkouts } = require('./src/parseWorkouts');

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
    const hevyPageLimit = process.env.HEVY_PAGE_LIMIT || 1;
    const urlProperties = `page=1&pageSize=${hevyPageLimit}&since=${KNOWLEDGE}`;
    const url = `${BASE_URL}${ENDPOINT}?${urlProperties}`;
    log.debug(url);
    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        return data.events;
    } catch (e) {
        error(e);
        process.exit(1);
    }
};

const run = async () => {
    const workouts = await getWorkouts();
    const parsedWorkouts = await parseWorkouts(workouts);
    log.info(parsedWorkouts);
};

run();
