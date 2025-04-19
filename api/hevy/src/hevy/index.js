require('dotenv').config();
const log = require('../logger');
const BASE_URL = 'https://api.hevyapp.com/v1';
const ENDPOINT = '/workouts/events';

const { checkFileStore } = require('../files');

const callHevy = async (urlProperties) => {
    const headers = {
        accept: 'application/json',
        'api-key': process.env.HEVY_KEY,
    };
    const fullUrl = `${BASE_URL}${ENDPOINT}?${urlProperties}`;
    log.info(`Fetching from Hevy API: ${fullUrl}`);
    const response = await fetch(fullUrl, {
        headers,
    });
    let data = await response.json();
    return data;
};

const getWorkouts = async () => {
    log.info('Fetching workouts from Hevy API');
    const { lastWorkout } = await checkFileStore();

    let pageNumber = 1;
    const hevyPageLimit = process.env.HEVY_PAGE_LIMIT || 1;
    let urlProperties = `page=${pageNumber}&pageSize=${hevyPageLimit}&since=${lastWorkout}`;
    try {
        let hevyResponse = await callHevy(urlProperties);
        const workouts = [];
        if (hevyResponse.page_count > 1) {
            workouts.push(...hevyResponse.events);
            log.info(
                `More than one page of workouts found. Fetching all pages.`,
            );
            pagination = hevyResponse.page_count;
            for (let i = 2; i <= pagination; i++) {
                pageNumber = i;
                hevyResponse = await callHevy(urlProperties);
                workouts.push(...hevyResponse.events);
            }
        }

        return workouts;
    } catch (e) {
        error(e);
        process.exit(1);
    }
};

module.exports = {
    getWorkouts,
};
