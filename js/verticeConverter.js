//List of types of pieces
let pieceList = [
    // 3
    [[[1, 1], [1, 0]], [[0, 0], [0, 0]]], //#0 Flat side - Single triangle
    [[[1, 1], [0, 0]], [[0, 0], [1, 0]]], //#1 Single Diagonal
    [[[0, 1], [1, 0]], [[1, 0], [0, 0]]], //#2 Double Diagonal
    // 4
    [[[1, 1], [1, 1]], [[0, 0], [0, 0]]], //#3 Flat side - NOT: Might need an update to check direction
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
    [[[1, 1], [1, 1]], [[1, 1], [1, 0]]], //#18 Empty corner
];


//####################################################################
//  Main functions
//####################################################################

//####################################################################
//  Create Polygons
//####################################################################


function buildVertices(shape, intensityLimit) {
    console.log("Building vertices: Start");
    // filters for intensity
    let intensityMin = intensityLimit || 0;

    let vertices = [];
    let indices = [];
    let normals = [];

    let intensities = [];
    let vertexLayerPrevious = [];
    let indexLayerPrevious = [];
    //WARNING: DEBUG MODE, FIX if !ENDS AT -1
    for (let z = 0; z < shape.length - 1; z++) {
        let vertexLayerCurrent = [];
        let indexLayerCurrent = [];
        let normalsLayer = [];
        let intensityLayer = [];
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

                    //sP means shapeProperties
                    let sP = [];

                    switch (pIndex) {
                        case 0:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a3, a2);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            // sP = polygonProperties(vertexLayerCurrent, indexLayerCurrent, normalsLayer, intensityLayer, a1, a3, a2);
                            // vertexLayerCurrent = sP[0];
                            // indexLayerCurrent = sP[1];
                            // normalsLayer = sP[2];
                            // intensityLayer = sP[3];
                            break;
                        case 1:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a1.push(shape[a1[0]][a1[1]][a1[2]]);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            // sP = polygonProperties(vertices, indices, normals, intensities, a1, a7, a2);
                            // vertices = sP[0];
                            // indices = sP[1];
                            // normals = sP[2];
                            // intensities = sP[3];
                            sP = polygonProperties(vertexLayerCurrent, indexLayerCurrent, normalsLayer, intensityLayer, a1, a7, a2);
                            vertexLayerCurrent = sP[0];
                            indexLayerCurrent = sP[1];
                            normalsLayer = sP[2];
                            intensityLayer = sP[3];
                            break;
                        case 2:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            // sP = polygonProperties(vertices, indices, normals, intensities, a2, a5, a3);
                            // vertices = sP[0];
                            // indices = sP[1];
                            // normals = sP[2];
                            // intensities = sP[3];
                            sP = polygonProperties(vertexLayerCurrent, indexLayerCurrent, normalsLayer, intensityLayer, a2, a5, a3);
                            vertexLayerCurrent = sP[0];
                            indexLayerCurrent = sP[1];
                            normalsLayer = sP[2];
                            intensityLayer = sP[3];
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
                            sP = flatPolygonProperties(vertices, indices, normals, intensities, a1, a3, a2, a4);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            break;
                        case 4:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a2.push(shape[a2[0]][a2[1]][a2[2]]);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a3.push(shape[a3[0]][a3[1]][a3[2]]);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a5.push(shape[a5[0]][a5[1]][a5[2]]);
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a5, a3);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a1, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a8, a3);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a3, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a1, a7);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a7, a3);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a4, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a8, a2);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a7, a2);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a7, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a6, a4);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a4, a7);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a4, a6, a7);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a7, a6);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a3, a4);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a3, a2, a5);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a3, a4);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a4, a6);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a5, a3);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a6, a5);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a8, a3);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a5, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a3, a8, a5);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a3, a2, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a1, a7);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a7, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a3, a4, a5);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a4, a6, a5);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a2, a5, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a5, a3, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
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
                            sP = polygonProperties(vertices, indices, normals, intensities, a1, a6, a4);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            sP = polygonProperties(vertices, indices, normals, intensities, a3, a8, a5);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            break;
                        case 18:
                            // [[[1, 1], [1, 1]], [[1, 1], [1, 0]]], //#18 Empty corner
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a4.push(shape[a4[0]][a4[1]][a4[2]]);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a6.push(shape[a6[0]][a6[1]][a6[2]]);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a7.push(shape[a7[0]][a7[1]][a7[2]]);
                            sP = polygonProperties(vertices, indices, normals, intensities, a4, a6, a7);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            intensities = sP[3];
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        // Add current layer to main array
        for (let i = 0; i < vertexLayerCurrent.length; i++) {
            console.log(vertexLayerPrevious);
            console.log(vertexLayerCurrent[i]);
            console.log(vertexLayerPrevious.containsArray(vertexLayerCurrent[i]));
            if (!vertexLayerPrevious.containsArray(vertexLayerCurrent[i])) {
                vertices.push(vertexLayerCurrent[i]);
                normals.push(normalsLayer[i]);
                intensities.push(intensityLayer[i]);
            }
        }
        for (let i = 0; i < indexLayerCurrent.length; i++) {
            if (!indexLayerPrevious.containsArray(indexLayerCurrent[i])) {
                console.log(indexLayerCurrent[i]);
                indices.push(indexLayerCurrent[i]);
            }
        }

        // Updates previous layer
        vertexLayerPrevious = [];
        for (let i = 0; i < vertexLayerCurrent.length; i++) {
            vertexLayerPrevious.push(vertexLayerCurrent[i]);
        }
        indexLayerPrevious = [];
        for (let i = 0; i < indexLayerCurrent.length; i++) {
            indexLayerPrevious.push(indexLayerCurrent[i]);
        }
        console.log(vertexLayerPrevious);
        console.log(indexLayerPrevious);
        console.log(("Vertices: " + z / (shape.length - 2) * 100) + "%");
    }
    console.log("Building vertices: Done");
    console.log(vertices);
    console.log(indices);
    console.log(normals);
    console.log(intensities);

    normals = setNormals(vertices, indices, normals);
    // vertices = shapeSmoothing(vertices, normals, intensities);
    // normals = setNormals(vertices, indices, normals);

    // console.log(vertices);
    // console.log(normals);
    // console.log(vertices.length);
    // console.log(indices);
    return [vertices, indices, normals];
}
function polygonProperties(vArray, iArray, nArray, intensities, vt1, vt2, vt3) {
    let props = [];

    //Filters out Intensity value
    let v1 = [vt1[0], vt1[1], vt1[2]];
    let v2 = [vt2[0], vt2[1], vt2[2]];
    let v3 = [vt3[0], vt3[1], vt3[2]];

    if (!vArray.containsArray(v1)) {
        vArray.push(v1);
        nArray.push([0, 0, 0]);
        intensities.push(vt1[3]);
    }
    if (!vArray.containsArray(v2)) {
        vArray.push(v2);
        nArray.push([0, 0, 0]);
        intensities.push(vt2[3]);
    }
    if (!vArray.containsArray(v3)) {
        vArray.push(v3);
        nArray.push([0, 0, 0]);
        intensities.push(vt3[3]);
    }

    let i1 = vArray.indexOfArray(v1);
    let i2 = vArray.indexOfArray(v2);
    let i3 = vArray.indexOfArray(v3);

    //Prevents creation of identical polygons, needs to do 6 checks due to 6 different index combinations
    if (!iArray.containsArray([i1, i2, i3]) && !iArray.containsArray([i1, i3, i2]) && !iArray.containsArray([i2, i1, i3]) && !iArray.containsArray([i2, i3, i1]) && !iArray.containsArray([i3, i1, i2]) && !iArray.containsArray([i3, i2, i1])) {
        iArray.push([i1, i2, i3]);
    }

    props.push(vArray);
    props.push(iArray);
    props.push(nArray);
    props.push(intensities);
    // console.log(props);
    return props;
}
function flatPolygonProperties(vArray, iArray, nArray, intensities, vt1, vt2, vt3, vt4) {
    let props = [];

    //Filters out Intensity value
    let v1 = [vt1[0], vt1[1], vt1[2]];
    let v2 = [vt2[0], vt2[1], vt2[2]];
    let v3 = [vt3[0], vt3[1], vt3[2]];
    let v4 = [vt4[0], vt4[1], vt4[2]];

    if (!vArray.containsArray(v1)) {
        vArray.push(v1);
        nArray.push([0, 0, 0]);
        intensities.push(vt1[3]);
    }
    if (!vArray.containsArray(v2)) {
        vArray.push(v2);
        nArray.push([0, 0, 0]);
        intensities.push(vt2[3]);
    }
    if (!vArray.containsArray(v3)) {
        vArray.push(v3);
        nArray.push([0, 0, 0]);

        intensities.push(vt3[3]);
    }
    if (!vArray.containsArray(v4)) {
        vArray.push(v4);
        nArray.push([0, 0, 0]);
        intensities.push(vt4[3]);
    }

    let i1 = vArray.indexOfArray(v1);
    let i2 = vArray.indexOfArray(v2);
    let i3 = vArray.indexOfArray(v3);
    let i4 = vArray.indexOfArray(v4);

    //Prevents creation of identical polygons, needs to do 18 checks due to 18 different index combinations
    if (
        !iArray.containsArray([i1, i2, i3]) && !iArray.containsArray([i1, i3, i2]) &&
        !iArray.containsArray([i2, i1, i3]) && !iArray.containsArray([i2, i3, i1]) &&
        !iArray.containsArray([i3, i1, i2]) && !iArray.containsArray([i3, i2, i1]) &&

        !iArray.containsArray([i1, i2, i4]) && !iArray.containsArray([i1, i4, i2]) &&
        !iArray.containsArray([i2, i1, i4]) && !iArray.containsArray([i2, i4, i1]) &&
        !iArray.containsArray([i4, i1, i2]) && !iArray.containsArray([i4, i2, i1]) &&

        !iArray.containsArray([i1, i3, i4]) && !iArray.containsArray([i1, i4, i3]) &&
        !iArray.containsArray([i3, i1, i4]) && !iArray.containsArray([i3, i4, i1]) &&
        !iArray.containsArray([i4, i1, i3]) && !iArray.containsArray([i4, i3, i1])
    ) {
        iArray.push([i1, i2, i3]);
        iArray.push([i3, i2, i4]);
    }

    props.push(vArray);
    props.push(iArray);
    props.push(nArray);
    props.push(intensities);
    // console.log(props);
    return props;
}
function setNormals(vArray, iArray, nArray) {
    console.log("Setting Normals: Start");
    for (let i = 0; i < vArray.length; i++) {
        let vertexNormalsRaw = [];
        for (let j = 0; j < iArray.length; j++) {
            for (let k = 0; k < iArray[j].length; k++) {
                if (iArray[j][k] === i) {
                    let v1 = vArray[iArray[j][0]];
                    let v2 = vArray[iArray[j][1]];
                    let v3 = vArray[iArray[j][2]];
                    let n = calculateNormals(v1, v2, v3);
                    // console.log(n);
                    vertexNormalsRaw.push(n);


                    // let nCalc = [
                    //     nArray[i][0] + n[0],
                    //     nArray[i][1] + n[1],
                    //     nArray[i][2] + n[2]
                    // ];
                    // nArray[i] = Math.unitVector(nCalc[0], nCalc[1], nCalc[2]);
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
        // console.log(vertexNormalsRaw);
        // console.log(vertexNormalsFormated);

        // Add normals together
        let vertexNormalSum = [0, 0, 0];
        for (let x = 0; x < vertexNormalsFormated.length; x++) {
            vertexNormalSum[0] = vertexNormalSum[0] + vertexNormalsFormated[x][0];
            vertexNormalSum[1] = vertexNormalSum[1] + vertexNormalsFormated[x][1];
            vertexNormalSum[2] = vertexNormalSum[2] + vertexNormalsFormated[x][2];
        }
        // console.log(vertexNormalSum);

        // Calculate Normal to Unit Vector
        nArray[i] = Math.unitVector(vertexNormalSum[0], vertexNormalSum[1], vertexNormalSum[2]);
        // console.log("Normals: " + (i / (vArray.length - 1) * 100 + "%"));
    }
    console.log("Setting Normals: Done");
    // console.log(vArray);
    // console.log(iArray);
    // console.log(nArray);
    return nArray;
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
    // console.log(n);

    //Normal Length Adjustment
    let x = [];
    let n1 = n[0];
    let n2 = n[1];
    let n3 = n[2];
    // let n1 = n[0] / (Math.tangent3d(n[0], n[1], n[2]));
    // let n2 = n[1] / (Math.tangent3d(n[0], n[1], n[2]));
    // let n3 = n[2] / (Math.tangent3d(n[0], n[1], n[2]));
    x.push(n1);
    x.push(n2);
    x.push(n3);
    return x;
}

//####################################################################
//  Smoothing Functions
//####################################################################

function shapeSmoothing(vArray, nArray, intensities) {
    // for (let i = 0; i < vArray.length; i++) {
    //     if (intensities[i] > 0.15) {
    //         console.log(vArray[i]);
    //         console.log(nArray[i]);
    //         console.log(intensities[i]);
    //     }
    // }

    let nVArray = []

    console.log(intensities);
    for (let i = 0; i < vArray.length; i++) {
        let intensity = intensities[i];

        // vArray[i][0] = vArray[i][0] - (nArray[i][0] * (1 - intensity));
        // vArray[i][1] = vArray[i][1] - (nArray[i][1] * (1 - intensity));
        // vArray[i][2] = vArray[i][2] - (nArray[i][2] * (1 - intensity));

        //full adjust
        // nVArray.push([
        //     vArray[i][0] + ((nArray[i][2] * (1 - intensity))),
        //     vArray[i][1] + ((nArray[i][1] * (1 - intensity))),
        //     vArray[i][2] + ((nArray[i][0] * (1 - intensity)))
        // ]);

        //half adjust
        nVArray.push([
            vArray[i][0] + ((nArray[i][2] * (1 - intensity)) / 2),
            vArray[i][1] + ((nArray[i][1] * (1 - intensity)) / 2),
            vArray[i][2] + ((nArray[i][0] * (1 - intensity)) / 2)
        ]);

        //test adjust
        // nVArray.push([
        //     vArray[i][0] + nArray[i][2],
        //     vArray[i][1] + nArray[i][1],
        //     vArray[i][2] + nArray[i][0]
        // ]);
    }
    return nVArray;
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

function writeObjFile(vertices, indices, normals) {
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

    download(objString, 'test.obj', 'text');
}





// let a = [1, 1, 1];
// let b = a;
// let c = [a[0], a[1], a[2]];
// a[1] = 0;
// console.log(a);
// console.log(b);
// console.log(c);
// c = [];
// for (let i = 0; i < a.length; i++) {
//     c.push(a[i]);
// }
// console.log(c);



// let abc = [];
// for(let i = 0; i < 10000000; i++){
//     abc.push(i);
//     // abc = increaseAbc(abc, i);
//     if(i % 100 === 0){
//         console.log(i);
//     }
// }

// function increaseAbc(abc, i){
//     abc.push(i);
//     return abc;
// }





