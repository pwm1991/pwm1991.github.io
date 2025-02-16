const POUNDS_TO_KG = 0.45359237;

const parseSets = (sets) => {
    if (!sets) {
        throw new Error('No sets found');
    }
    const reducedSetInformation = sets.map((set) => {
        const { reps, weight_kg, weight_lb } = set;
        const isKG = weight_kg ? true : false;
        let weight = 0;
        if (isKG) {
            weight = weight_kg;
        } else {
            weight = weight_lb * POUNDS_TO_KG;
        }
        const output = {
            reps,
            weight: weight || 0,
            totalWeight: reps * weight || 0,
        };
        return output;
    });
    const setsTotalWeight = reducedSetInformation.reduce((acc, set) => {
        return acc + set.totalWeight;
    }, 0);
    const output = {
        sets: reducedSetInformation,
        setsTotalWeight,
    };
    return output;
};

module.exports = {
    parseSets,
    POUNDS_TO_KG,
};
