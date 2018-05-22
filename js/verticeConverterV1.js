//List of types of pieces
let pieceList = [
    // 3
    [[[1, 1], [1, 0]], [[0, 0], [0, 0]]], //#0 Flat side
    [[[1, 1], [0, 0]], [[0, 0], [1, 0]]], //#1 Single Diagonal
    [[[0, 1], [1, 0]], [[1, 0], [0, 0]]], //#2 Double Diagonal
    // 4
    [[[1, 1], [1, 1]], [[0, 0], [0, 0]]], //#3 Flat side
    [[[1, 1], [1, 0]], [[1, 0], [0, 0]]], //#4 Corner Piece
    [[[1, 1], [1, 0]], [[0, 0], [0, 1]]], //#5 Curved
    [[[1, 1], [1, 0]], [[0, 0], [1, 0]]], //#6 S-Shape
    [[[1, 1], [0, 1]], [[0, 0], [0, 1]]], //#7 S-Shape reverse
    [[[1, 1], [0, 0]], [[0, 0], [1, 1]]], //#8 Slope
    [[[1, 0], [0, 1]], [[0, 1], [1, 0]]], //#9 V-shape/3-corner Pyramid
    // 5 - All 5s are inverse of 3s
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

// filters for intensity
let intensity = 0;

//####################################################################
//  Main functions
//####################################################################

//####################################################################
//  Create Polygons
//####################################################################

function buildVertices(shape) {
    let vertices = [];
    let indices = [];
    let normals = [];
    for (let z = 0; z < shape.length - 1; z++) {
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
                if (v1 > intensity) {
                    sum++;
                }
                if (v2 > intensity) {
                    sum++;
                }
                if (v3 > intensity) {
                    sum++;
                }
                if (v4 > intensity) {
                    sum++;
                }
                if (v5 > intensity) {
                    sum++;
                }
                if (v6 > intensity) {
                    sum++;
                }
                if (v7 > intensity) {
                    sum++;
                }
                if (v8 > intensity) {
                    sum++;
                }
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
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            sP = polygonProperties(vertices, indices, normals, a1, a3, a2);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            // normals = addNormals(vertices, normals, a1, a2, a3, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a3);
                            // indices = addIndices(vertices, indices, normals, a1, a3, a2);
                            break;
                        case 1:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            sP = polygonProperties(vertices, indices, normals, a1, a7, a2);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            // normals = addNormals(vertices, normals, a1, a2, a7, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a7);
                            // indices = addIndices(vertices, indices, normals, a1, a2, a7);
                            break;
                        case 2:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            sP = polygonProperties(vertices, indices, normals, a2, a5, a3);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            // normals = addNormals(vertices, normals, a3, a2, a5, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a3, a2, a5);
                            // indices = addIndices(vertices, indices, normals, a3, a2, a5);
                            break;
                        case 3:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            sP = flatPolygonProperties(vertices, indices, normals, a1, a2, a3, a4);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            // normals = addNormals(vertices, normals, a1, a3, a2, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a3);
                            // normals = addNormals(vertices, normals, a4, a2, a3, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a2, a3, a4);
                            // indices = addFlatSideIndices(vertices, indices, normals, a1, a2, a3, a4);
                            // indices = addFlatSideIndices(vertices, indices, normals, a2, a3, a4, a1);
                            break;
                        case 4:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            sP = polygonProperties(vertices, indices, normals, a2, a5, a3);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            // normals = addNormals(vertices, normals, a3, a2, a5, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a3, a2, a5);
                            // indices = addIndices(vertices, indices, normals, a3, a2, a5);
                            break;
                        case 5:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a1, a2, a3, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a3);
                            // normals = addNormals(vertices, normals, a3, a2, a8, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a3, a2, a8);
                            // indices = addIndices(vertices, indices, normals, a1, a2, a3);
                            // indices = addIndices(vertices, indices, normals, a3, a2, a8);
                            break;
                        case 6:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            sP = polygonProperties(vertices, indices, normals, a2, a1, a7);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            sP = polygonProperties(vertices, indices, normals, a2, a7, a3);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            // normals = addNormals(vertices, normals, a1, a2, a3, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a3);
                            // normals = addNormals(vertices, normals, a3, a2, a7, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a3, a2, a7);
                            // indices = addIndices(vertices, indices, normals, a1, a2, a3);
                            // indices = addIndices(vertices, indices, normals, a3, a2, a7);
                            break;
                        case 7:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            sP = polygonProperties(vertices, indices, normals, a1, a4, a8);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            sP = polygonProperties(vertices, indices, normals, a1, a8, a2);
                            vertices = sP[0];
                            indices = sP[1];
                            normals = sP[2];
                            // normals = addNormals(vertices, normals, a1, a2, a4, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a4);
                            // normals = addNormals(vertices, normals, a4, a1, a8, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a4, a1, a8);
                            // indices = addIndices(vertices, indices, normals, a1, a2, a4);
                            // indices = addIndices(vertices, indices, normals, a4, a1, a8);
                            break;
                        case 8:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a1, a2, a7, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a7);
                            // normals = addNormals(vertices, normals, a7, a2, a8, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a7, a2, a8);
                            // indices = addIndices(vertices, indices, normals, a1, a2, a7);
                            // indices = addIndices(vertices, indices, normals, a7, a2, a8);
                            break;
                        case 9:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a1, a4, a7, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a4, a7);
                            // normals = addNormals(vertices, normals, a7, a4, a6, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a7, a4, a6);
                            // normals = addNormals(vertices, normals, a1, a4, a6, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a4, a6);
                            // normals = addNormals(vertices, normals, a1, a7, a6, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a7, a6);
                            // indices = addIndices(vertices, indices, normals, a1, a4, a7);
                            // indices = addIndices(vertices, indices, normals, a7, a4, a6);
                            // indices = addIndices(vertices, indices, normals, a1, a4, a6);
                            // indices = addIndices(vertices, indices, normals, a1, a7, a6);
                            break;
                        case 10:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a2, a4, a5, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a2, a4, a5);
                            // normals = addNormals(vertices, normals, a5, a4, a3, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a5, a4, a3);
                            // indices = addIndices(vertices, indices, normals, a2, a4, a5);
                            // indices = addIndices(vertices, indices, normals, a5, a4, a3);
                            break;
                        case 11:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a1, a3, a6, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a3, a6);
                            // normals = addNormals(vertices, normals, a6, a3, a4, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a6, a3, a4);
                            // indices = addIndices(vertices, indices, normals, a1, a3, a6);
                            // indices = addIndices(vertices, indices, normals, a6, a3, a4);
                            break;
                        case 12:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a2, a3, a6, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a2, a3, a6);
                            // normals = addNormals(vertices, normals, a6, a3, a5, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a6, a3, a5);
                            // indices = addIndices(vertices, indices, normals, a2, a3, a6);
                            // indices = addIndices(vertices, indices, normals, a6, a3, a5);
                            break;
                        case 13:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a2, a3, a8, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a2, a3, a8);
                            // normals = addNormals(vertices, normals, a8, a2, a5, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a8, a2, a5);
                            // normals = addNormals(vertices, normals, a8, a5, a3, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a8, a5, a3);
                            // indices = addIndices(vertices, indices, normals, a2, a3, a8);
                            // indices = addIndices(vertices, indices, normals, a8, a2, a5);
                            // indices = addIndices(vertices, indices, normals, a8, a5, a3);
                            break;
                        case 14:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a1, a2, a8, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a8);
                            // normals = addNormals(vertices, normals, a8, a1, a7, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a8, a1, a7);
                            // normals = addNormals(vertices, normals, a3, a2, a8, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a3, a2, a8);
                            // indices = addIndices(vertices, indices, normals, a1, a2, a8);
                            // indices = addIndices(vertices, indices, normals, a8, a1, a7);
                            // indices = addIndices(vertices, indices, normals, a3, a2, a8);
                            break;
                        case 15:
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a3, a4, a5, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a3, a4, a5);
                            // normals = addNormals(vertices, normals, a5, a4, a6, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a5, a4, a6);
                            // indices = addIndices(vertices, indices, normals, a3, a4, a5);
                            // indices = addIndices(vertices, indices, normals, a5, a4, a6);
                            break;
                        case 16:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a2, a5, a8, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a2, a5, a8);
                            // normals = addNormals(vertices, normals, a8, a5, a3, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a8, a5, a3);
                            // indices = addIndices(vertices, indices, normals, a2, a5, a8);
                            // indices = addIndices(vertices, indices, normals, a8, a5, a3);
                            break;
                        case 17:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a1, a4, a6, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a4, a6);
                            // normals = addNormals(vertices, normals, a3, a5, a8, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a3, a5, a8);
                            // indices = addIndices(vertices, indices, normals, a1, a4, a6);
                            // indices = addIndices(vertices, indices, normals, a3, a5, a8);
                            break;
                        case 18:
                            // [[[1, 1], [1, 1]], [[1, 1], [1, 0]]], //#18 Empty corner
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a6 = fixVerticeRotation(a6, 6, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            // normals = addNormals(vertices, normals, a4, a6, a7, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a4, a6, a7);
                            // indices = addIndices(vertices, indices, normals, a4, a6, a7);
                            break;
                        default:
                            break;
                    }
                }
                // progressText.innerHTML = (z / shape.length) * 100 + (y / shape.length) * 100 + (x / shape.length) * 100 + "%";
            }
            // progressText.innerHTML = (z / shape.length) * 100 + "%";
        }
        // document.getElementById("progressText").innerHTML = (z / (shape.length - 2)) * 100 + "%";
    }
    // console.log(vertices);
    // console.log(indices);
    // normals = getNormals(vertices, indices);
    // console.log(normals);
    normals = adjustNormals(normals, indices, vertices);
    // console.log(normals);
    // console.log(vertices.length);
    // console.log(indices);
    return [vertices, indices, normals];
}

