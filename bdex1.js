let arrStr = `8 1 0 6 5
8 8 2 6 3
3 8 2 6 3
3 7 0 9 2
8 7 0 9 5
3 4 0 9 2
3 1 0 6 2
8 4 0 9 5`

let areTaburi = false;


//     `a) E →→CD
// b) E →AE
// c) AD →BCE
// d) DE →C
// e) B →A
// f) BC →→AE
// g) C →→AD
// h) E →CD
// i) D →→AB
// j) DE →→BAC`

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

let rows = arrStr.split('\n');
let arr = rows.map(row => {
    if (areTaburi == true)
        return row.split('\t').map(el => {
            return parseInt(el);
        })
    else
        return row.split(' ').map(el => {
            return parseInt(el);
        })
})

console.log(arr);


let indexes = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11
}
let indexesToAdd = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L'
]
let currentIndex = 0;
let variante = ''
process.stdin.on('data', function (chunk) {
    let input = String(chunk).split('\n')[0];
    if (input.toLowerCase() == "gata") {
        variante = variante.slice(0, -1)
        console.log(variante.toLowerCase())
        process.kill(0);
    }
    input = input.split(' ');
    let left = input[0].toUpperCase();
    let right = input[1].toUpperCase();
    let type = parseInt(input[2]);

    let leftPossibleValues = [];
    let leftIndexes = []
    for (let i = 0; i < left.length; i++) {
        leftIndexes.push(indexes[left[i]]);
    }

    arr.forEach(sarr => {
        let possibleValues = [];
        leftIndexes.forEach(el => {
            possibleValues.push(sarr[el]);
        })
        leftPossibleValues.push(possibleValues);
    })

    let rightPossibleValues = [];
    let rightIndexes = []
    for (let i = 0; i < right.length; i++) {
        rightIndexes.push(indexes[right[i]]);
    }

    arr.forEach(sarr => {
        let possibleValues = [];
        rightIndexes.forEach(el => {
            possibleValues.push(sarr[el]);
        })
        rightPossibleValues.push(possibleValues);
    })

    if (type == 1) {

        let leftUniquePosibilites = leftPossibleValues.filter((t = {}, a => !(t[a] = a in t)));


        // console.log(leftPossibleValues);
        // console.log(rightPossibleValues);
        // console.log(restPossibleValues);

        let isValidCase = true;
        leftUniquePosibilites.forEach(uniquePos => {
            let sameIndexes = [];
            leftPossibleValues.forEach((pos, li) => {
                if (arrayEquals(uniquePos, pos)) {
                    sameIndexes.push(li);
                }
            })

            let rightArrays = [];

            sameIndexes.forEach(sind => {
                rightArrays.push(rightPossibleValues[sind]);
            })

            rightArrays = rightArrays.filter((t = {}, a => !(t[a] = a in t)));
            if (rightArrays.length != 1)
                isValidCase = false

        })
        if (isValidCase) {
            variante += indexesToAdd[currentIndex];
            variante += ','
        }
        currentIndex++
        console.log(isValidCase);
    }
    else
        if (type == 2) {

            let restPossibleValues = [];
            let restIndexes = [];
            for (let i = 0; i < arr[0].length; i++) {
                restIndexes.push(i);
            }
            restIndexes = restIndexes.filter(el => {
                if (leftIndexes.indexOf(el) >= 0)
                    return false;
                if (rightIndexes.indexOf(el) >= 0)
                    return false;
                return true;
            })
            arr.forEach(sarr => {
                let possibleValues = [];
                restIndexes.forEach(el => {
                    possibleValues.push(sarr[el]);
                })
                restPossibleValues.push(possibleValues);
            })

            // let leftOneTimers = [];

            // leftPossibleValues.forEach((val1, i1) => {
            //     let isInArray = false
            //     leftPossibleValues.forEach((val2, i2) => {
            //         if (i1 != i2)
            //             if (arrayEquals(val2, val1))
            //                 isInArray = true;
            //     })
            //     if (isInArray == false)
            //         leftOneTimers.push(i1);
            // })

            // leftPossibleValues = leftPossibleValues.filter((el, i) => {
            //     if (leftOneTimers.indexOf(i) >= 0)
            //         return false;
            //     return true;
            // })

            // rightPossibleValues = rightPossibleValues.filter((el, i) => {
            //     if (leftOneTimers.indexOf(i) >= 0)
            //         return false;
            //     return true;
            // })

            // restPossibleValues = restPossibleValues.filter((el, i) => {
            //     if (leftOneTimers.indexOf(i) >= 0)
            //         return false;
            //     return true;
            // })

            let leftUniquePosibilites = leftPossibleValues.filter((t = {}, a => !(t[a] = a in t)));


            // console.log(leftPossibleValues);
            // console.log(rightPossibleValues);
            // console.log(restPossibleValues);

            let isValidCase = true;
            leftUniquePosibilites.forEach(uniquePos => {
                let solution = []
                for (let i = 0; i < arr[0].length; i++) {
                    solution.push(0);
                }
                leftIndexes.forEach((ind, indi) => {
                    solution[ind] = uniquePos[indi];
                })

                let sameIndexes = [];
                leftPossibleValues.forEach((pos, li) => {
                    if (arrayEquals(uniquePos, pos)) {
                        sameIndexes.push(li);
                    }
                })

                let isValidSolution = true;

                sameIndexes.forEach(sind => {
                    rightIndexes.forEach((rind, rindi) => {
                        solution[rind] = rightPossibleValues[sind][rindi];
                    })
                    sameIndexes.forEach(sind2 => {
                        restIndexes.forEach((reind, reindi) => {
                            solution[reind] = restPossibleValues[sind2][reindi];
                        })

                        let hasFoundAMatch = false;

                        arr.forEach(sarr => {
                            if (arrayEquals(sarr, solution))
                                hasFoundAMatch = true;
                        })

                        if (hasFoundAMatch == false)
                            isValidSolution = false

                    })

                })

                if (isValidSolution == false)
                    isValidCase = false

            })
            if (isValidCase) {
                variante += indexesToAdd[currentIndex];
                variante += ','
            }
            currentIndex++
            console.log(isValidCase);
        }

    // leftUniquePosibilites.forEach(pos => {
    //     leftPossibleValues.forEach((p, i) => {
    //         if (arrayEquals(pos, p)) {
    //             console.log(i);
    //         }
    //     })
    // })
});
