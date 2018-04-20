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


//####################################################################
//  Main functions
//####################################################################

//####################################################################
//  Create Polygons
//####################################################################

var vLength, iLength;
var vertices, indices, normals, intensities;
var vCount, iCount, intCount;
var zMin, zMax, yMin, yMax, xMin, xMax;
function buildVertices(shape, intensityLimit, sectionModifier) {

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
                            polygonProperties(a1, a8, a2);
                            polygonProperties(a1, a8, a7);
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
            // let progress = (z / (shape.length - 1) * 100) + (y / (shape[0].length) * 10);
            // console.log("Vertices: " + progress + "%");
        }
        // console.log(("Vertices: " + z / (shape.length - 2) * 100) + "%");
    }
    console.log("Building vertices: Done");
    // console.log(intensities);
    // console.log(vertices.length);
    // console.log(normals.length);
    // console.log(indices.length);
    // console.log(vertices);
    // console.log(indices);
    // console.log(intensities.length);
    vertices.fixLength();
    indices.fixLength();
    normals.fixLength();
    if (!(zMod === 1)) {
        stretch(zMod);
    }
    formatArrays();

    vertices = convertToDoubleArray(vertices);
    indices = convertToDoubleArray(indices);

    intensities = fixIntensitiesLength();
    normals = setNormals();

    let shapeSizeZ = shape.length;
    let shapeSizeY = shape[0][0].length;
    let shapeSizeX = shape[0][0].length;
    checkNormals(normals);
    // shapeSmoothing(intensityMin, shapeSizeZ, shapeSizeY, shapeSizeX);
    // normals = setNormals();

    // for (let i = 0; i < intensities.length; i++) {
    //     if (intensities[i] <= 0) {
    //         console.log(i);
    //         console.log(intensities[i]);
    //     }
    // }
    function checkBehind(vertex, normal) {
        if (shape[vertex[0] - normal[2]][vertex[1] - normal[1]][vertex[2] - normal[0]] > 0) {
            return 1;
        }
        return 0;
    }

    console.log("ALL DONE");
    return [vertices, indices, normals];
}
function convertToDoubleArray(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i += 3) {
        newArray.push([array[i], array[i + 1], array[i + 2]]);
    }
    return newArray;
}
function stretch(mod) {
    // Increases size of 3d-model along the z-axis
    console.log("Stretching");

    for (let i = 0; i < vertices.length; i += 3) {
        vertices[i] *= mod;
    }
}
function checkNormals(array) {
    //  TODO - This is currently a cheap fix, might need to adjust it in future
    for (let i = 0; i < array.length; i++) {
        let n1 = array[i][0];
        let n2 = array[i][1];
        let n3 = array[i][2];

        if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            // console.log("USELESS NORMAL FOUND at: " + i);
            array[i][0] = -1;
            array[i][1] = -1;
            array[i][2] = -1;
        }
    }
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
    let vertexProgress = Math.floor(vertices.length / 100);
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
        if ((i % vertexProgress) === 0) {
            console.log(("Vertex/Indexes: " + Math.floor(i / (vertices.length) * 100)) + "%");
        }
    }
    console.log("Formatting Vertices: Done");


    //  Removes empty slots in indexToCheck
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

    //  Replace duplicate polygons
    let found = 0;
    console.log("Fixing dupes: Start");
    let dupeProgress = Math.floor(indices.length / 100);

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
    //             indices[j] = -1;
    //             indices[j + 1] = -1;
    //             indices[j + 2] = -1;
    //             console.log("Found dupe at: " + j);
    //             found++;
    //         }
    //     }
    //     if (i % dupeProgress === 0) {
    //         console.log("Dupe progress: " + (i / dupeProgress) + "%");
    //     }
    // }
    vertices = fixArrayLength(vertices);
    indices = fixArrayLength(indices);
    // console.log(indices);
    console.log("Fixing dupes: Done");
    console.log("Found dupes: " + found);
    console.log("Formatting data: Done");
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
function setNormals() {
    console.log("Setting Normals: Start");
    let newNormals = [];
    for (let i = 0; i < vertices.length; i++) {
        let vertexNormalsRaw = [];
        for (let j = 0; j < indices.length; j++) {
            for (let k = 0; k < indices[j].length; k++) {
                if (indices[j][k] === i) {
                    let v1 = vertices[indices[j][0]];
                    let v2 = vertices[indices[j][1]];
                    let v3 = vertices[indices[j][2]];
                    let n = calculateNormals(v1, v2, v3);
                    vertexNormalsRaw.push(n);
                }
            }
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
        // console.log(vertexNormalSum);

        // Calculate Normal to Unit Vector
        newNormals.push(Math.unitVector(vertexNormalSum[0], vertexNormalSum[1], vertexNormalSum[2]));
        if (i % 300 === 0) {
            console.log("Normals: " + Math.floor((i / (vertices.length) * 100))* + "%");
        }
    }
    console.log("Setting Normals: Done");
    return newNormals;
}
//  Coates a shape with 0s, needed to avoid issues
function coatShape(shape) {
    let newShape = [];
    let emptySlate = new Array(shape[0].length + 2);
    let emptyRow = new Array(shape[0][0].length + 2);
    emptyRow.fill(0);
    emptySlate.fill(emptyRow);
    newShape.push(emptySlate);
    for (let i = 0; i < shape.length; i++) {
        let hor = [];
        hor.push(emptyRow);
        for (let j = 0; j < shape[i].length; j++) {
            let ver = [];
            ver.push(0);
            for (let k = 0; k < shape[i][j].length; k++) {
                ver.push(shape[i][j][k]);
            }
            ver.push(0);
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
    let multiplierZ = (minIntensity / 4);
    let multiplierY = (minIntensity / 4);
    let multiplierX = (minIntensity / 4);
    for (let i = 0; i < vertices.length; i++) {
        let intensity = intensities[i];
        // TODO - Try to find a better multiplier than a static one

        vertices[i][0] += ((normals[i][2] * (1 + intensity * multiplierZ)));
        vertices[i][1] += ((normals[i][1] * (1 + intensity * multiplierY)));
        vertices[i][2] += ((normals[i][0] * (1 + intensity * multiplierX)));
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

//####################################################################
//  Writes Wavefront .obj File
//####################################################################

function writeObjFile(vertices, indices, normals, name) {
    let fileName = name || "objFile";
    let objString = "";
    for (let i = 0; i < vertices.length; i++) {
        let v1 = vertices[i][0];
        let v2 = vertices[i][1];
        let v3 = vertices[i][2];
        objString += "v " + v1 + " " + v2 + " " + v3 + "\n";
    }
    objString += "\n ";
    for (let k = 0; k < normals.length; k++) {
        let n1 = normals[k][0];
        let n2 = normals[k][1];
        let n3 = normals[k][2];
        objString += "vn " + n1 + " " + n2 + " " + n3 + "\n";
    }
    objString += "\n ";
    for (let j = 0; j < indices.length; j++) {
        let i1 = indices[j][0] + 1;
        let i2 = indices[j][1] + 1;
        let i3 = indices[j][2] + 1;
        objString += "\n" + "f " + i1 + "//" + i1 + " " + i2 + "//" + i2 + " " + i3 + "//" + i3;
    }

    download(objString, fileName, 'text');
}
