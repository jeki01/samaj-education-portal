// export function bestEqualDistribution(parts: number): number[] {
//     const base = Math.floor(100 / parts);            // e.g., 100 / 3 = 33
//     const remainder = 100 % parts;                   // e.g., 100 % 3 = 1
//     const result: number[] = [];

//     for (let i = 0; i < parts; i++) {
//         result.push(i < remainder ? base + 1 : base);  // Distribute the extra 1% fairly
//     }

//     return result;
// }


export function distributePercentageToTrueValues(input: Record<string, boolean>): Record<string, number | boolean> {
    const keys = Object.keys(input);
    const trueKeys = keys.filter(key => input[key]);
    const count = trueKeys.length;

    const base = Math.floor(100 / count);
    const remainder = 100 % count;

    const result: Record<string, number | boolean> = {};

    trueKeys.forEach((key, index) => {
        result[key] = index < remainder ? base + 1 : base;
    });

    keys.forEach(key => {
        if (!input[key]) {
            result[key] = false;
        }
    });

    return result;
}

