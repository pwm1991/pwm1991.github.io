const log = require('../logger');

const { parseSets } = require('../parseSets');

const parseWorkouts = (workouts) => {
    if (!workouts) {
        throw new Error('No workouts found');
    }
    const parsedWorkouts = workouts.map((event) => {
        const { id, title, start_time, exercises } = event.workout;
        if (exercises.length === 0) {
            return null;
        }
        let totalWeightInKg = 0;
        // Parse the exercises
        const sets = exercises.map((exercise) => {
            log.debug(exercise.sets);
            return parseSets(exercise.sets);
        });
        log.debug(sets);
        // Get the total weight of all the exercises
        totalWeightInKg = sets.reduce((acc, set) => {
            return acc + set.setsTotalWeight;
        }, 0);
        return {
            id,
            title,
            start_time,
            totalWeightInKg: totalWeightInKg || 0,
        };
    });
    log.debug(parsedWorkouts);
    return parsedWorkouts;
};

module.exports = {
    parseWorkouts,
};
