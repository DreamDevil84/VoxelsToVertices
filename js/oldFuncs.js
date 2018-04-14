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