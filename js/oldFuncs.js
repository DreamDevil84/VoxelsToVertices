//OLD functions, delete later


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
                        indices.push(vertices.indexOfArray(a4));
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

                    let i1 = vertices.indexOfArray(a8);

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
function adjustNormals(nArray, iArray, vArray) {
    let nA = [];
    for (let i = 0; i < nArray.length; i++) {
        // let usageCount = 0;
        // for (let j = 0; j < iArray.length; j++) {
        //     for (let k = 0; k < iArray[j].length; k++) {
        //         if (iArray[j][k] === i) {
        //             usageCount++;
        //         }
        //     }
        // }
        // let n1 = nArray[i][0] / usageCount;
        // let n2 = nArray[i][1] / usageCount;
        // let n3 = nArray[i][2] / usageCount;
        // let n1 = nArray[i][0];
        // let n2 = nArray[i][1];
        // let n3 = nArray[i][2];
        // n1 = n1 / (Math.tangent3d(n1, n2, n3));
        // n2 = n2 / (Math.tangent3d(n1, n2, n3));
        // n3 = n3 / (Math.tangent3d(n1, n2, n3));
        // nA.push([n1, n2, n3]);
        // console.log(usageCount);
        let n = Math.unitVector(nArray[0], nArray[1], nArray[2]);
        nA.push(n);
    }
    return nA;
}

