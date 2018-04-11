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
    [[[1, 0], [1, 1]], [[1, 0], [0, 0]]], //#7 S-Shape reverse
    [[[1, 1], [0, 0]], [[0, 0], [1, 1]]], //#8 Slope
    // 5 - All 5s are inverse of 3s
    [[[1, 1], [1, 1]], [[1, 0], [0, 0]]], //#9 Flat with one extra, inverse Flat side polygon
    [[[1, 1], [1, 0]], [[1, 1], [0, 0]]], //#10 Corner and Line, inverse Single Diagonal polygon
    [[[1, 1], [1, 0]], [[1, 0], [0, 1]]], //#11 Corner and Diagonal Line, inverse Double Diagonal polygon
    // 6
    [[[1, 1], [1, 1]], [[1, 1], [0, 0]]], //#12 Stairs
    [[[1, 1], [1, 1]], [[1, 0], [0, 1]]], //#13 Stairs - Broken
    // 7
    [[[1, 1], [1, 1]], [[1, 1], [1, 0]]], //#14 Empty corner
];

// filters for intensity
let intensity = 0;

//####################################################################
//  Main functions
//####################################################################

function voxelToVertice2d(shape) {
    let vertices = [];
    let indices = [];
    let indexNr = 0;
    for (let z = 0; z < shape.length; z++) {
        for (let y = 1; y < shape[z].length - 1; y++) {
            for (let x = 1; x < shape[z][y].length - 1; x++) {

                let v1 = shape[z][y][x - 1];
                let v2 = shape[z][y][x];
                let v3 = shape[z][y + 1][x - 1];
                let v4 = shape[z][y + 1][x];

                let a1 = [z, y, (x - 1)];
                let a2 = [z, y, x];
                let a3 = [z, (y + 1), (x - 1)];
                let a4 = [z, (y + 1), x];

                if (v1 === 1) {
                    if (v2 === 1 && v3 === 1) {
                        if (!vertices.containsArray(a1)) {
                            vertices.push(a1);
                        }
                        if (!vertices.containsArray(a2)) {
                            vertices.push(a2);
                        }
                        if (!vertices.containsArray(a3)) {
                            vertices.push(a3);
                        }
                        indices.push(vertices.containsArrayIndex(a1));
                        indices.push(vertices.containsArrayIndex(a2));
                        indices.push(vertices.containsArrayIndex(a3));
                        if (v4 === 1) {
                            if (!vertices.containsArray(a2)) {
                                vertices.push(a2);
                            }
                            if (!vertices.containsArray(a3)) {
                                vertices.push(a3);
                            }
                            if (!vertices.containsArray(a4)) {
                                vertices.push(a4);
                            }
                            indices.push(vertices.containsArrayIndex(a3));
                            indices.push(vertices.containsArrayIndex(a2));
                            indices.push(vertices.containsArrayIndex(a4));
                        }
                    } else if (v2 === 1 && v4 === 1) {
                        if (!vertices.containsArray(a1)) {
                            vertices.push(a1);
                        }
                        if (!vertices.containsArray(a2)) {
                            vertices.push(a2);
                        }
                        if (!vertices.containsArray(a4)) {
                            vertices.push(a4);
                        }
                        indices.push(vertices.containsArrayIndex(a1));
                        indices.push(vertices.containsArrayIndex(a2));
                        indices.push(vertices.containsArrayIndex(a4));
                    } else if (v3 === 1 && v4 === 1) {
                        if (!vertices.containsArray(a1)) {
                            vertices.push(a1);
                        }
                        if (!vertices.containsArray(a3)) {
                            vertices.push(a3);
                        }
                        if (!vertices.containsArray(a4)) {
                            vertices.push(a4);
                        }
                        indices.push(vertices.containsArrayIndex(a1));
                        indices.push(vertices.containsArrayIndex(a4));
                        indices.push(vertices.containsArrayIndex(a3));
                    }
                } else if (v2 === 1) {
                    if (v3 === 1 && v4 === 1) {
                        if (!vertices.containsArray(a2)) {
                            vertices.push(a2);
                        }
                        if (!vertices.containsArray(a3)) {
                            vertices.push(a3);
                        }
                        if (!vertices.containsArray(a4)) {
                            vertices.push(a4);
                        }
                        indices.push(vertices.containsArrayIndex(a3));
                        indices.push(vertices.containsArrayIndex(a2));
                        indices.push(vertices.containsArrayIndex(a4));
                    }
                }
            }
        }
    }
    // console.log(vertices);
    return [vertices, indices];
}

