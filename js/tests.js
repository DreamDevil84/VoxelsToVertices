function runTest() {
    // test1(30000, 30000);
    // test2(10000, 10000);
    // test3(30000, 30000);
    // test4(30000, 30000);
    // test5(300000, 30000);
    // test6(30000, 1000000);
    test7(30000, 1000000);
}

let a = [];
let b = [];

function remakeArray(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i += 3) {
        newArray.push([array[0], array[1], array[2]]);
    }
    return newArray;
}
function fillArray(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        let x = Math.random() * 10;
        newArray.push(x);
    }
    return newArray;
}

function test1(aLength, bLength) {
    a = new Array(aLength);
    a.fill(0);
    b = new Array(bLength);
    b.fill(1);
    let counter = 0;
    let d1 = Date.now();
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (!(a[i] === b[j])) {
                let temp = b[j];
                a[i] = temp;
            }
            // counter++;
        }
        // if (i % 200 === 0) {
        //     console.log("Progress: " + ((i / a.length) * 100) + "%");
        // }
    }
    a = remakeArray(a);
    let d2 = Date.now() - d1;
    // console.log("Test 1 Done: " + counter);
    // console.log(d2 / 1000 + " s");
    // console.log(a);
    // console.log(b);
    return d2;
}
function test2(aLength, bLength) {
    a = new Array(aLength);
    a.fill([0, 0, 0]);
    b = new Array(bLength);
    b.fill([1, 1, 1]);
    let counter = 0;
    let d1 = Date.now();
    for (let i = 0; i < a.length; i++) {
        for (let x = 0; x < a[i].length; x++) {
            for (let j = 0; j < b.length; j++) {
                for (let y = 0; y < b[j].length; y++) {
                    if (!(a[i][x] === b[j][y])) {
                        let temp = b[j][y];
                        a[i][x] = temp;
                    }
                    // counter++;
                }
            }
        }
        // if (i % 200 === 0) {
        //     console.log("Progress: " + ((i / a.length) * 100) + "%");
        // }
    }
    let d2 = Date.now() - d1;
    // console.log("Test 2 Done: " + counter);
    // console.log(d2 / 1000 + " s");
    return d2;
}
function test3(aLength, bLength) {
    a = new Array(aLength);
    a.fill(0);
    b = new Array(bLength);
    b.fill(1);
    let counter = 0;
    let i, j;
    let d1 = Date.now();
    i = 0;
    while (i < aLength) {
        j = 0;
        while (j < bLength) {
            if (!(a[i] === b[j])) {
                let temp = b[j];
                a[i] = temp;
            }
            counter++;
            j++;
        }
        i++;
    }

    let d2 = Date.now() - d1;
    // console.log("Test 3 Done: " + counter);
    // console.log(d2 / 1000 + " s");
    // console.log(a);
    // console.log(b);
    return d2;
}
function test4(aLength, bLength) {
    a = new Array(aLength);
    a.fill(0);
    b = new Array(bLength);
    b.fill(1);
    let counter = 0;
    let d1 = Date.now();
    for (let i = 0; i < a.length; i += 3) {
        for (let j = 0; j < b.length; j += 3) {
            if (!(a[i] === b[j])) {
                let temp = b[j];
                a[i] = temp;
            }
            if (!(a[i + 1] === b[j + 1])) {
                let temp = b[j + 1];
                a[i + 1] = temp;
            }
            if (!(a[i + 2] === b[j + 2])) {
                let temp = b[j + 2];
                a[i + 2] = temp;
            }
            counter++;
        }
        // if (i % 200 === 0) {
        //     console.log("Progress: " + ((i / a.length) * 100) + "%");
        // }
    }
    a = remakeArray(a);
    let d2 = Date.now() - d1;
    console.log("Test 4 Done: " + counter);
    console.log(d2 / 1000 + " s");
    // console.log(a);
    // console.log(b);
    return d2;
}
function test5(aLength, bLength) {
    a = new Array(aLength);
    a = fillArray(a);
    b = new Array(bLength);
    b = fillArray(b);
    let counter = 0;
    let d1 = Date.now();
    for (let i = 0; i < a.length; i += 20) {
        for (let j = 0; j < b.length; j += 20) {
            if (!(a[i] === b[j])) {
                let temp = b[j];
                a[i] = temp;
            }
            if (!(a[i + 1] === b[j + 1])) {
                let temp = b[j + 1];
                a[i + 1] = temp;
            }
            if (!(a[i + 2] === b[j + 2])) {
                let temp = b[j + 2];
                a[i + 2] = temp;
            }
            if (!(a[i + 3] === b[j + 3])) {
                let temp = b[j + 3];
                a[i + 3] = temp;
            }
            if (!(a[i + 4] === b[j + 4])) {
                let temp = b[j + 4];
                a[i + 4] = temp;
            }
            if (!(a[i + 5] === b[j + 5])) {
                let temp = b[j + 5];
                a[i + 5] = temp;
            }
            if (!(a[i + 6] === b[j + 6])) {
                let temp = b[j + 6];
                a[i + 6] = temp;
            }
            if (!(a[i + 7] === b[j + 7])) {
                let temp = b[j + 7];
                a[i + 7] = temp;
            }
            if (!(a[i + 8] === b[j + 8])) {
                let temp = b[j + 8];
                a[i + 8] = temp;
            }
            if (!(a[i + 9] === b[j + 9])) {
                let temp = b[j + 9];
                a[i + 9] = temp;
            }
            if (!(a[i + 10] === b[j + 10])) {
                let temp = b[j + 10];
                a[i + 10] = temp;
            }
            if (!(a[i + 11] === b[j + 11])) {
                let temp = b[j + 11];
                a[i + 11] = temp;
            }
            if (!(a[i + 12] === b[j + 12])) {
                let temp = b[j + 12];
                a[i + 12] = temp;
            }
            if (!(a[i + 13] === b[j + 13])) {
                let temp = b[j + 13];
                a[i + 13] = temp;
            }
            if (!(a[i + 14] === b[j + 14])) {
                let temp = b[j + 14];
                a[i + 14] = temp;
            }
            if (!(a[i + 15] === b[j + 15])) {
                let temp = b[j + 15];
                a[i + 15] = temp;
            }
            if (!(a[i + 16] === b[j + 16])) {
                let temp = b[j + 16];
                a[i + 16] = temp;
            }
            if (!(a[i + 17] === b[j + 17])) {
                let temp = b[j + 17];
                a[i + 17] = temp;
            }
            if (!(a[i + 18] === b[j + 18])) {
                let temp = b[j + 18];
                a[i + 18] = temp;
            }
            if (!(a[i + 19] === b[j + 19])) {
                let temp = b[j + 19];
                a[i + 19] = temp;
            }
            counter++;
            // if (i % 200 === 0) {
            //     console.log("Progress: " + ((i / a.length) * 100) + "%");
            // }
        }
    }
    a = remakeArray(a);
    let d2 = Date.now() - d1;
    console.log("Test 5 Done: " + counter);
    console.log(d2 / 1000 + " s");
    // console.log(a);
    // console.log(b);
}
function test6(aLength, bLength) {
    a = new Array(aLength);
    // a.fill(0);
    let counter = 0;
    for (let i = 0; i < a.length; i++) {
        let len = Math.floor(Math.random() * 19) + 1;
        a[i] = new Array(len);
        for (let j = 0; j < len; j++) {
            a[i][j] = counter;
            counter++
        }
    }

    b = new Array(bLength);
    // b.fill(1);
    for (let i = 0; i < b.length; i++) {
        b[i] = Math.floor(Math.random() * aLength);
    }

    console.log(a);
    console.log(b);

    let aCounter = 0;
    let d1 = Date.now();
    for (let i = 0; i < a.length; i++) {
        aCounter = a[i].length;
        for (let j = 0; j < b.length; j += aLength) {
            if (b[j] === a[i][0]) {
                b[j] = i;
            }
            if (b[j] === a[i][1]) {
                b[j] = i;
            }
            if (b[j] === a[i][2]) {
                b[j] = i;
            }
            if (b[j] === a[i][3]) {
                b[j] = i;
            }
            if (b[j] === a[i][4]) {
                b[j] = i;
            }
            if (b[j] === a[i][5]) {
                b[j] = i;
            }
            if (b[j] === a[i][6]) {
                b[j] = i;
            }
            if (b[j] === a[i][7]) {
                b[j] = i;
            }
            if (b[j] === a[i][8]) {
                b[j] = i;
            }
            if (b[j] === a[i][9]) {
                b[j] = i;
            }
            if (b[j] === a[i][10]) {
                b[j] = i;
            }
            if (b[j] === a[i][11]) {
                b[j] = i;
            }
            if (b[j] === a[i][12]) {
                b[j] = i;
            }
            if (b[j] === a[i][13]) {
                b[j] = i;
            }
            if (b[j] === a[i][14]) {
                b[j] = i;
            }
            if (b[j] === a[i][15]) {
                b[j] = i;
            }
            if (b[j] === a[i][16]) {
                b[j] = i;
            }
            if (b[j] === a[i][17]) {
                b[j] = i;
            }
            if (b[j] === a[i][18]) {
                b[j] = i;
            }
            if (b[j] === a[i][19]) {
                b[j] = i;
            }
        }
    }
    let d2 = Date.now() - d1;
    console.log(d2 / 1000 + " s");
}
function test7(aLength, bLength) {
    a = new Array(aLength);
    // a.fill(0);
    let counter = 0;
    for (let i = 0; i < a.length; i++) {
        let len = Math.floor(Math.random() * 19) + 1;
        a[i] = new Array(len);
        for (let j = 0; j < len; j++) {
            a[i][j] = counter;
            counter++
        }
    }

    b = new Array(bLength);
    // b.fill(1);
    for (let i = 0; i < b.length; i++) {
        b[i] = Math.floor(Math.random() * aLength);
    }

    console.log(a);
    console.log(b);

    let aCounter = 0;
    let d1 = Date.now();




    let d2 = Date.now() - d1;
    console.log(d2 / 1000 + " s");
}
function multiTest(tests) {
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;
    let d4 = 0;
    let testAmount = tests || 5;
    console.log("Running " + testAmount + " tests.")
    for (let i = 0; i < testAmount; i++) {
        d1 += test1(2700, 27000);
        d2 += test2(900, 9000);
        d3 += test3(2700, 27000);
        d4 += test4(2700, 27000);
        // console.log("Progress: " + ((i / testAmount) * 100) + "%");
    }
    console.log(d1 / 1000);
    console.log(d2 / 1000);
    console.log(d3 / 1000);
    console.log(d4 / 1000);
}