function polygonProperties(vArray, iArray, nArray, v1, v2, v3) {
    let props = [];
    if (!vArray.containsArray(v1)) {
        vArray.push(v1);
        nArray.push([0, 0, 0]);
    }
    if (!vArray.containsArray(v2)) {
        vArray.push(v2);
        nArray.push([0, 0, 0]);
    }
    if (!vArray.containsArray(v3)) {
        vArray.push(v3);
        nArray.push([0, 0, 0]);
    }

    let i1 = vArray.indexOfArray(v1);
    let i2 = vArray.indexOfArray(v2);
    let i3 = vArray.indexOfArray(v3);

    //Prevents creation of identical polygons, needs to do 6 checks due to 6 different index combinations
    if (!iArray.containsArray([i1, i2, i3]) && !iArray.containsArray([i1, i3, i2]) && !iArray.containsArray([i2, i1, i3]) && !iArray.containsArray([i2, i3, i1]) && !iArray.containsArray([i3, i1, i2]) && !iArray.containsArray([i3, i2, i1])) {
        iArray.push([i1, i2, i3]);
        let n = calculateNormals(v1, v2, v3);
        console.log(n);
        nArray[i1] = [nArray[i1][0] + n[0], nArray[i1][1] + n[1], nArray[i1][2] + n[2]];
        nArray[i2] = [nArray[i2][0] + n[0], nArray[i2][1] + n[1], nArray[i2][2] + n[2]];
        nArray[i3] = [nArray[i3][0] + n[0], nArray[i3][1] + n[1], nArray[i3][2] + n[2]];
    }

    props.push(vArray);
    props.push(iArray);
    props.push(nArray);
    console.log(props);
    return props;
}
function flatPolygonProperties(vArray, iArray, nArray, v1, v2, v3, v4) {
    let props = [];
    if (!vArray.containsArray(v1)) {
        vArray.push(v1);
        nArray.push([0, 0, 0]);
    }
    if (!vArray.containsArray(v2)) {
        vArray.push(v2);
        nArray.push([0, 0, 0]);
    }
    if (!vArray.containsArray(v3)) {
        vArray.push(v3);
        nArray.push([0, 0, 0]);
    }
    if (!vArray.containsArray(v4)) {
        vArray.push(v4);
        nArray.push([0, 0, 0]);
    }

    let i1 = vArray.indexOfArray(v1);
    let i2 = vArray.indexOfArray(v2);
    let i3 = vArray.indexOfArray(v3);
    let i4 = vArray.indexOfArray(v4);

    //Prevents creation of identical polygons, needs to do 6 checks due to 6 different index combinations
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
        let n = calculateNormals(v1, v2, v3);
        let n1 = calculateNormals(v3, v2, v4);
        console.log(n);
        nArray[i1] = [nArray[i1][0] + n[0], nArray[i1][1] + n[1], nArray[i1][2] + n[2]];
        nArray[i2] = [nArray[i2][0] + n[0], nArray[i2][1] + n[1], nArray[i2][2] + n[2]];
        nArray[i3] = [nArray[i3][0] + n[0], nArray[i3][1] + n[1], nArray[i3][2] + n[2]];

        nArray[i2] = [nArray[i1][0] + n[0], nArray[i1][1] + n[1], nArray[i1][2] + n[2]];
        nArray[i3] = [nArray[i2][0] + n[0], nArray[i2][1] + n[1], nArray[i2][2] + n[2]];
        nArray[i4] = [nArray[i3][0] + n[0], nArray[i3][1] + n[1], nArray[i3][2] + n[2]];
    }

    props.push(vArray);
    props.push(iArray);
    props.push(nArray);
    console.log(props);
    return props;
}