function voxelToVertice3d(shape) {
    let vertices = [];
    let indices = [];
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
                if (v1 === 1) {
                    sum++
                }
                if (v2 === 1) {
                    sum++
                }
                if (v3 === 1) {
                    sum++
                }
                if (v4 === 1) {
                    sum++
                }
                if (v5 === 1) {
                    sum++
                }
                if (v6 === 1) {
                    sum++
                }
                if (v7 === 1) {
                    sum++
                }
                if (v8 === 1) {
                    sum++
                }

                if (sum > 2) {
                    let a1 = [z, y, (x - 1)];
                    let a2 = [z, y, x];
                    let a3 = [z, (y + 1), (x - 1)];
                    let a4 = [z, (y + 1), x];
                    let a5 = [z + 1, y, (x - 1)];
                    let a6 = [z + 1, y, x];
                    let a7 = [z + 1, (y + 1), (x - 1)];
                    let a8 = [z + 1, (y + 1), x];

                    if (v1 === 1) {
                        if (!vertices.containsArray(a1)) {
                            vertices.push(a1);
                        }
                    }
                    if (v2 === 1) {
                        if (!vertices.containsArray(a2)) {
                            vertices.push(a2);
                        }
                    }
                    if (v3 === 1) {
                        if (!vertices.containsArray(a3)) {
                            vertices.push(a3);
                        }
                    }
                    if (v4 === 1) {
                        if (!vertices.containsArray(a4)) {
                            vertices.push(a4);
                        }
                    }
                    if (v5 === 1) {
                        if (!vertices.containsArray(a5)) {
                            vertices.push(a5);
                        }
                    }
                    if (v6 === 1) {
                        if (!vertices.containsArray(a6)) {
                            vertices.push(a6);
                        }
                    }
                    if (v7 === 1) {
                        if (!vertices.containsArray(a7)) {
                            vertices.push(a7);
                        }
                    }
                    if (v8 === 1) {
                        if (!vertices.containsArray(a8)) {
                            vertices.push(a8);
                        }
                    }

                    let i1 = vertices.containsArrayIndex(a1);
                    let i2 = vertices.containsArrayIndex(a2);
                    let i3 = vertices.containsArrayIndex(a3);
                    let i4 = vertices.containsArrayIndex(a4);
                    let i5 = vertices.containsArrayIndex(a5);
                    let i6 = vertices.containsArrayIndex(a6);
                    let i7 = vertices.containsArrayIndex(a7);
                    let i8 = vertices.containsArrayIndex(a8);

                    if (sum === 3) {
                        let indexEntry = [];
                        if (v1 === 1) {
                            indexEntry.push(i1);
                        }
                        if (v2 === 1) {
                            indexEntry.push(i2);
                        }
                        if (v3 === 1) {
                            indexEntry.push(i3);
                        }
                        if (v4 === 1) {
                            indexEntry.push(i4);
                        }
                        if (v5 === 1) {
                            indexEntry.push(i5);
                        }
                        if (v6 === 1) {
                            indexEntry.push(i6);
                        }
                        if (v7 === 1) {
                            indexEntry.push(i7);
                        }
                        if (v8 === 1) {
                            indexEntry.push(i8);
                        }
                        indices.push(indexEntry);
                    } else if (sum === 4) {

                        //I'm sure there is a better way to do this other than hard-coding it,
                        //but currently I'm lacking imagination/experience
                        let indexEntry = [];
                        let r = 0;
                        let currentIndices = [];
                        if (v1 === 1 && v4 === 1 && v6 === 1 && v8 === 1) {
                            //#1-1
                            indexEntry = [i1, i4, i6];
                            indices.push(indexEntry);
                            indexEntry = [i6, i4, i8];
                            indices.push(indexEntry);
                        } else if (v1 === 1 && v4 === 1 && v7 === 1 && v8 === 1) {
                            //#1-2
                            indexEntry = [i1, i4, i7];
                            indices.push(indexEntry);
                            indexEntry = [i7, i4, i8];
                            indices.push(indexEntry);
                        } else if (v1 === 1 && v7 === 1 && v6 === 1 && v8 === 1) {
                            //#1-3
                            indexEntry = [i1, i7, i6];
                            indices.push(indexEntry);
                            indexEntry = [i6, i7, i8];
                            indices.push(indexEntry);
                        } else if (v2 === 1 && v3 === 1 && v5 === 1 && v7 === 1) {
                            //#2-1
                            indexEntry = [i2, i3, i5];
                            indices.push(indexEntry);
                            indexEntry = [i5, i3, i7];
                            indices.push(indexEntry);
                        } else if (v2 === 1 && v8 === 1 && v5 === 1 && v7 === 1) {
                            //#2-2
                            indexEntry = [i2, i5, i8];
                            indices.push(indexEntry);
                            indexEntry = [i8, i5, i7];
                            indices.push(indexEntry);
                        } else if (v2 === 1 && v5 === 1 && v8 === 1 && v7 === 1) {
                            //#2-3
                            indexEntry = [i2, i5, i8];
                            indices.push(indexEntry);
                            indexEntry = [i8, i5, i7];
                            indices.push(indexEntry);
                        } else if (v3 === 1 && v2 === 1 && v8 === 1 && v6 === 1) {
                            //#3-1
                            indexEntry = [i3, i2, i8];
                            indices.push(indexEntry);
                            indexEntry = [i8, i2, i6];
                            indices.push(indexEntry);
                        } else if (v3 === 1 && v5 === 1 && v8 === 1 && v6 === 1) {
                            //#3-2
                            indexEntry = [i3, i5, i8];
                            indices.push(indexEntry);
                            indexEntry = [i8, i5, i6];
                            indices.push(indexEntry);
                        } else if (v3 === 1 && v2 === 1 && v5 === 1 && v6 === 1) {
                            //#3-3
                            indexEntry = [i3, i2, i5];
                            indices.push(indexEntry);
                            indexEntry = [i5, i2, i6];
                            indices.push(indexEntry);
                        } else if (v4 === 1 && v1 === 1 && v7 === 1 && v5 === 1) {
                            //#4-1
                            indexEntry = [i4, i1, i7];
                            indices.push(indexEntry);
                            indexEntry = [i7, i1, i5];
                            indices.push(indexEntry);
                        } else if (v4 === 1 && v1 === 1 && v6 === 1 && v5 === 1) {
                            //#4-2
                            indexEntry = [i4, i1, i6];
                            indices.push(indexEntry);
                            indexEntry = [i6, i1, i5];
                            indices.push(indexEntry);
                        } else if (v4 === 1 && v6 === 1 && v7 === 1 && v5 === 1) {
                            //#4-3
                            indexEntry = [i4, i6, i7];
                            indices.push(indexEntry);
                            indexEntry = [i7, i6, i5];
                            indices.push(indexEntry);
                        } else if (v5 === 1 && v2 === 1 && v3 === 1 && v4 === 1) {
                            //#5-1
                            indexEntry = [i5, i2, i3];
                            indices.push(indexEntry);
                            indexEntry = [i3, i2, i4];
                            indices.push(indexEntry);
                        } else if (v5 === 1 && v2 === 1 && v8 === 1 && v4 === 1) {
                            //#5-2
                            indexEntry = [i5, i2, i8];
                            indices.push(indexEntry);
                            indexEntry = [i8, i2, i4];
                            indices.push(indexEntry);
                        } else if (v5 === 1 && v3 === 1 && v8 === 1 && v4 === 1) {
                            //#5-3
                            indexEntry = [i5, i3, i8];
                            indices.push(indexEntry);
                            indexEntry = [i8, i3, i4];
                            indices.push(indexEntry);
                        } else if (v6 === 1 && v1 === 1 && v4 === 1 && v3 === 1) {
                            //#6-1
                            indexEntry = [i6, i1, i4];
                            indices.push(indexEntry);
                            indexEntry = [i4, i1, i3];
                            indices.push(indexEntry);
                        } else if (v6 === 1 && v1 === 1 && v7 === 1 && v3 === 1) {
                            //#6-2
                            indexEntry = [i6, i1, i7];
                            indices.push(indexEntry);
                            indexEntry = [i7, i1, i3];
                            indices.push(indexEntry);
                        } else if (v6 === 1 && v4 === 1 && v7 === 1 && v3 === 1) {
                            //#6-3
                            indexEntry = [i6, i4, i7];
                            indices.push(indexEntry);
                            indexEntry = [i7, i4, i3];
                            indices.push(indexEntry);
                        } else if (v7 === 1 && v1 === 1 && v4 === 1 && v2 === 1) {
                            //#7-1
                            indexEntry = [i7, i1, i4];
                            indices.push(indexEntry);
                            indexEntry = [i4, i1, i2];
                            indices.push(indexEntry);
                        } else if (v7 === 1 && v1 === 1 && v6 === 1 && v2 === 1) {
                            //#7-2
                            indexEntry = [i7, i1, i6];
                            indices.push(indexEntry);
                            indexEntry = [i6, i1, i2];
                            indices.push(indexEntry);
                        } else if (v7 === 1 && v4 === 1 && v8 === 1 && v2 === 1) {
                            //#7-3
                            indexEntry = [i7, i4, i8];
                            indices.push(indexEntry);
                            indexEntry = [i8, i4, i2];
                            indices.push(indexEntry);
                        } else if (v8 === 1 && v2 === 1 && v3 === 1 && v1 === 1) {
                            //#8-1
                            indexEntry = [i8, i2, i3];
                            indices.push(indexEntry);
                            indexEntry = [i3, i2, i1];
                            indices.push(indexEntry);
                        } else if (v8 === 1 && v2 === 1 && v5 === 1 && v1 === 1) {
                            //#8-2
                            indexEntry = [i8, i2, i5];
                            indices.push(indexEntry);
                            indexEntry = [i5, i2, i1];
                            indices.push(indexEntry);
                        } else if (v8 === 1 && v3 === 1 && v5 === 1 && v1 === 1) {
                            //#8-3
                            indexEntry = [i8, i3, i5];
                            indices.push(indexEntry);
                            indexEntry = [i5, i3, i1];
                            indices.push(indexEntry);
                        } else {
                            let indexParts = [];
                            if (v1 === 1) {
                                indexParts.push(i1);
                                currentIndices.push(i1);
                                r++;
                            }
                            if (v2 === 1) {
                                indexParts.push(i2);
                                currentIndices.push(i2);
                                r++;
                            }
                            if (v3 === 1) {
                                indexParts.push(i3);
                                currentIndices.push(i3);
                                r++;
                            }
                            if (v4 === 1) {
                                if (r > 2) {
                                    indexParts.push(currentIndices[2]);
                                    indexParts.push(currentIndices[1]);
                                }
                                indexParts.push(i4);
                                currentIndices.push(i4);
                                r++;
                            }
                            if (v5 === 1) {
                                if (r > 2) {
                                    indexParts.push(currentIndices[2]);
                                    indexParts.push(currentIndices[1]);
                                }
                                indexParts.push(i5);
                                currentIndices.push(i5);
                                r++;
                            }
                            if (v6 === 1) {
                                if (r > 2) {
                                    indexParts.push(currentIndices[2]);
                                    indexParts.push(currentIndices[1]);
                                }
                                indexParts.push(i6);
                                currentIndices.push(i6);
                                r++;
                            }
                            if (v7 === 1) {
                                if (r > 2) {
                                    indexParts.push(currentIndices[2]);
                                    indexParts.push(currentIndices[1]);
                                }
                                indexParts.push(i7);
                                currentIndices.push(i7);
                                r++;
                            }
                            if (v8 === 1) {
                                if (r > 2) {
                                    indexParts.push(currentIndices[2]);
                                    indexParts.push(currentIndices[1]);
                                }
                                indexParts.push(i8);
                                currentIndices.push(i8);
                                r++;
                            }
                            indexEntry = [indexParts[0], indexParts[1], indexParts[2]];
                            indices.push(indexEntry);
                            indexEntry = [indexParts[3], indexParts[4], indexParts[5]];
                            indices.push(indexEntry);
                        }

                    } else if (sum === 5) {

                    }

                    //###############################
                    //  3 active
                    //###############################
                    //  single polygon
                    //  56 total
                    //
                    //  types = 3
                    //  flat
                    //  24
                    //  diagonal single
                    //  24
                    //  diagonal double
                    //  8
                    //############################### 
                    //  4 active
                    //###############################
                    //  double polygons
                    //  70
                    //  
                    //###############################
                    //  5 active
                    //###############################
                    //  
                    //  56
                    // 
                    //###############################
                    //  6 active
                    //###############################
                    // 
                    //  28
                    //###############################
                    //  7 active
                    //###############################
                    //  8
                    //
                    //
                }
            }
        }
    }
    // console.log(vertices);
    // console.log(indices);
    return [vertices, indices];
}

