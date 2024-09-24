const fs = require('fs');

function decodeY(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
    let c = 0;
    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                term *= (0 - xj) / (xi - xj);
            }
        }
        c += term;
    }
    return c;
}

function readTestCase(filePath) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

function main() {
    const inputFiles = ['input/testcase1.json', 'input/testcase2.json'];

    inputFiles.forEach((inputFile) => {
        console.log(`\nProcessing file: ${inputFile}`);
        const data = readTestCase(inputFile);
        
        const points = [];

        for (let key in data) {
            if (key !== "keys") {
                let base = parseInt(data[key].base);
                let value = data[key].value;
                let decodedY = decodeY(base, value);
                points.push({ x: parseInt(key), y: decodedY });
            }
        }
        const k = data.keys.k;
        const c = lagrangeInterpolation(points, k);

        console.log('Constant term (c):', c);
    });
}

main();