function addVertex(vArray, v1, v2, v3) {
    if (!vArray.containsArray(v1)) {
        vArray.push(v1);
    }
    if (!vArray.containsArray(v2)) {
        vArray.push(v2);
    }
    if (!vArray.containsArray(v3)) {
        vArray.push(v3);
    }
    return vArray;
}
function addVertex2(vArray, v1, v2, v3) {
    vArray.push(v1);
    vArray.push(v2);
    vArray.push(v3);
    return vArray;
}
function addNormals(vArray, nArray, v1, v2, v3, zRot, yRot, xRot) {
    let n = calculateNormals(v1, v2, v3);
    let i = 0;

    // let nRot = [n[0], n[1], n[2]];
    // console.log(n);
    // console.log("Zr: " + zRot + " Yr: " + yRot + " Xr: " + xRot);
    // switch (zRot) {
    //     case 1:
    //         nRot[1] = n[2];
    //         nRot[2] = -n[1];
    //         break;
    //     case 2:
    //         n[1] = -nRot[1];
    //         n[2] = -nRot[2];
    //         break;
    //     case 3:
    //         nRot[1] = -n[2];
    //         nRot[2] = n[1];
    //         break;
    //     default:
    //         break;
    // }
    // switch (yRot) {
    //     case 1:
    //         nRot[0] = n[2];
    //         nRot[2] = -n[0];
    //         break;
    //     case 2:
    //         nRot[0] = -nRot[0];
    //         nRot[2] = -nRot[2];
    //         break;
    //     case 3:
    //         nRot[0] = -n[2];
    //         nRot[2] = n[0];
    //         break;
    //     default:
    //         break;
    // }
    // switch (xRot) {
    //     case 1:
    //         nRot[1] = n[0];
    //         nRot[0] = -n[1];
    //         break;
    //     case 2:
    //         nRot[0] = -nRot[0];
    //         nRot[1] = -nRot[1];
    //         break;
    //     case 3:
    //         nRot[1] = -n[0];
    //         nRot[0] = n[1];
    //         break;
    //     default:
    //         break;
    // }
    // console.log(nRot);

    // n = [nRot[0], nRot[1], nRot[2]];
    if (!vArray.containsArray(v1)) {
        nArray.push(n);
    }
    else {
        i = vArray.indexOfArray(v1);
        n[0] += nArray[i][0];
        n[1] += nArray[i][1];
        n[2] += nArray[i][2];
        nArray[i] = n;
    }
    if (!vArray.containsArray(v2)) {
        nArray.push(n);
    }
    else {
        i = vArray.indexOfArray(v2);
        n[0] += nArray[i][0];
        n[1] += nArray[i][1];
        n[2] += nArray[i][2];
        nArray[i] = n;
    }
    if (!vArray.containsArray(v3)) {
        nArray.push(n);
    }
    else {
        i = vArray.indexOfArray(v3);
        n[0] += nArray[i][0];
        n[1] += nArray[i][1];
        n[2] += nArray[i][2];
        nArray[i] = n;
    }
    // console.log(nArray);
    return nArray;
}
function addNormals2(vArray, nArray, v1, v2, v3, zRot, yRot, xRot) {
    let n = calculateNormals(v1, v2, v3);
    let i = 0;

    let nRot = [n[0], n[1], n[2]];

    n = [nRot[0], nRot[1], nRot[2]];
    if (!vArray.containsArray(v1)) {
        nArray.push(n);
    }
    else {
        i = vArray.indexOfArray(v1);
        n[0] += nArray[i][0];
        n[1] += nArray[i][1];
        n[2] += nArray[i][2];
        nArray[i] = n;
    }
    if (!vArray.containsArray(v2)) {
        nArray.push(n);
    }
    else {
        i = vArray.indexOfArray(v2);
        n[0] += nArray[i][0];
        n[1] += nArray[i][1];
        n[2] += nArray[i][2];
        nArray[i] = n;
    }
    if (!vArray.containsArray(v3)) {
        nArray.push(n);
    }
    else {
        i = vArray.indexOfArray(v3);
        n[0] += nArray[i][0];
        n[1] += nArray[i][1];
        n[2] += nArray[i][2];
        nArray[i] = n;
    }
    // console.log(nArray);
    return nArray;
}
function getNormals(vArray, iArray) {
    let nArray = [];
    for (let i = 0; i < iArray.length; i++) {
        let i1 = iArray[i][0];
        let i2 = iArray[i][1];
        let i3 = iArray[i][2];

        let v1 = vArray[i1];
        let v2 = vArray[i2];
        let v3 = vArray[i3];

        nArray = addNormals2(vArray, nArray, v1, v2, v3);
    }
    return nArray;
}