function examineShapePiece(piece, type) {
    switch (type) {
        case 3:



            break;
        case 4:



            break;
        case 5:



            break;
        default:
            break;
    }
}

//####################################################################
//  Create Polygons
//####################################################################

function buildVertices(shape) {
    let vertices = [];
    let indices = [];
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

                    switch (pIndex) {
                        case 0:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a1, a2, a3);
                            indices = addIndices(vertices, indices, a1, a2, a3);
                            break;
                        case 1:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a1, a2, a7);
                            indices = addIndices(vertices, indices, a1, a2, a7);
                            break;
                        case 2:
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a2, a3, a5);
                            indices = addIndices(vertices, indices, a2, a3, a5);
                            break;
                        case 3:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a1, a2, a3);
                            vertices = addVertex(vertices, a3, a2, a4);
                            indices = addIndices(vertices, indices, a1, a2, a3);
                            indices = addIndices(vertices, indices, a3, a2, a4);
                            break;
                        case 4:
                            //a1 commented out since it will apear inside the mesh
                            // a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            // vertices = addVertex(vertices, a1, a2, a3);
                            vertices = addVertex(vertices, a3, a2, a5);
                            // indices = addIndices(vertices, indices, a1, a2, a3);
                            indices = addIndices(vertices, indices, a3, a2, a5);
                            break;
                        case 5:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a1, a2, a3);
                            vertices = addVertex(vertices, a3, a2, a8);
                            indices = addIndices(vertices, indices, a1, a2, a3);
                            indices = addIndices(vertices, indices, a3, a2, a8);
                            break;
                        case 6:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a1, a2, a3);
                            vertices = addVertex(vertices, a3, a2, a7);
                            indices = addIndices(vertices, indices, a1, a2, a3);
                            indices = addIndices(vertices, indices, a3, a2, a7);
                            break;
                        case 7:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a1, a3, a4);
                            vertices = addVertex(vertices, a4, a3, a5);
                            indices = addIndices(vertices, indices, a1, a3, a4);
                            indices = addIndices(vertices, indices, a4, a3, a5);
                            break;
                        case 8:
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a7 = fixVerticeRotation(a7, 7, zRot, yRot, xRot);
                            a8 = fixVerticeRotation(a8, 8, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a1, a3, a7);
                            vertices = addVertex(vertices, a7, a3, a8);
                            indices = addIndices(vertices, indices, a1, a3, a7);
                            indices = addIndices(vertices, indices, a7, a3, a8);
                            break;
                        case 9:
                            // [[[1, 1], [1, 1]], [[1, 0], [0, 0]]], //#9 Flat with one extra, inverse Flat side polygon
                            a1 = fixVerticeRotation(a1, 1, zRot, yRot, xRot);
                            a2 = fixVerticeRotation(a2, 2, zRot, yRot, xRot);
                            a3 = fixVerticeRotation(a3, 3, zRot, yRot, xRot);
                            a4 = fixVerticeRotation(a4, 4, zRot, yRot, xRot);
                            a5 = fixVerticeRotation(a5, 5, zRot, yRot, xRot);
                            vertices = addVertex(vertices, a1, a2, a3);
                            vertices = addVertex(vertices, a3, a2, a4);
                            vertices = addVertex(vertices, a1, a2, a5);
                            indices = addIndices(vertices, indices, a1, a2, a3);
                            indices = addIndices(vertices, indices, a3, a2, a4);
                            indices = addIndices(vertices, indices, a1, a2, a5);
                            break;
                        case 10:
                            break;
                        case 11:
                            break;
                        case 12:
                            break;
                        case 13:
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    console.log(vertices);
    console.log(indices);
    return [vertices, indices];
}
function addVertex(vArray, vertex1, vertex2, vertex3) {
    if (!vArray.containsArray(vertex1)) {
        vArray.push(vertex1);
    }
    if (!vArray.containsArray(vertex2)) {
        vArray.push(vertex2);
    }
    if (!vArray.containsArray(vertex3)) {
        vArray.push(vertex3);
    }
    return vArray;
}
function addIndices(vArray, iArray, vertex1, vertex2, vertex3) {
    let i1 = vArray.containsArrayIndex(vertex1);
    let i2 = vArray.containsArrayIndex(vertex2);
    let i3 = vArray.containsArrayIndex(vertex3);
    //Prevents creation of identical polygons
    if (!iArray.containsArray([i1, i2, i3])) {
        iArray.push([i1, i2, i3]);
    }
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
    //It shouldnt come to this, but we have it just in case
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
            rotatedPiece[0][y][1] = 1;
        }
        if (piece[0][y][1] === 1) {
            rotatedPiece[1][y][1] = 1;
        }
        if (piece[1][y][0] === 1) {
            rotatedPiece[0][y][0] = 1;
        }
        if (piece[1][y][1] === 1) {
            rotatedPiece[1][y][0] = 1;
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
function fixVerticeRotation(vertex, p, z, y, x) { //p for position: 1-8
    switch (z) {
        case 1:
            if (p === 1 || p === 5) {
                vertex[2]++;
            }
            if (p === 2 || p === 6) {
                vertex[1]++;
            }
            if (p === 3 || p === 7) {
                vertex[1]--;
            }
            if (p === 4 || p === 8) {
                vertex[2]--;
            }
            break;
        case 2:
            if (p === 1 || p === 5) {
                vertex[1]++;
                vertex[2]++;
            }
            if (p === 2 || p === 6) {
                vertex[1]++;
                vertex[2]--;
            }
            if (p === 3 || p === 7) {
                vertex[1]--;
                vertex[2]++;
            }
            if (p === 4 || p === 8) {
                vertex[1]--;
                vertex[2]--;
            }
            break;
        case 3:
            if (p === 1 || p === 5) {
                vertex[1]++;
            }
            if (p === 2 || p === 6) {
                vertex[2]--;
            }
            if (p === 3 || p === 7) {
                vertex[1]--;
            }
            if (p === 4 || p === 8) {
                vertex[2]++;
            }
            break;
        default:
            break;
    }
    switch (y) {
        case 1:
            if (p === 1 || p === 3) {
                vertex[0]++;
            }
            if (p === 2 || p === 4) {
                vertex[2]--;
            }
            if (p === 5 || p === 7) {
                vertex[2]++;
            }
            if (p === 6 || p === 8) {
                vertex[0]--;
            }
            break;
        case 2:
            if (p === 1 || p === 3) {
                vertex[0]++;
                vertex[2]++;
            }
            if (p === 2 || p === 4) {
                vertex[0]++;
                vertex[2]--;
            }
            if (p === 5 || p === 7) {
                vertex[0]--;
                vertex[2]++;
            }
            if (p === 6 || p === 8) {
                vertex[0]--;
                vertex[2]--;
            }
            break;
        case 3:
            if (p === 1 || p === 3) {
                vertex[2]++;
            }
            if (p === 2 || p === 4) {
                vertex[0]++;
            }
            if (p === 5 || p === 7) {
                vertex[0]--;
            }
            if (p === 6 || p === 8) {
                vertex[2]--;
            }
            break;
        default:
            break;
    }
    switch (x) {
        case 1:
            if (p === 1 || p === 2) {
                vertex[0]--;
            }
            if (p === 3 || p === 4) {
                vertex[1]--;
            }
            if (p === 5 || p === 6) {
                vertex[1]++;
            }
            if (p === 7 || p === 8) {
                vertex[0]++;
            }
            break;
        case 2:
            if (p === 1 || p === 2) {
                vertex[0]++;
                vertex[1]++;
            }
            if (p === 3 || p === 4) {
                vertex[0]++;
                vertex[1]--;
            }
            if (p === 5 || p === 6) {
                vertex[0]--;
                vertex[1]++;
            }
            if (p === 7 || p === 8) {
                vertex[0]--;
                vertex[1]--;
            }
            break;
        case 3:
            if (p === 1 || p === 2) {
                vertex[1]++;
            }
            if (p === 3 || p === 4) {
                vertex[0]++;
            }
            if (p === 5 || p === 6) {
                vertex[0]--;
            }
            if (p === 7 || p === 8) {
                vertex[1]--;
            }
            break;
        default:
            break;
    }
    return vertex;
}

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
possibleOutcomes();


function mCube(shape, z, y, x) {
    let x0 = shape[z][y][x];
    let x1 = shape[z][y][x - 1];
    let x2 = shape[z][y][x + 1];
    let y1 = shape[z][y - 1][x];
    let y2 = shape[z][y + 1][x];
    let z1 = shape[z - 1][y][x];
    let z2 = shape[z + 2][y][x];
}