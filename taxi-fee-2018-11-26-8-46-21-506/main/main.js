module.exports = function main(numKm, timeWait) {
    return (numKm<=0 || timeWait<0) ? 0 : Math.round(
                (numKm<=2 ? (6 + 0.25 * timeWait):
                    (numKm<8 ? (6 +(numKm - 2)*0.8 + 0.25 * timeWait):
                        (10 +(numKm - 7)*1.2 + 0.25 * timeWait))));
};