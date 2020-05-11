module.exports = {
    rateMoves: (combination, code) => {
        let rated = [];
        let whiteCount = 0;
        let blackCount = 0;

        rated.fill(false, 0, combination.length);

        combination = combination.split("");

        combination.forEach((entry, index) => {
            if (!rated[index]) {
                if (entry === code[index]) {
                    rated[index] = true;
                    blackCount++;
                } else {
                    for(let i = 0; i < code.length; i++) {
                        if (!rated[i] && code[i] === entry) {
                            rated[i] = true;
                            whiteCount++;
                        }
                    }
                }
            }
        });
        return [blackCount, whiteCount];
    }
}