//####################################################################
//  Calculates Normals
//####################################################################
function calculateNormals(a, c, b) {

    //Calculate vector
    let vAC = [a[2] - c[2], a[1] - c[1], a[0] - c[0]];
    let vBC = [b[2] - c[2], b[1] - c[1], b[0] - c[0]];

    //Polygon Normal
    let n = Math.cross(vAC, vBC);
    // console.log(n);

    //Normal Length Adjustment
    let x = [];
    // let n1 = n[0];
    // let n2 = n[1];
    // let n3 = n[2];
    let n1 = n[0] / (Math.tangent3d(n[0], n[1], n[2]));
    let n2 = n[1] / (Math.tangent3d(n[0], n[1], n[2]));
    let n3 = n[2] / (Math.tangent3d(n[0], n[1], n[2]));
    x.push(n1);
    x.push(n2);
    x.push(n3);
    return x;
}
function adjustNormals(nArray, iArray, vArray) {
    let nA = [];
    for (let i = 0; i < nArray.length; i++) {
        let usageCount = 0;
        for (let j = 0; j < iArray.length; j++) {
            for (let k = 0; k < iArray[j].length; k++) {
                if (iArray[j][k] === i) {
                    usageCount++
                }
            }
        }
        let n1 = nArray[i][0] / usageCount;
        let n2 = nArray[i][1] / usageCount;
        let n3 = nArray[i][2] / usageCount;
        n1 = n1 / (Math.tangent3d(n1, n2, n3));
        n2 = n2 / (Math.tangent3d(n1, n2, n3));
        n3 = n3 / (Math.tangent3d(n1, n2, n3));
        nA.push([n1, n2, n3]);
        // console.log(usageCount);
    }
    return nA;
}
function addIndices(vArray, iArray, nArray, v1, v2, v3) {
    let i1 = vArray.indexOfArray(v1);
    let i2 = vArray.indexOfArray(v2);
    let i3 = vArray.indexOfArray(v3);
    //Prevents creation of identical polygons, needs to do 6 checks due to 6 different index combinations
    if (!iArray.containsArray([i1, i2, i3]) && !iArray.containsArray([i1, i3, i2]) && !iArray.containsArray([i2, i1, i3]) && !iArray.containsArray([i2, i3, i1]) && !iArray.containsArray([i3, i1, i2]) && !iArray.containsArray([i3, i2, i1])) {
        iArray.push([i1, i2, i3]);
    }
    // else {
    //     console.log("index dupe found");
    // }
    return iArray;
}

