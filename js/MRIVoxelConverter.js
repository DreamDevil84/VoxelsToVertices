
//####################################################################
//  Extensions of Array Prototype and Math Object
//####################################################################

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

//####################################################################
//  Main functions
//####################################################################

//####################################################################
//  Create Polygons
//####################################################################

function buildShape(shape, intensityLimit, sectionModifier) {

    //####################################################################
    //  Checklist for Vertex Pieces
    //####################################################################

    //List of types of pieces
    let pieceList = [
        // 3
        [[[1, 1], [1, 0]], [[0, 0], [0, 0]]], //#0 Flat side - Single triangle
        [[[1, 1], [0, 0]], [[0, 0], [1, 0]]], //#1 Single Diagonal
        [[[0, 1], [1, 0]], [[1, 0], [0, 0]]], //#2 Double Diagonal
        // 4
        [[[1, 1], [1, 1]], [[0, 0], [0, 0]]], //#3 Flat side - NOTE: Might need an update to check direction
        [[[1, 1], [1, 0]], [[1, 0], [0, 0]]], //#4 Corner Piece
        [[[1, 1], [1, 0]], [[0, 0], [0, 1]]], //#5 Curved - NOTE: This might need a direction check
        [[[1, 1], [1, 0]], [[0, 0], [1, 0]]], //#6 S-Shape
        [[[1, 1], [0, 1]], [[0, 0], [0, 1]]], //#7 S-Shape reverse
        [[[1, 1], [0, 0]], [[0, 0], [1, 1]]], //#8 Slope
        [[[1, 0], [0, 1]], [[0, 1], [1, 0]]], //#9 V-shape/3-corner Pyramid
        // 5
        [[[1, 1], [1, 1]], [[1, 0], [0, 0]]], //#10 Flat with one extra
        [[[1, 1], [1, 1]], [[0, 1], [0, 0]]], //#11 Flat with one extra - mirrored
        [[[1, 1], [1, 0]], [[1, 1], [0, 0]]], //#12 Corner and Line, inverse Single Diagonal polygon
        [[[1, 1], [1, 0]], [[1, 0], [0, 1]]], //#13 Corner and Diagonal Line, inverse Double Diagonal polygon
        [[[1, 1], [1, 0]], [[0, 0], [1, 1]]], //#14 Slope + corner
        // 6
        [[[1, 1], [1, 1]], [[1, 1], [0, 0]]], //#15 Stairs
        [[[1, 1], [1, 1]], [[1, 0], [0, 1]]], //#16 Stairs - Broken
        [[[1, 0], [1, 1]], [[1, 1], [0, 1]]], //#17 Diagonal hole
        // 7
        [[[1, 1], [1, 1]], [[1, 1], [1, 0]]] //#18 Empty corner
        // [[[0, 0], [0, 0]], [[1, 1], [1, 1]]]  //#19 Reverse Flat side
    ];
    let vLength, iLength;
    let vertices, indices, normals, intensities;
    let vCount, iCount, intCount;
    let zMin, zMax, yMin, yMax, xMin, xMax;
    //  Sets modifier for z-axis, 1 by default
    let zMod = sectionModifier || 1;

    // filters for intensity
    let intensityMin = intensityLimit || 0;

    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            for (let k = 0; k < shape[i][j].length; k++) {
                if (shape[i][j][k] <= intensityLimit) {
                    shape[i][j][k] = 0;
                }
            }
        }
    }

    //  Make shape lengths uniform

    shape = makeShapeUniform(shape);

    //  Coat shape with 0s to more easily read data
    shape = coatShape(shape);

    console.log("Intensity limit set");
    console.log("Building vertices: Start");
    vLength = shape.length * shape[0].length * shape[0][0].length * 3;
    iLength = vLength * 24;

    vertices = new Array(vLength);

    normals = new Array(vLength);

    intensities = new Float32Array(vLength);

    indices = new Array(iLength);

    zMin = 0;
    zMax = 0;
    yMin = 0;
    yMax = 0;
    xMin = 0;
    xMax = 0;
    //  Counters for arrays
    vCount = 0;
    iCount = 0;
    intCount = 0;

    //WARNING: DEBUG MODE, FIX if !ENDS AT -1
    for (let z = 0; z < shape.length - 1; z++) {
        //WARNING: DEBUG MODE, FIX if !ENDS AT -1
        for (let y = 0; y < shape[z].length - 1; y++) {
            for (let x = 0; x < shape[z][y].length - 1; x++) {
                let v1 = shape[z][y][x];
                let v2 = shape[z][y][x + 1];
                let v3 = shape[z][y + 1][x];
                let v4 = shape[z][y + 1][x + 1];
                let v5 = shape[z + 1][y][x];
                let v6 = shape[z + 1][y][x + 1];
                let v7 = shape[z + 1][y + 1][x];
                let v8 = shape[z + 1][y + 1][x + 1];

                let sum = 0;
                if (v1 > intensityMin) {
                    sum++;
                }
                if (v2 > intensityMin) {
                    sum++;
                }
                if (v3 > intensityMin) {
                    sum++;
                }
                if (v4 > intensityMin) {
                    sum++;
                }
                if (v5 > intensityMin) {
                    sum++;
                }
                if (v6 > intensityMin) {
                    sum++;
                }
                if (v7 > intensityMin) {
                    sum++;
                }
                if (v8 > intensityMin) {
                    sum++;
                }
                //WARNING: DEBUG MODE, FIX if !SPAN 2-8
                if (2 < sum && sum < 8) {
                    let a1 = [z, y, x];
                    let a2 = [z, y, (x + 1)];
                    let a3 = [z, (y + 1), x];
                    let a4 = [z, (y + 1), (x + 1)];
                    let a5 = [(z + 1), y, x];
                    let a6 = [(z + 1), y, (x + 1)];
                    let a7 = [(z + 1), (y + 1), x];
                    let a8 = [(z + 1), (y + 1), (x + 1)];

                    let piece = [[[v1, v2], [v3, v4]], [[v5, v6], [v7, v8]]];
                    let pInfo = analysePiece(piece);
                    let pIndex = pInfo[0];
                    let zRot = pInfo[1];
                    let yRot = pInfo[2];
                    let xRot = pInfo[3];
                    let tempNormal, a1Check, a2Check, a3Check, a4Check, a5Check, a6Check, a7Check, a8Check;
                    switch (pIndex) {
                        case 0:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            tempNormal = calculateNormals(a1, a3, a2);
                            a1Check = checkBehind(a1, tempNormal);
                            a2Check = checkBehind(a2, tempNormal);
                            a3Check = checkBehind(a3, tempNormal);
                            if (a1Check + a2Check + a3Check > 0) {
                                polygonProperties(a1, a3, a2);
                            } else {
                                polygonProperties(a1, a3, a2);
                            }
                            break;
                        case 1:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            polygonProperties(a1, a7, a2);
                            break;
                        case 2:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            polygonProperties(a2, a5, a3);
                            break;
                        case 3:
                            //this is a flat side, might need an update to check direction
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            tempNormal = calculateNormals(a1, a3, a2);
                            a1Check = checkBehind(a1, tempNormal);
                            a2Check = checkBehind(a2, tempNormal);
                            a3Check = checkBehind(a3, tempNormal);
                            a4Check = checkBehind(a4, tempNormal);
                            if (a1Check + a2Check + a3Check + a4Check > 0) {
                                flatPolygonProperties(a1, a3, a2, a4);
                            } else {
                                singleFlatPolygonProperties(a1, a3, a2, a4);
                            }
                            break;
                        case 4:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            polygonProperties(a2, a5, a3);
                            break;
                        case 5:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            a8.push(shape[a8[0]][a8[1]][a8[2]]);
                            polygonProperties(a2, a1, a8);
                            polygonProperties(a2, a8, a3);
                            polygonProperties(a1, a3, a8);
                            break;
                        case 6:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            polygonProperties(a2, a1, a7);
                            polygonProperties(a2, a7, a3);
                            break;
                        case 7:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            a8.push(shape[a8[0]][a8[1]][a8[2]]);
                            polygonProperties(a1, a4, a8);
                            polygonProperties(a1, a8, a2);
                            break;
                        case 8:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            a8.push(shape[a8[0]][a8[1]][a8[2]]);
                            polygonProperties(a1, a2, a7);
                            polygonProperties(a2, a8, a7);
                            polygonProperties(a1, a8, a2);
                            polygonProperties(a1, a7, a8);
                            break;
                        case 9:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a6.push(shape[a6[0]][a6[1]][a6[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            polygonProperties(a1, a6, a4);
                            polygonProperties(a1, a4, a7);
                            polygonProperties(a4, a6, a7);
                            polygonProperties(a1, a7, a6);
                            break;
                        case 10:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            polygonProperties(a2, a3, a4);
                            polygonProperties(a3, a2, a5);
                            break;
                        case 11:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a6.push(shape[a6[0]][a6[1]][a6[2]]);
                            polygonProperties(a1, a3, a4);
                            polygonProperties(a1, a4, a6);
                            break;
                        case 12:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a6.push(shape[a6[0]][a6[1]][a6[2]]);
                            polygonProperties(a2, a5, a3);
                            polygonProperties(a2, a6, a5);
                            break;
                        case 13:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            a8.push(shape[a8[0]][a8[1]][a8[2]]);
                            polygonProperties(a2, a8, a3);
                            polygonProperties(a2, a5, a8);
                            polygonProperties(a3, a8, a5);
                            break;
                        case 14:
                            //NOTE - Tricky one, might need to be reviewed
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            a8.push(shape[a8[0]][a8[1]][a8[2]]);
                            polygonProperties(a3, a2, a8);
                            polygonProperties(a2, a1, a7);
                            polygonProperties(a2, a7, a8);
                            break;
                        case 15:
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a6.push(shape[a6[0]][a6[1]][a6[2]]);
                            polygonProperties(a3, a4, a5);
                            polygonProperties(a4, a6, a5);
                            break;
                        case 16:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            a8.push(shape[a8[0]][a8[1]][a8[2]]);
                            polygonProperties(a2, a5, a8);
                            polygonProperties(a5, a3, a8);
                            break;
                        case 17:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a6.push(shape[a6[0]][a6[1]][a6[2]]);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            a8.push(shape[a8[0]][a8[1]][a8[2]]);
                            polygonProperties(a1, a6, a4);
                            polygonProperties(a3, a8, a5);
                            break;
                        case 18:
                            // [[[1, 1], [1, 1]], [[1, 1], [1, 0]]], //#18 Empty corner
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a6.push(shape[a6[0]][a6[1]][a6[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            polygonProperties(a4, a6, a7);
                            break;
                        case 19:
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a6.push(shape[a6[0]][a6[1]][a6[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            a8.push(shape[a8[0]][a8[1]][a8[2]]);
                            tempNormal = calculateNormals(a1, a3, a2);
                            a1Check = checkBehind(a5, tempNormal);
                            a2Check = checkBehind(a6, tempNormal);
                            a3Check = checkBehind(a7, tempNormal);
                            a4Check = checkBehind(a8, tempNormal);
                            if (a1Check + a2Check + a3Check + a4Check > 0) {
                                flatPolygonProperties(a8, a7, a6, a5);
                            }
                            break;
                        default:
                            break;
                    }
                }
                // console.log(intensities);
            }
        }
    }
    console.log("Building vertices: Done");
    // console.log(intensities);
    // console.log(vertices.length);
    // console.log(normals.length);
    // console.log(indices.length);
    // console.log(indices);
    // console.log(intensities.length);
    console.log("Adjusting Arrays: Start");
    vertices.fixLength();
    indices.fixLength();
    normals.fixLength();
    console.log("Adjusting Arrays: Done");
    let normalsToCheck = formatArrays();

    intensities = fixIntensitiesLength();
    // let d1 = Date.now();
    // normals = setNormals(normalsToCheck);
    // let d2 = Date.now() - d1;
    // console.log(d2 / 1000 + " s");

    let shapeSizeZ = shape.length;
    let shapeSizeY = shape[0].length;
    let shapeSizeX = shape[0][0].length;

    shapeSmoothingCrunch(10);
    // shapeSmoothing(intensityMin, shapeSizeZ - 3, shapeSizeY - 3, shapeSizeX - 3);

    if (!(zMod === 1)) {
        stretch(zMod);
    }
    normals = setNormals(normalsToCheck);
    normals = checkNormals(normals);

    function checkBehind(vertex, normal) {
        if (shape[vertex[0] - normal[2]][vertex[1] - normal[1]][vertex[2] - normal[0]] > 0) {
            return 1;
        }
        return 0;
    }
    function convertToDoubleArray(array) {
        let newArray = [];
        for (let i = 0; i < array.length; i += 3) {
            newArray.push([array[i], array[i + 1], array[i + 2]]);
        }
        return newArray;
    }
    function stretchOLD(mod) {
        // Increases size of 3d-model along the z-axis
        console.log("Stretching");

        for (let i = 0; i < vertices.length; i += 3) {
            vertices[i] *= mod;
        }
    }
    function stretch(mod) {
        // Increases size of 3d-model along the z-axis
        console.log("Stretching");

        for (let i = 0; i < vertices.length; i++) {
            vertices[i][0] *= mod;
        }
    }
    function checkNormalsOLD(array) {
        //  TODO - This is currently a cheap fix, might need to adjust it in future
        for (let i = 0; i < array.length; i++) {
            let n1 = array[i][0];
            let n2 = array[i][1];
            let n3 = array[i][2];

            if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
                console.log("USELESS NORMAL FOUND at: " + i);
                array[i][0] = -1;
                array[i][1] = -1;
                array[i][2] = -1;
            }
        }
    }
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
    // TODO - optimise
    function formatArrays() {
        console.log("Formatting data: Start");

        // Finds dupes in vertice array and fixes them
        // Also creates array for duplicate indexes

        //  TODO - Optimise
        let indexesToCheck = new Array(vertices.length);
        let indexCheckCount = 0;
        console.log("Formatting Vertices: Start");
        let vertexProgress = Math.floor((vertices.length / 100));
        for (let i = 0; i < vertices.length; i += 3) {
            if (vertices[i] === -1) {
                continue;
            }
            let v1 = vertices[i];
            let v2 = vertices[i + 1];
            let v3 = vertices[i + 2];

            let iIndex = i / 3;
            indexesToCheck[indexCheckCount] = new Array(20);

            let tempIndexCheckCount = 0;
            indexesToCheck[indexCheckCount][tempIndexCheckCount] = iIndex;
            tempIndexCheckCount++;

            for (let j = i + 3; j < vertices.length; j += 3) {
                if (vertices[j] === -1) {
                    continue;
                }
                if (vertices[j] > vertices[i] + 2) {
                    break;
                }
                let i1 = vertices[j];
                let i2 = vertices[j + 1];
                let i3 = vertices[j + 2];
                if (i1 === v1 && i2 === v2 && i3 === v3) {
                    vertices[j] = -1;
                    vertices[j + 1] = -1;
                    vertices[j + 2] = -1;
                    intensities[j / 3] = 0;
                    let jIndex = j / 3;
                    indexesToCheck[indexCheckCount][tempIndexCheckCount] = jIndex;
                    tempIndexCheckCount++;
                }
            }
            indexCheckCount++;
            if ((i % (vertexProgress)) === 0) {
                console.log("Vertex Progress: " + (i / vertexProgress) + "%");
            }
        }
        console.log("Formatting Vertices: Done");


        //  Removes empty slots in indexesToCheck
        for (let i = 0; i < indexesToCheck.length; i++) {
            if (typeof indexesToCheck[i] === "undefined") {
                indexesToCheck.length = i;
                break;
            }
            for (let j = 0; j < indexesToCheck[i].length; j++) {
                if (typeof indexesToCheck[i][j] === "undefined") {
                    indexesToCheck[i].length = j;
                    break;
                }
            }
        }
        //  Create Index Checklist
        let indexArray = new Array(indices.length);
        for (let i = 0; i < indexesToCheck.length; i++) {
            for (let j = 0; j < indexesToCheck[i].length; j++) {
                indexArray[indexesToCheck[i][j]] = i;
            }
        }

        //  Replace index dupes with common index by using checklist
        console.log("Formatting Indices: Start");
        for (let i = 0; i < indices.length; i++) {
            let temp = indexArray[indices[i]];
            indices[i] = temp;
        }
        console.log("Formatting Indices: Done");


        vertices = fixArrayLength(vertices);
        vertices = convertToDoubleArray(vertices);
        indices = convertToDoubleArray(indices);

        //  Build Checklist for Normals
        let normalsToCheck = [];
        for (let i = 0; i < indexesToCheck.length; i++) {
            normalsToCheck.push([]);
        }
        for (let i = 0; i < indices.length; i++) {
            for (let j = 0; j < indices[i].length; j++) {
                let temp = indices[i][j];
                normalsToCheck[temp].push(i);
            }
        }


        //  Replace duplicate polygons
        // let found = 0;
        // console.log("Fixing dupes: Start");
        // let dupeProgress = Math.floor(indices.length / 100);
        // TODO - optimise

        // for (let i = 0; i < indices.length; i += 3) {
        //     if (indices[i] === -1) {
        //         continue;
        //     }
        //     let v1 = indices[i];
        //     let v2 = indices[i + 1];
        //     let v3 = indices[i + 2];

        //     for (let j = i + 3; j < indices.length; j += 3) {
        //         if (indices[j] === -1) {
        //             continue;
        //         }
        //         let i1 = indices[j];
        //         let i2 = indices[j + 1];
        //         let i3 = indices[j + 2];
        //         let sum = 0;
        //         if (i1 === v1 || i1 === v2 || i1 === v3) {
        //             sum++;
        //         }
        //         if (i2 === v1 || i2 === v2 || i2 === v3) {
        //             sum++;
        //         }
        //         if (i3 === v1 || i3 === v2 || i3 === v3) {
        //             sum++;
        //         }
        //         if (sum === 3) {
        //             // indices[j] = -1;
        //             // indices[j + 1] = -1;
        //             // indices[j + 2] = -1;
        //             console.log("Found dupe at: " + j);
        //             found++;
        //         }
        //     }
        // if (i % dupeProgress === 0) {
        //     console.log("Dupe progress: " + (i / dupeProgress) + "%");
        // }
        // }
        // console.log("Fixing dupes: Done");
        // console.log("Found dupes: " + found);
        console.log("Formatting data: Done");
        return normalsToCheck;
    }
    function fixArrayLength(array) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (!(array[i] === -1)) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }
    function fixIntensitiesLength() {
        let newIntensities = [];
        for (let i = 0; i < intensities.length; i++) {
            if (!(intensities[i] === 0)) {
                newIntensities.push(intensities[i]);
            }
        }
        return newIntensities;
    }
    function polygonProperties(vertex1, vertex2, vertex3) {

        indices[iCount] = vCount / 3;
        iCount++;
        vertices[vCount] = vertex1[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex1[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex1[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex1[3];
        intCount++;


        indices[iCount] = vCount / 3;
        iCount++;
        vertices[vCount] = vertex2[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex2[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex2[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex2[3];
        intCount++;

        indices[iCount] = vCount / 3;
        iCount++;
        vertices[vCount] = vertex3[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex3[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex3[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex3[3];
        intCount++;
    }
    function flatPolygonProperties(vertex1, vertex2, vertex3, vertex4) {

        //This one handles squares

        let i1 = vCount / 3;
        vertices[vCount] = vertex1[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex1[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex1[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex1[3];
        intCount++;

        let i2 = vCount / 3;
        vertices[vCount] = vertex2[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex2[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex2[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex2[3];
        intCount++;

        let i3 = vCount / 3;
        vertices[vCount] = vertex3[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex3[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex3[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex3[3];
        intCount++;

        let i4 = vCount / 3;
        vertices[vCount] = vertex4[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex4[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex4[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex4[3];
        intCount++;

        indices[iCount] = i1;
        iCount++;
        indices[iCount] = i2;
        iCount++;
        indices[iCount] = i3;
        iCount++;
        indices[iCount] = i2;
        iCount++;
        indices[iCount] = i4;
        iCount++;
        indices[iCount] = i3;
        iCount++;
    }
    function singleFlatPolygonProperties(vertex1, vertex2, vertex3, vertex4) {

        //This one handles single squares floating in space

        let i1 = vCount / 3;
        vertices[vCount] = vertex1[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex1[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex1[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex1[3];
        intCount++;

        let i2 = vCount / 3;
        vertices[vCount] = vertex2[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex2[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex2[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex2[3];
        intCount++;

        let i3 = vCount / 3;
        vertices[vCount] = vertex3[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex3[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex3[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex3[3];
        intCount++;

        let i4 = vCount / 3;
        vertices[vCount] = vertex4[0];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex4[1];
        normals[vCount] = 0;
        vCount++;
        vertices[vCount] = vertex4[2];
        normals[vCount] = 0;
        vCount++;
        intensities[intCount] = vertex4[3];
        intCount++;

        indices[iCount] = i1;
        iCount++;
        indices[iCount] = i2;
        iCount++;
        indices[iCount] = i3;
        iCount++;
        indices[iCount] = i2;
        iCount++;
        indices[iCount] = i4;
        iCount++;
        indices[iCount] = i3;
        iCount++;
    }
    function setNormals(normalsToCheck) {
        console.log("Setting Normals: Start");
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

            // if (vertexNormalSum[0] === 0 && vertexNormalSum[1] === 0 && vertexNormalSum[2] === 0) {
            //     vertexNormalSum[0] = vertexNormalsFormated[0][0];
            //     vertexNormalSum[1] = vertexNormalsFormated[0][1];
            //     vertexNormalSum[2] = vertexNormalsFormated[0][2];
            // }

            // Calculate Normal to Unit Vector
            newNormals.push(Math.unitVector(vertexNormalSum[0], vertexNormalSum[1], vertexNormalSum[2]));
        }
        console.log("Setting Normals: Done");
        return newNormals;
    }
    //  Make shape uniform to avoid length issues
    function makeShapeUniform(shape) {
        let zLength = shape.length;
        let yLength = shape[0].length;
        let xLength = shape[0][0].length;
        yChange = false;
        xChange = false;

        for (let z = 0; z < shape.length; z++) {
            if (yLength < shape[z].length) {
                yLength = shape[z].length;
                yChange = true;
            }
            for (let y = 0; y < shape[z].length; y++) {
                if (xLength < shape[z][y].length) {
                    xLength = shape[z][y].length;
                    xChange = true;
                }
            }
        }

        if (yChange === true || xChange === true) {
            for (let z = 0; z < shape.length; z++) {
                for (let y = shape[z].length; y < yLength; y++) {
                    shape[z].push([]);
                }
                for (let y = 0; y < shape[z].length; y++) {
                    for (let x = shape[z][y].length; x < xLength; x++) {
                        shape[z][y].push([0]);
                    }
                }
            }
            return shape;
        } else {
            return shape;
        }
    }
    //  Coates a shape with 0s, needed to avoid issues
    function coatShape(shape) {
        let newShape = [];
        let emptySlate = new Array(shape[0].length + 2);
        let emptyRow = new Array(shape[0][0].length + 2);
        emptyRow.fill(-1);
        emptySlate.fill(emptyRow);
        newShape.push(emptySlate);
        for (let i = 0; i < shape.length; i++) {
            let hor = [];
            hor.push(emptyRow);
            for (let j = 0; j < shape[i].length; j++) {
                let ver = [];
                ver.push(-1);
                for (let k = 0; k < shape[i][j].length; k++) {
                    ver.push(shape[i][j][k]);
                }
                ver.push(-1);
                hor.push(ver);
            }
            hor.push(emptyRow);
            newShape.push(hor);
        }
        newShape.push(emptySlate);
        return newShape;
    }
    //####################################################################
    //  Calculates Normals
    //####################################################################
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
        let x = [];
        let n1 = n[0];
        let n2 = n[1];
        let n3 = n[2];
        x.push(n1);
        x.push(n2);
        x.push(n3);
        return x;
    }
    //####################################################################
    //  Smoothing Functions
    //####################################################################

    function shapeSmoothing(minIntensity, shapeSizeZ, shapeSizeY, shapeSizeX) {
        // let multiplierZ = (shapeSizeZ / 2) * (1 - minIntensity);
        // let multiplierY = (shapeSizeY / 2) * (1 - minIntensity);
        // let multiplierX = (shapeSizeX / 2) * (1 - minIntensity);
        // let multiplierZ = (minIntensity / 10);
        // let multiplierY = (minIntensity / 10);
        // let multiplierX = (minIntensity / 10);
        // let multiplierZ = (shapeSizeZ / 2);
        // let multiplierY = (shapeSizeY / 2);
        // let multiplierX = (shapeSizeX / 2);
        for (let i = 0; i < vertices.length; i++) {
            let intensity = intensities[i];
            let multiplier = intensity - (0.5 + (minIntensity / 2));
            // let multiplier = intensity*100;

            // vertices[i][0] += ((normals[i][2] * (1 + intensity * multiplierZ)));
            // vertices[i][1] += ((normals[i][1] * (1 + intensity * multiplierY)));
            // vertices[i][2] += ((normals[i][0] * (1 + intensity * multiplierX)));

            // vertices[i][0] += ((normals[i][2] * (1 + intensity)));
            // vertices[i][1] += ((normals[i][1] * (1 + intensity)));
            // vertices[i][2] += ((normals[i][0] * (1 + intensity)));

            vertices[i][0] += ((normals[i][2] * multiplier));
            vertices[i][1] += ((normals[i][1] * multiplier));
            vertices[i][2] += ((normals[i][0] * multiplier));

            // vertices[i][0] += ((normals[i][2] * (1 + intensity * 6)));
            // vertices[i][1] += ((normals[i][1] * (1 + intensity * 6)));
            // vertices[i][2] += ((normals[i][0] * (1 + intensity * 6)));
        }
    }
    function shapeSmoothingCrunch(loops) {
        let zMax = 0;
        let yMax = 0;
        let xMax = 0;
        let newVertices = [];
        for (let i = 0; i < vertices.length; i++) {
            if (vertices[i][0] > zMax) {
                zMax = vertices[i][0];
            }
            if (vertices[i][1] > yMax) {
                yMax = vertices[i][1];
            }
            if (vertices[i][2] > xMax) {
                xMax = vertices[i][2];
            }
            newVertices.push(vertices[i]);
        }

        let shape = [];


        for (let z = 0; z < zMax; z++) {
            shape.push([]);
            for (let y = 0; y < yMax; y++) {
                shape[z].push([]);
                for (let x = 0; x < xMax; x++) {
                    shape[z][y].push(-1);
                }
            }
        }

        shape = coatShape(shape);


        for (let i = 0; i < vertices.length; i++) {
            let z = vertices[i][0];
            let y = vertices[i][1];
            let x = vertices[i][2];
            shape[z][y][x] = i;
        }

        for (let l = 0; l < loops; l++) {
            for (let z = 1; z < shape.length - 1; z++) {
                for (let y = 1; y < shape[z].length - 1; y++) {
                    for (let x = 1; x < shape[z][y].length - 1; x++) {

                        let vertex = shape[z][y][x];
                        if (!(vertex === -1)) {
                            let verticeChecks = [];
                            for (let i = -1; i < 2; i++) {
                                for (let j = -1; j < 2; j++) {
                                    for (let k = -1; k < 2; k++) {
                                        let vertexToCheck = shape[z + i][y + j][x + k];
                                        if (vertexToCheck >= 0) {
                                            verticeChecks.push(vertexToCheck);
                                        }
                                    }
                                }
                            }

                            let zValue = 0;
                            let yValue = 0;
                            let xValue = 0;

                            for (let i = 0; i < verticeChecks.length; i++) {
                                zValue += vertices[verticeChecks[i]][0];
                                yValue += vertices[verticeChecks[i]][1];
                                xValue += vertices[verticeChecks[i]][2];

                            }

                            zValue /= verticeChecks.length;
                            yValue /= verticeChecks.length;
                            xValue /= verticeChecks.length;

                            newVertices[vertex] = [zValue, yValue, xValue];
                        }

                    }
                }
            }

            for (let i = 0; i < vertices.length; i++) {
                vertices[i] = [newVertices[i][0], newVertices[i][1], newVertices[i][2]];
            }

        }
    }
    function shapeSmoothingCC() {

        let edge = [0, 0];
        let faces = [];
        for (let i = 0; i < indices.length; i++) {
            let v1 = vertices[indices[i][0]];
            let v2 = vertices[indices[i][1]];
            let v3 = vertices[indices[i][2]];

            //  Make facePoint
            let fv = [
                (v1[0] + v2[0] + v3[0]) / 3,
                (v1[1] + v2[1] + v3[1]) / 3,
                (v1[2] + v2[2] + v3[2]) / 3
            ]
            faces.push([v1, v2, v3, fv]);
        }
        let edgeIndices = [];
        for (let i = 0; i < indices.length; i++) {
            let i1 = indices[i][0];
            let i2 = indices[i][1];
            let i3 = indices[i][2];

            let v1, v2, fv1, fv2;

            let edge1index = [i1, i2];
            let edge2index = [i2, i3];
            let edge3index = [i1, i3];

            findEdge(edge1index[0], edge1index[1]);
            v1 = faces[i][0];
            v2 = faces[i][1];
            fv1 = faces[edge[0]][3];
            fv2 = faces[edge[1]][3];
            let edge1 = [
                (v1[0] + v2[0] + fv1[0] + fv2[0]) / 4,
                (v1[1] + v2[1] + fv1[1] + fv2[1]) / 4,
                (v1[2] + v2[2] + fv1[2] + fv2[2]) / 4
            ]

            findEdge(edge2index[0], edge2index[1]);
            v1 = faces[i][1];
            v2 = faces[i][2];
            fv1 = faces[edge[0]][3];
            fv2 = faces[edge[1]][3];
            let edge2 = [
                (v1[0] + v2[0] + fv1[0] + fv2[0]) / 4,
                (v1[1] + v2[1] + fv1[1] + fv2[1]) / 4,
                (v1[2] + v2[2] + fv1[2] + fv2[2]) / 4
            ]

            findEdge(edge3index[0], edge3index[1]);
            v1 = faces[i][0];
            v2 = faces[i][2];
            fv1 = faces[edge[0]][3];
            fv2 = faces[edge[1]][3];
            let edge3 = [
                (v1[0] + v2[0] + fv1[0] + fv2[0]) / 4,
                (v1[1] + v2[1] + fv1[1] + fv2[1]) / 4,
                (v1[2] + v2[2] + fv1[2] + fv2[2]) / 4
            ]

            faces[i] = [faces[i][0], faces[i][1], faces[i][2], faces[i][3], edge1, edge2, edge3];
        }
        console.log(faces);




        function findEdge(ep1, ep2) {
            let edgeNr = 0;
            for (let j = 0; j < indices.length; j++) {
                if (indices[j].includes(ep1) && indices[j].includes(ep2)) {
                    edge[edgeNr] = j;
                    edgeNr++;
                }
                if (edgeNr > 1) {
                    break;
                }
            }
        }
    }
    //####################################################################
    //  Analyses a 2x2x2 piece - Returns type and rotation
    //####################################################################

    function analysePiece(piece) {
        let tempPiece = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
        //Make a deep copy so we can alter it safely
        for (let z = 0; z < 2; z++) {
            for (let y = 0; y < 2; y++) {
                for (let x = 0; x < 2; x++) {
                    tempPiece[z][y][x] = piece[z][y][x];
                }
            }
        }

        //TODO - find a way to reduce the amount of rotations to a max of 24
        // let x = 0;
        // while (x < 4) {
        //     for (let z = 0; z < 4; z++) {
        //         for (let y = 0; y < 4; y++) {
        //             let pieceIndex = checkPiece(tempPiece);
        //             if (pieceIndex > -1) {
        //                 //Returns index for type of shape and the rotation values
        //                 return [pieceIndex, z, y, x];
        //             }
        //             tempPiece = rotatePieceY(tempPiece);
        //         }
        //         tempPiece = rotatePieceZ(tempPiece);
        //     }
        //     if (x === 0) {
        //         x++;
        //         tempPiece = rotatePieceX(tempPiece);
        //     } else {
        //         tempPiece = rotatePieceX(tempPiece);
        //         tempPiece = rotatePieceX(tempPiece);
        //         x += 2;
        //     }
        // }
        for (let z = 0; z < 4; z++) {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    let pieceIndex = checkPiece(tempPiece);
                    if (pieceIndex > -1) {
                        //Returns index for type of shape and the rotation values
                        return [pieceIndex, z, y, x];
                    }
                    tempPiece = rotatePieceX(tempPiece);
                }
                tempPiece = rotatePieceY(tempPiece);
            }
            tempPiece = rotatePieceZ(tempPiece);
        }

        // //It shouldnt come to this, but we have it just in case
        return -1;
    }
    function checkPiece(piece) {
        for (let i = 0; i < pieceList.length; i++) {
            if (comparePieces(piece, pieceList[i])) {
                return i;
            }
        }
        return -1;
    }
    function comparePieces(p1, p2) {
        let matches = 0;
        for (let z = 0; z < 2; z++) {
            for (let y = 0; y < 2; y++) {
                for (let x = 0; x < 2; x++) {
                    if (p1[z][y][x] > 0) {
                        p1[z][y][x] = 1;
                    }
                    if (p1[z][y][x] === p2[z][y][x]) {
                        matches++;
                    }
                }
            }
        }
        // console.log(matches);
        if (matches === 8) {
            // console.log("matched");
            return true;
        }
        return false;
    }

    //####################################################################
    //  Rotates the 2x2x2 piece on an axis
    //####################################################################

    function rotatePieceZ(piece) {
        let rotatedPiece = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
        for (let z = 0; z < 2; z++) {
            if (piece[z][0][0] === 1) {
                rotatedPiece[z][1][0] = 1;
            }
            if (piece[z][0][1] === 1) {
                rotatedPiece[z][0][0] = 1;
            }
            if (piece[z][1][0] === 1) {
                rotatedPiece[z][1][1] = 1;
            }
            if (piece[z][1][1] === 1) {
                rotatedPiece[z][0][1] = 1;
            }
        }
        return rotatedPiece;
    }
    function rotatePieceY(piece) {
        let rotatedPiece = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
        for (let y = 0; y < 2; y++) {
            if (piece[0][y][0] === 1) {
                rotatedPiece[1][y][0] = 1;
            }
            if (piece[0][y][1] === 1) {
                rotatedPiece[0][y][0] = 1;
            }
            if (piece[1][y][0] === 1) {
                rotatedPiece[1][y][1] = 1;
            }
            if (piece[1][y][1] === 1) {
                rotatedPiece[0][y][1] = 1;
            }
        }
        return rotatedPiece;
    }
    function rotatePieceX(piece) {
        let rotatedPiece = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
        for (let x = 0; x < 2; x++) {
            if (piece[0][0][x] === 1) {
                rotatedPiece[0][1][x] = 1;
            }
            if (piece[0][1][x] === 1) {
                rotatedPiece[1][1][x] = 1;
            }
            if (piece[1][0][x] === 1) {
                rotatedPiece[0][0][x] = 1;
            }
            if (piece[1][1][x] === 1) {
                rotatedPiece[1][0][x] = 1;
            }
        }
        return rotatedPiece;
    }
    function fixVerticeRotation(vertex, p, zRot, yRot, xRot) { //p for position: 1-8
        //NOTE: Reversing rotation is done in opposite order of original rotation
        //Original rotation is: z then y then x
        //Reverse is: x then y then z

        for (let x = 0; x < xRot; x++) {
            switch (p) {
                case 1:
                    vertex[0]++;
                    p = 5;
                    break;
                case 2:
                    vertex[0]++;
                    p = 6;
                    break;
                case 3:
                    vertex[1]--;
                    p = 1;
                    break;
                case 4:
                    vertex[1]--;
                    p = 2;
                    break;
                case 5:
                    vertex[1]++;
                    p = 7;
                    break;
                case 6:
                    vertex[1]++;
                    p = 8;
                    break;
                case 7:
                    vertex[0]--;
                    p = 3;
                    break;
                case 8:
                    vertex[0]--;
                    p = 4;
                    break;
                default:
                    break;
            }
        }
        for (let y = 0; y < yRot; y++) {
            switch (p) {
                case 1:
                    vertex[2]++;
                    p = 2;
                    break;
                case 2:
                    vertex[0]++;
                    p = 6;
                    break;
                case 3:
                    vertex[2]++;
                    p = 4;
                    break;
                case 4:
                    vertex[0]++;
                    p = 8;
                    break;
                case 5:
                    vertex[0]--;
                    p = 1;
                    break;
                case 6:
                    vertex[2]--;
                    p = 5;
                    break;
                case 7:
                    vertex[0]--;
                    p = 3;
                    break;
                case 8:
                    vertex[2]--;
                    p = 7;
                    break;
                default:
                    break;
            }
        }
        for (let z = 0; z < zRot; z++) {
            switch (p) {
                case 1:
                    vertex[2]++;
                    p = 2;
                    break;
                case 2:
                    vertex[1]++;
                    p = 4;
                    break;
                case 3:
                    vertex[1]--;
                    p = 1;
                    break;
                case 4:
                    vertex[2]--;
                    p = 3;
                    break;
                case 5:
                    vertex[2]++;
                    p = 6;
                    break;
                case 6:
                    vertex[1]++;
                    p = 8;
                    break;
                case 7:
                    vertex[1]--;
                    p = 5;
                    break;
                case 8:
                    vertex[2]--;
                    p = 7;
                    break;
                default:
                    break;
            }
        }
        return vertex;
    }

    console.log("ALL DONE");
    return [vertices, indices, normals, intensities];
}

//####################################################################
//  Functions for reading/writing JSON and Wavefront OBJ files
//####################################################################

function writeJSON(vertices, indices) {
    roundDoubleArray(vertices, 2);
    let jsonData = JSON.stringify([vertices, indices]);
    // download(jsonData, name + ".json", "application/json");

    function roundDoubleArray(array, number) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                array[i][j] = Math.precisionRound(array[i][j], number);
            }
        }
    }

    return jsonData;
}
function writeObj(vertices, indices, normals) {
    // let fileName = name || "objFile";
    let objString = "";
    for (let i = 0; i < vertices.length; i++) {
        let v1 = vertices[i][0];
        let v2 = vertices[i][1];
        let v3 = vertices[i][2];
        objString += "v " + v1 + " " + v2 + " " + v3 + "\n";
    }
    objString += "\n";
    for (let k = 0; k < normals.length; k++) {
        let n1 = normals[k][0];
        let n2 = normals[k][1];
        let n3 = normals[k][2];
        objString += "vn " + n1 + " " + n2 + " " + n3 + "\n";
    }
    // objString += "\n";
    for (let j = 0; j < indices.length; j++) {
        let i1 = indices[j][0] + 1;
        let i2 = indices[j][1] + 1;
        let i3 = indices[j][2] + 1;
        objString += "\n" + "f " + i1 + "//" + i1 + " " + i2 + "//" + i2 + " " + i3 + "//" + i3;
    }

    // download(objString, fileName + ".obj", 'text');
    return objString;
}
function getJSONData(fileName) {
    let request = new XMLHttpRequest();
    let path = fileName + ".json";
    request.open("GET", path);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            let bodyData = JSON.parse(this.responseText);
            convertJsonToObj(bodyData, fileName);
        }
    }
    function convertJsonToObj(data, fileName) {
        let indexesToCheck = new Array(data[0].length);
        for (let i = 0; i < indexesToCheck.length; i++) {
            indexesToCheck[i] = [];
        }
        for (let i = 0; i < data[1].length; i++) {
            for (let j = 0; j < data[1][i].length; j++) {
                indexesToCheck[data[1][i][j]].push(i);
            }
        }
        let normals = setNormalsFromJSON(indexesToCheck, data[0], data[1]);
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

                if (vertexNormalSum[0] === 0 && vertexNormalSum[1] === 0 && vertexNormalSum[2] === 0) {

                    vertexNormalSum[0] = vertexNormalsFormated[0][0];
                    vertexNormalSum[1] = vertexNormalsFormated[0][1];
                    vertexNormalSum[2] = vertexNormalsFormated[0][2];
                }

                // Calculate Normal to Unit Vector
                newNormals.push(Math.unitVector(vertexNormalSum[0], vertexNormalSum[1], vertexNormalSum[2]));
            }
            return newNormals;
        }

        writeObjFile(data[0], data[1], normals, fileName);
    }
}
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    console.log("Download finished");
}
onmessage = function (e) {
    let md = buildShape(e.data[0], e.data[1], e.data[2]);
    postMessage(md);
}
//####################################################################
//  Export functions for node.js
//####################################################################

exports.convertMRI = function (data, intensityLimit, sectionModifier) {
    return buildShape(data, intensityLimit, sectionModifier);
}
exports.writeOBJ = function (vertices, indices, normals) {
    return writeObj(vertices, indices, normals);
}
exports.writeJSON = function (vertices, indices) {
    return writeJSON(vertices, indices);
}
