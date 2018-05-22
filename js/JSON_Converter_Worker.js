//  Prototype found online, helps search an array for an array
Array.prototype.containsArray = function (val) {
    var hash = {};
    for (var i = 0; i < this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
}
Array.prototype.indexOfArray = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][0] === val[0] && this[i][1] === val[1] && this[i][2] === val[2]) {
            return i;
        }
    }
    return -1;
}
Array.prototype.fixLength = function () {
    for (var i = 0; i < this.length; i++) {
        if (typeof this[i] === "undefined") {
            this.length = i;
            break;
        }
    }
}


//Extensions to Math
Math.cross = function (a, b) {
    let result = [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
    return result;
}
Math.cross4d = function (A, B, C, D) {
    let a0 = A[0];
    let a1 = A[1];
    let a2 = A[2];
    let a3 = A[3];

    let b0 = B[0];
    let b1 = B[1];
    let b2 = B[2];
    let b3 = B[3];

    let c0 = C[0];
    let c1 = C[1];
    let c2 = C[2];
    let c3 = C[3];

    let right = [1, 0, 0, 0];
    let up = [0, 1, 0, 0];
    let back = [0, 0, 1, 0];
    let charm = [0, 0, 0, 1];

    let d = D;

    // let result = [
    //     a1 * b2 - a2 * b1,
    //     a2 * b0 - a0 * b2,
    //     a0 * b1 - a1 * b0
    // ];

    // let result = [
    //     ((a1 * b2) - (b1 * a2)) * right,
    //     ((a0 * b2) - (b0 * a2)) * (-1 * up),
    //     ((a0 * b1) - (b0 * a1)) * back
    // ];

    // let result = [
    //     ((a1 * b2) - (b1 * a2)) * c0,
    //     ((a0 * b2) - (b0 * a2)) * (-1 * c1),
    //     ((a0 * b1) - (b0 * a1)) * c2
    // ];


    let ab0 = ((a0 * b1) - (b0 * a1));
    let ab1 = ((a0 * b2) - (b0 * a2));
    let ab2 = ((a1 * b2) - (b1 * a2));

    // let result = [
    //     (ab1 * c2) - (c1 * ab2),
    //     (ab2 * c0) - (c2 * ab0),
    //     (ab0 * c1) - (c0 * ab1)
    // ]
    let result = [
        ab0, ab1, ab2
    ];



    return result;
}
Math.tangent = function (a, b) {
    return Math.sqrt((a * a) + (b * b));
}
Math.tangent3d = function (a, b, c) {
    let t = Math.tangent(a, b);
    return Math.sqrt((t * t) + (c * c));
}
Math.unitVector = function (x, y, z) {
    let xV = x / (Math.sqrt((x * x) + (y * y) + (z * z)));
    let yV = y / (Math.sqrt((x * x) + (y * y) + (z * z)));
    let zV = z / (Math.sqrt((x * x) + (y * y) + (z * z)));
    return [xV, yV, zV];
}
Math.precisionRound = function (number, decimal) {
    let factor = Math.pow(10, decimal);
    number = Math.round(number * factor) / factor;
    return number;
}
function convertJSON(data) {
    let indexesToCheck = new Array(data[0].length);
    for (let i = 0; i < indexesToCheck.length; i++) {
        indexesToCheck[i] = [];
    }
    for (let i = 0; i < data[1].length; i++) {
        for (let j = 0; j < data[1][i].length; j++) {
            indexesToCheck[data[1][i][j]].push(i);
        }
    }
    // console.log("Format Normals");
    let d1 = Date.now();
    let normals = setNormalsFromJSON(indexesToCheck, data[0], data[1]);
    let d2 = Date.now() - d1;
    // console.log(d2 / 1000 + "s");
    // console.log("Format Normals Done");
    d1 = Date.now();
    normals = checkNormals(normals);
    d2 = Date.now() - d1;
    function checkNormals(array) {
        //  TODO - This is currently a cheap fix, might need to adjust it in future
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            let n1 = array[i][0];
            let n2 = array[i][1];
            let n3 = array[i][2];

            if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
                // console.log("USELESS NORMAL FOUND at: " + i);
                let nArray = checkNextNormal(array, i);
                n1 = nArray[0];
                n2 = nArray[1];
                n3 = nArray[2];
            }
            newArray.push([n1, n2, n3]);
        }


        function checkNextNormal(array, nr) {
            nr++;
            let n1 = array[nr][0];
            let n2 = array[nr][1];
            let n3 = array[nr][2];

            if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
                let nArray = checkNextNormal(array, nr);
                return nArray;
            } else {
                return [n1, n2, n3];
            }
        }

        return newArray;
    }
    function setNormalsFromJSON(normalsToCheck, vertices, indices) {
        let newNormals = [];
        for (let i = 0; i < vertices.length; i++) {
            let vertexNormalsRaw = [];
            for (let j = 0; j < normalsToCheck[i].length; j++) {
                let v1 = vertices[indices[normalsToCheck[i][j]][0]];
                let v2 = vertices[indices[normalsToCheck[i][j]][1]];
                let v3 = vertices[indices[normalsToCheck[i][j]][2]];
                let n = calculateNormals(v1, v2, v3);
                vertexNormalsRaw.push(n);
            }

            // Remove duplicate normals
            let vertexNormalsFormated = [];
            for (let x = 0; x < vertexNormalsRaw.length; x++) {
                if (!vertexNormalsFormated.containsArray(vertexNormalsRaw[x])) {
                    vertexNormalsFormated.push(vertexNormalsRaw[x]);
                }
            }

            // Add normals together
            let vertexNormalSum = [0, 0, 0];
            for (let x = 0; x < vertexNormalsFormated.length; x++) {
                vertexNormalSum[0] = vertexNormalSum[0] + vertexNormalsFormated[x][0];
                vertexNormalSum[1] = vertexNormalSum[1] + vertexNormalsFormated[x][1];
                vertexNormalSum[2] = vertexNormalSum[2] + vertexNormalsFormated[x][2];
            }

            // Calculate Normal to Unit Vector
            newNormals.push(Math.unitVector(vertexNormalSum[0], vertexNormalSum[1], vertexNormalSum[2]));
        }
        return newNormals;
    }
    function calculateNormals(a, b, c) {
        // (a, b, c)

        //Calculate vector
        let vAB = [
            a[2] - b[2],
            a[1] - b[1],
            a[0] - b[0]
        ];
        let vCB = [
            c[2] - b[2],
            c[1] - b[1],
            c[0] - b[0]
        ];

        //Polygon Normal
        let n = Math.cross(vAB, vCB);

        //Normal Length Adjustment
        let x = [n[0], n[1], n[2]];
        // let n1 = n[0];
        // let n2 = n[1];
        // let n3 = n[2];
        // x.push(n1);
        // x.push(n2);
        // x.push(n3);
        return x;
    }
    return [data[0], data[1], normals]
}

onmessage = function (e) {
    let md = convertJSON(e.data);
    postMessage(md);
}