//Special function for a flatsided polygon, prevents overlapping

function addFlatSideIndices(vArray, iArray, nArray, v1, v2, v3, v4) {
    let i1 = vArray.indexOfArray(v1);
    let i2 = vArray.indexOfArray(v2);
    let i3 = vArray.indexOfArray(v3);
    let i4 = vArray.indexOfArray(v4);

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
    }
    // else {
    //     console.log("index dupe/overlap found");
    // }
    return iArray;
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
    // let vstr = "vertex:  z:" + vertex[0] + " y:" + vertex[1] + " x:" + vertex[2];
    // // console.log(vstr);
    // let str = "Rotation: z:" + zRot + " y:" + yRot + " x:" + xRot;
    // console.log(str);

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


//Junk functions, delete later

function possibleOutcomes() {
    let counter = 0;
    for (let a0 = 0; a0 < 2; a0++) {
        for (let a1 = 0; a1 < 2; a1++) {
            for (let a2 = 0; a2 < 2; a2++) {
                for (let a3 = 0; a3 < 2; a3++) {
                    for (let a4 = 0; a4 < 2; a4++) {
                        for (let a5 = 0; a5 < 2; a5++) {
                            for (let a6 = 0; a6 < 2; a6++) {
                                for (let a7 = 0; a7 < 2; a7++) {
                                    if (a0 + a1 + a2 + a3 + a4 + a5 + a6 + a7 > 2 && a0 + a1 + a2 + a3 + a4 + a5 + a6 + a7 < 6) {
                                        counter++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(counter);
}
// possibleOutcomes();


function mCube(shape, z, y, x) {
    let x0 = shape[z][y][x];
    let x1 = shape[z][y][x - 1];
    let x2 = shape[z][y][x + 1];
    let y1 = shape[z][y - 1][x];
    let y2 = shape[z][y + 1][x];
    let z1 = shape[z - 1][y][x];
    let z2 = shape[z + 2][y][x];
}