function formatArraysMini() {
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
    let found = 0;
    console.log("Fixing dupes: Start");
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
    //             indices[j] = -1;
    //             indices[j + 1] = -1;
    //             indices[j + 2] = -1;
    //             console.log("Found dupe at: " + j);
    //             found++;
    //         }
    //     }
    //     // if (i % dupeProgress === 0) {
    //     //     console.log("Dupe progress: " + (i / dupeProgress) + "%");
    //     // }
    // }
    console.log("Fixing dupes: Done");
    console.log("Found dupes: " + found);
    console.log("Formatting data: Done");
    return [normalsToCheck, indexesToCheck];
}
function getIndexesMini(indexesToCheck, len) {
    let indexArray = new Array(len);
    for (let i = 0; i < indexesToCheck.length; i++) {
        for (let j = 0; j < indexesToCheck[i].length; j++) {
            indexArray[indexesToCheck[i][j]] = i;
        }
    }
    // console.log(indexArray);
    let newIndices = new Array(len);
    for (let i = 0; i < newIndices.length; i++) {
        let temp = indexArray[newIndices[i]];
        newIndices[i] = temp;
    }
    // console.log(newIndices);
    return indexArray;
}
function getNormalsMini(indexesToCheck, indexArray) {
    let normalsToCheck = [];
    for (let i = 0; i < indexesToCheck.length; i++) {
        normalsToCheck.push([]);
    }
    for (let i = 0; i < indexArray.length; i++) {
        for (let j = 0; j < indexArray[i].length; j++) {
            let temp = indices[i][j];
            normalsToCheck[temp].push(i);
        }
    }
    return normalsToCheck;
}
function makeSphereLine(r) {
    let radius = r;
    let points = [];
    let theta = 0;
    let deltaTheta = 0.1;
    let y = 0;
    for (let i = 0; i < 64; i++) {
        points.push(new BABYLON.Vector3(radius * Math.cos(theta), y, radius * Math.sin(theta)));
        theta += deltaTheta;
    }
    return points;
}
function makeVoxelSphereOutline() {
    let radius = 10;
    // let radius = document.getElementById("cubeRadius").value;
    if (radius < 2) {
        radius = 2;
    }
    console.log(radius);
    let sphere = [];
    let diameter = radius * 2;
    // let hor = new Array(diameter + 1);
    // let vert = new Array(diameter + 1);
    // let sphere = new Array(diameter + 1);
    for (let z = 0; z <= diameter; z++) {
        let vert = [];
        for (let y = 0; y <= diameter; y++) {
            let hor = [];
            for (let x = 0; x <= diameter; x++) {
                let a = Math.abs(radius - y);
                let b = Math.sqrt(Math.pow(Math.abs(radius - x), 2) + Math.pow(Math.abs(radius - z), 2));
                let c = Math.sqrt((a * a) + (b * b));
                let distance = Math.abs(c);
                // console.log(distance);
                // if (distance < radius + 0.4 && distance > radius - 0.4) {
                if (Math.floor(distance) == radius) {
                    hor.push(1);
                    // console.log('hit: ' + z + ': ' + y + ': ' + x);
                    // console.log(sphere[z][y][x]);
                } else {
                    hor.push(0);
                }
            }
            vert.push(hor);
        }
        sphere.push(vert);
    }
    sphere = hollowFix(sphere, radius);
    // console.log(sphere);
    return sphere;
}
function hollowFix(sphere, r) {
    let newSphere = sphere;
    for (let i = 1; i < r; i++) {
        let dist = (r * 2) + 1;
        for (let z = -i; z < i; z++) {
            for (let y = -i; y <= i; y++) {
                for (let x = -i; x <= i; x++) {
                    let zN = 0;
                    if (sphere[(r + z) - 1][(r + y)][(r + x)] === 1 || sphere[(r + z) + 1][(r + y)][(r + x)] === 1) {
                        zN = 1;
                    }
                    let yN = 0;
                    if (sphere[(r + z)][(r + y) - 1][(r + x)] === 1 || sphere[(r + z)][(r + y) + 1][(r + x)] === 1) {
                        yN = 1;
                    }
                    let xN = 0;
                    if (sphere[(r + z)][(r + y)][(r + x) - 1] === 1 || sphere[(r + z)][(r + y)][(r + x) + 1] === 1) {
                        xN = 1;
                    }
                    if (zN === 1 && yN === 1 && xN === 1 && sphere[(r + z)][(r + y)][(r + x)] === 1) {
                        sphere[(r + z)][(r + y)][(r + x)] = 2;
                    }
                }
            }
        }
    }
    return newSphere;
}
// TODO write a better hollow function that uses radius to reduce a 4x4 block size to a
// minimum of 4 active blocks, removing any active blocks that are closest to the center (origo)
function hollowSphere() {
}
function saveSphere(data) {
    let jsonData = JSON.stringify(data);
    let name = "sphere";
    console.log("Starting download");
    download(jsonData, name + '.json', 'application/json');
}
function getTestShapes(size) {
    let shape = [];

    for (let z = 0; z < 4; z++) {
        shape.push([]);
        for (let y = 0; y < 4; y++) {
            shape[z].push([]);
            for (let x = 0; x < 800; x++) {
                shape[z][y].push(0);
            }
        }
    }

    let xpos = 0;

    for (let a0 = 0; a0 < 2; a0++) {
        for (let a1 = 0; a1 < 2; a1++) {
            for (let a2 = 0; a2 < 2; a2++) {
                for (let a3 = 0; a3 < 2; a3++) {
                    for (let a4 = 0; a4 < 2; a4++) {
                        for (let a5 = 0; a5 < 2; a5++) {
                            for (let a6 = 0; a6 < 2; a6++) {
                                for (let a7 = 0; a7 < 2; a7++) {
                                    let sum = a0 + a1 + a2 + a3 + a4 + a5 + a6 + a7;
                                    if (sum === size) {

                                        xpos += 3;

                                        shape[1][1][xpos] = a0;
                                        shape[1][1][xpos + 1] = a1;
                                        shape[1][2][xpos] = a2;
                                        shape[1][2][xpos + 1] = a3;
                                        shape[2][1][xpos] = a4;
                                        shape[2][1][xpos + 1] = a5;
                                        shape[2][2][xpos] = a6;
                                        shape[2][2][xpos + 1] = a7;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // console.log(shape);
    return shape;
}

function getTestPolygonSmall() {
    let polygon =
        [
            [

                [1, 1, 1],
                [1, 1, 1]
            ],
            [

                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
            [

                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ]
        ];
    return polygon;
}

function getTestPolygonLarge() {
    let polygon =
        [
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        ]
    return polygon;
}
function getTestNormal() {
    let normal =
        [
            [-1, -1, 1]
            , [-1, 1, 1]
            , [1, -1, 1]
            // ,[-1, 0, -2]
        ];
    return normal;
}
function getTestPoints(array) {
    let pArray = [];
    for (let i = 0; i < array.length; i++) {
        pArray.push(new BABYLON.Vector3(array[i][0], array[i][1], array[i][2]))
    }
    return pArray;
}
var createScene = function (shape, mIntens, zModifier) {

    let minIntensity = mIntens || 0;
    let zMod = zModifier || 1;
    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas

    // Arc Camera
    // var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);

    // Free Camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-3, 3, -(shape.length * 1.5), scene));
    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(canvas, true);

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    // light2.diffuse = new BABYLON.Color3(0, 1, 0);
    // light2.specular = new BABYLON.Color3(0, 0, 1);


    // Add and manipulate meshes in the scene
    // var box = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.75, depth: 0.25 }, scene);

    var wireframeMat = new BABYLON.StandardMaterial("wiremat", scene);
    wireframeMat.wireframe = true;
    wireframeMat.backCulling = false;
    var greenSurface = new BABYLON.StandardMaterial("greenSurface", scene);
    greenSurface.diffuseColor = new BABYLON.Color3((1 / 255) * 80, (1 / 255) * 140, (1 / 255) * 70);
    greenSurface.specularColor = new BABYLON.Color3((1 / 255) * 80, (1 / 255) * 140, (1 / 255) * 70);
    // greenSurface.emissiveColor = new BABYLON.Color3((1 / 255) * 80, (1 / 255) * 140, (1 / 255) * 70);
    // greenSurface.ambientColor = new BABYLON.Color3((1 / 255) * 80, (1 / 255) * 140, (1 / 255) * 70);
    // greenSurface.backFaceCulling = false;
    // greenSurface.wireframe = true;
    var redSurface = new BABYLON.StandardMaterial("redSurface", scene);
    redSurface.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // redSurface.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    // redSurface.emissiveColor = new BABYLON.Color3(1, 1, 1);
    // redSurface.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    // let sphere = makeVoxelSphere();



    let layers = shape.length;
    let startLayer = 0;
    let meshData = buildVertices(shape, minIntensity, zMod);


    //#######################################################
    //  Lines
    //#######################################################

    let startpoint = -shape.length / 2;
    var myPointsZ = [
        new BABYLON.Vector3(startpoint, startpoint, startpoint),
        new BABYLON.Vector3(startpoint, startpoint, 1000)
    ];
    var myPointsY = [
        new BABYLON.Vector3(startpoint, startpoint, startpoint),
        new BABYLON.Vector3(startpoint, 1000, startpoint)
    ];
    var myPointsX = [
        new BABYLON.Vector3(startpoint, startpoint, startpoint),
        new BABYLON.Vector3(1000, startpoint, startpoint)
    ];
    var myPoints1 = [
        new BABYLON.Vector3(startpoint, startpoint + 1, startpoint + 4),
        new BABYLON.Vector3(1000, startpoint + 1, startpoint + 4)
    ];
    var myPoints2 = [
        new BABYLON.Vector3(startpoint, startpoint + 1, startpoint + 5),
        new BABYLON.Vector3(1000, startpoint + 1, startpoint + 5)
    ];
    var myPoints3 = [
        new BABYLON.Vector3(startpoint, startpoint + 2, startpoint + 4),
        new BABYLON.Vector3(1000, startpoint + 2, startpoint + 4)
    ];
    var myPoints4 = [
        new BABYLON.Vector3(startpoint, startpoint + 2, startpoint + 5),
        new BABYLON.Vector3(1000, startpoint + 2, startpoint + 5)
    ];
    var redColor = [
        new BABYLON.Color4(1, 0, 0, 1),
        new BABYLON.Color4(1, 0, 0, 1)
    ];
    var greenColor = [
        new BABYLON.Color4(0, 1, 0, 1),
        new BABYLON.Color4(0, 1, 0, 1)
    ];
    var yellowColor = [
        new BABYLON.Color4(1, 1, 0, 1),
        new BABYLON.Color4(1, 1, 0, 1)
    ];
    var xPointsScale = [
        new BABYLON.Vector3(startpoint + 1, startpoint, startpoint)
    ];
    var yPointsScale = [
        new BABYLON.Vector3(startpoint, startpoint + 1, startpoint)
    ];
    var zPointsScale = [
        new BABYLON.Vector3(startpoint, startpoint, startpoint + 1)
    ];
    for (let i = 0; i < 100; i += 5) {
        xPointsScale.push(new BABYLON.Vector3(startpoint + i, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i, startpoint, startpoint + 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i, startpoint, startpoint - 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 1, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 1, startpoint, startpoint + 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 1, startpoint, startpoint - 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 1, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 2, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 2, startpoint, startpoint + 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 2, startpoint, startpoint - 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 2, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 3, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 3, startpoint, startpoint + 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 3, startpoint, startpoint - 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 3, startpoint, startpoint));;
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 4, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 4, startpoint, startpoint + 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 4, startpoint, startpoint - 1));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 4, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 5, startpoint, startpoint));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 5, startpoint, startpoint + 3));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 5, startpoint, startpoint - 3));
        xPointsScale.push(new BABYLON.Vector3(startpoint + i + 5, startpoint, startpoint));

        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i, startpoint + 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i, startpoint - 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 1, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 1, startpoint + 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 1, startpoint - 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 1, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 2, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 2, startpoint + 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 2, startpoint - 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 2, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 3, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 3, startpoint + 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 3, startpoint - 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 3, startpoint));;
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 4, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 4, startpoint + 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 4, startpoint - 1));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 4, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 5, startpoint));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 5, startpoint + 3));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 5, startpoint - 3));
        yPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + i + 5, startpoint));

        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i, ));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + 1, startpoint + i, ));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint - 1, startpoint + i, ));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i, ));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 1));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + 1, startpoint + i + 1));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint - 1, startpoint + i + 1));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 1));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 2));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + 1, startpoint + i + 2));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint - 1, startpoint + i + 2));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 2));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 3));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + 1, startpoint + i + 3));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint - 1, startpoint + i + 3));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 3));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 4));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + 1, startpoint + i + 4));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint - 1, startpoint + i + 4));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 4));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 5));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint + 3, startpoint + i + 5));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint - 3, startpoint + i + 5));
        zPointsScale.push(new BABYLON.Vector3(startpoint, startpoint, startpoint + i + 5));
    }
    let abc = 0.1;

    let tpn = [0, 0, 0];

    // var testPointsArray = [
    //     [startpoint, startpoint, startpoint],
    //     [startpoint + 2, startpoint + 4, startpoint + 4]
    // ];
    var testPointsArray = [
        [0, 0, 0],
        [2, 4, 4]
    ];

    // console.log(testPointsArray[1]);

    // testPointsArray[1][0] = testPointsArray[1][0] - (tpn[0] * (1 - abc));
    // testPointsArray[1][1] = testPointsArray[1][1] - (tpn[1] * (1 - abc));
    // testPointsArray[1][2] = testPointsArray[1][2] - (tpn[2] * (1 - abc));


    // testPointsArray[1][1] = 0;

    let t = Math.sqrt((testPointsArray[1][0]) * (testPointsArray[1][0]) + (testPointsArray[1][1]) * (testPointsArray[1][1]) + (testPointsArray[1][2]) * (testPointsArray[1][2]));

    // console.log(t);

    testPointsArray[1][0] = (testPointsArray[1][0] / t) + startpoint;
    testPointsArray[1][1] = (testPointsArray[1][1] / t) + startpoint;
    testPointsArray[1][2] = (testPointsArray[1][2] / t) + startpoint;

    // console.log(testPointsArray);

    var testPoints = getTestPoints(testPointsArray);

    // var testLine = BABYLON.MeshBuilder.CreateLines("testLine", { points: testPoints }, scene);

    // var linesX = BABYLON.MeshBuilder.CreateLines("linesX", { points: myPointsX, colors: redColor }, scene);
    // var linesXscale = BABYLON.MeshBuilder.CreateLines("linesXscale", { points: xPointsScale }, scene);
    // var linesY = BABYLON.MeshBuilder.CreateLines("linesY", { points: myPointsY, colors: greenColor }, scene);
    // var linesYscale = BABYLON.MeshBuilder.CreateLines("linesYscale", { points: yPointsScale }, scene);
    // var linesZ = BABYLON.MeshBuilder.CreateLines("linesZ", { points: myPointsZ, colors: yellowColor }, scene);
    // var linesZscale = BABYLON.MeshBuilder.CreateLines("linesZscale", { points: zPointsScale }, scene);

    // var lines1 = BABYLON.MeshBuilder.CreateLines("lines1", { points: myPoints1 }, scene);
    // var lines2 = BABYLON.MeshBuilder.CreateLines("lines2", { points: myPoints2, colors: redColor }, scene);
    // var lines3 = BABYLON.MeshBuilder.CreateLines("lines3", { points: myPoints3, colors: greenColor }, scene);
    // var lines4 = BABYLON.MeshBuilder.CreateLines("lines4", { points: myPoints4, colors: yellowColor }, scene);

    // let sphereLine = makeSphereLine(r + 1);
    // var sLines = BABYLON.MeshBuilder.CreateLines("sLines", { points: sphereLine }, scene);

    //#######################################################
    //  Custom Curved Lines
    //#######################################################

    // var xCurve = getVoxelLinesX(shape[20], 20);
    // console.log(xCurve);
    // var xCurveLines = BABYLON.MeshBuilder.CreateLines("xCurveLines", { points: xCurve[20] }, scene);

    //#######################################################
    //  Custom mesh
    //#######################################################

    var customMesh = new BABYLON.Mesh("custom", scene);
    customMesh.material = greenSurface;

    var positions = [];
    let vertices = meshData[0];
    // console.log(meshData[1]);
    let indices = formatIndices(meshData[1]);
    var normals = [];
    let midsection = shape.length / 2;
    for (let i = 0; i < vertices.length; i++) {
        positions.push(vertices[i][2] - midsection);
        positions.push(vertices[i][1] - midsection);
        positions.push(vertices[i][0] - midsection);
    }

    // var positions = [];
    // // console.log(meshData[0]);
    // // console.log(meshData[1]);
    // let vertices = meshData[0];
    // let indices = meshData[1];
    // var normals = [];
    // for (let i = 0; i < vertices.length; i += 3) {
    //     positions.push(vertices[i + 2] - midsection);
    //     positions.push(vertices[i + 1] - midsection);
    //     positions.push(vertices[i] - midsection);
    // }
    // positions = vertices;

    // BABYLON.VertexData.ComputeNormals(positions, indices, normals);

    normals = meshData[2];
    normals = formatNormals(normals);
    // normals = getTestNormal();
    // normals = fixNormals(normals);

    var vertexData = new BABYLON.VertexData();

    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals;

    vertexData.applyToMesh(customMesh, true);

    // writeObjFile(meshData[0], meshData[1], meshData[2]);

    // customMesh.convertToFlatShadedMesh();

    // showNormals(customMesh);


    //#######################################################
    //  Standard box format
    //#######################################################
    // for (let z = startLayer; z < (startLayer + layers); z++) {
    //     for (let y = 0; y < shape[z].length; y++) {
    //         for (let x = 0; x < shape[z][y].length; x++) {
    //             if (shape[z][y][x] > minIntensity) {
    //                 if (z === 2 && y === 5 && x === 3 || z === 3 && y === 4 && x === 3 ) {
    //                     // check specific vertice
    //                     let box = BABYLON.MeshBuilder.CreateBox("box", { height: 0.6, width: 0.6, depth: 0.6 }, scene);
    //                     box.position.z = (z - shape.length / 2) + 1;
    //                     box.position.y = (y - shape.length / 2) + 1;
    //                     box.position.x = (x - shape.length / 2) + 1;
    //                     if (z > layers / 2) {
    //                         box.material = redSurface;
    //                     } else {
    //                         box.material = redSurface;
    //                     }
    //                 } else {
    //                     let box = BABYLON.MeshBuilder.CreateBox("box", { height: 0.1, width: 0.1, depth: 0.1 }, scene);
    //                     box.position.z = (z - shape.length / 2) + 1;
    //                     box.position.y = (y - shape.length / 2) + 1;
    //                     box.position.x = (x - shape.length / 2) + 1;
    //                     if (z > layers / 2) {
    //                         box.material = redSurface;
    //                     } else {
    //                         box.material = redSurface;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    //#######################################################
    //  Full box format
    //#######################################################
    // for (let z = startLayer; z < (startLayer + layers); z++) {
    //     for (let y = 0; y < shape[z].length; y++) {
    //         for (let x = 0; x < shape[z][y].length; x++) {
    //             if (shape[z][y][x] > minIntensity) {
    //                 let box = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 1 }, scene);
    //                 box.position.z = (z - shape.length / 2) + 1;
    //                 box.position.y = (y - shape.length / 2) + 1;
    //                 box.position.x = (x - shape.length / 2) + 1;
    //                 box.material = redSurface;
    //             }
    //         }
    //     }
    // }

    // writeJSON(meshData[0], meshData[1]);

    // let y = 0.0;
    // let k = 0.0;
    // let x = 0.0;

    // scene.registerBeforeRender(function () {
    //     customMesh.rotation = new BABYLON.Vector3(0.0, 10.0, 0.0);
    //     customMesh.addRotation(0.0, y, y);
    //     y += 0.01;
    // });
    console.log("done");
    return scene;

};
function makeTestObj(r) {
    let rad = r;
    let sph = makeVoxelSphere(rad);
    let md = buildVertices(sph);
    let verts = md[0];
    let indis = md[1];
    let norms = md[2];
    writeObjFile(verts, indis, norms);
}
function showNormals(mesh, size, color, sc) {
    var normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
    var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    color = color || BABYLON.Color3.White();
    sc = sc || scene;
    size = size || 1;

    var lines = [];
    for (var i = 0; i < normals.length; i += 3) {
        var v1 = BABYLON.Vector3.FromArray(positions, i);
        var v2 = v1.add(BABYLON.Vector3.FromArray(normals, i).scaleInPlace(size));
        lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
    }
    var normalLines = BABYLON.MeshBuilder.CreateLineSystem("normalLines", { lines: lines }, sc);
    normalLines.color = color;
    return normalLines;
}
function makeBar() {
    let thickness = 2;
    let breadth = 2;
    let barLength = 4;

    let bar = [];

    for (let z = 0; z < thickness; z++) {
        let vert = [];
        for (let y = 0; y <= breadth; y++) {
            let hor = [];
            for (let x = 0; x < barLength; x++) {
                hor.push(1);
            }
            vert.push(hor);
        }
        bar.push(vert);
    }
    // console.log(bar)
    return bar;
}
function fixNormals(n) {
    let a = [];
    for (let i = 0; i < n.length; i++) {
        let n1 = n[i][0] / (Math.tangent3d(n[i][0], n[i][1], n[i][2]));
        let n2 = n[i][1] / (Math.tangent3d(n[i][0], n[i][1], n[i][2]));
        let n3 = n[i][2] / (Math.tangent3d(n[i][0], n[i][1], n[i][2]));
        a.push(n1);
        a.push(n2);
        a.push(n3);
    }
    // console.log(a);
    return a;
}