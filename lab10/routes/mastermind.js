module.exports = {
    rateMoves: (combination, code) => {
        let rated = [];
        let whiteCount = 0;
        let blackCount = 0;

        rated = combination.forEach(rated.push(false));

        combination.forEach((entry, index) => {
            if (rated[index] === false) {
                if (entry === code[index]) {
                    rated[index] = true;
                    blackCount++;
                } else {
                    for(let i = 0; i < combination.length; i++) {
                        if (code[i] === entry) {
                            rated[index] = true;
                            whiteCount++;
                        }
                    }
                }
            }
        });
        return [blackCount, whiteCount];
    }
}
