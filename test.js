// standard deviation formula test

const calculateSD = (values) => {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
    return Math.sqrt(variance).toFixed(2);
};


const testValues = [40000, 45000, 50000];
const result = calculateSD(testValues);


console.log(`Standard Deviation: ${result}`);
