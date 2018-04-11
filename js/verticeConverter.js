function voxelToVertice(shape) {
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
        for (let y = 1; y < shape[z].length - 1; y++) {
            for (let x = 1; x < shape[z][y].length - 1; x++) {

                let v1 = shape[z][y][x - 1];
                let v2 = shape[z][y][x];
                let v3 = shape[z][y + 1][x - 1];
                let v4 = shape[z][y + 1][x];

                let v5 = shape[z + 1][y][x - 1];
                let v6 = shape[z + 1][y][x];
                let v7 = shape[z + 1][y + 1][x - 1];
                let v8 = shape[z + 1][y + 1][x];

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
                    if (v2 === 1) {
                        if (!vertices.containsArray(a2)) {
                            vertices.push(a2);
                        }
                        if (v3 === 1) {
                            if (!vertices.containsArray(a3)) {
                                vertices.push(a3);
                            }
                            indices.push(vertices.containsArrayIndex(a1));
                            indices.push(vertices.containsArrayIndex(a2));
                            indices.push(vertices.containsArrayIndex(a3));
                            if (v4 === 1) {
                                if (!vertices.containsArray(a4)) {
                                    vertices.push(a4);
                                }
                                indices.push(vertices.containsArrayIndex(a3));
                                indices.push(vertices.containsArrayIndex(a2));
                                indices.push(vertices.containsArrayIndex(a4));
                                if (v5 === 1) {
                                    if (!vertices.containsArray(a5)) {
                                        vertices.push(a5);
                                    }
                                    indices.push(vertices.containsArrayIndex(a1));
                                    indices.push(vertices.containsArrayIndex(a3));
                                    indices.push(vertices.containsArrayIndex(a5));
                                    if (v6 === 1) {
                                        if (!vertices.containsArray(a6)) {
                                            vertices.push(a6);
                                        }
                                        indices.push(vertices.containsArrayIndex(a5));
                                        indices.push(vertices.containsArrayIndex(a6));
                                        indices.push(vertices.containsArrayIndex(a1));
                                        if (v7 === 1) {
                                            if (!vertices.containsArray(a7)) {
                                                vertices.push(a7);
                                            }
                                            indices.push(vertices.containsArrayIndex(a1));
                                            indices.push(vertices.containsArrayIndex(a5));
                                            indices.push(vertices.containsArrayIndex(a7));
                                        }
                                    }
                                }
                            } else if (v5 === 1) {
                                if (!vertices.containsArray(a5)) {
                                    vertices.push(a5);
                                }
                                indices.push(vertices.containsArrayIndex(a1));
                                indices.push(vertices.containsArrayIndex(a2));
                                indices.push(vertices.containsArrayIndex(a5));
                                if (v6 === 1) {
                                    if (!vertices.containsArray(a6)) {
                                        vertices.push(a6);
                                    }
                                    indices.push(vertices.containsArrayIndex(a5));
                                    indices.push(vertices.containsArrayIndex(a3));
                                    indices.push(vertices.containsArrayIndex(a6));
                                    if (v7 === 1) {
                                        if (!vertices.containsArray(a7)) {
                                            vertices.push(a7);
                                        }
                                        indices.push(vertices.containsArrayIndex(a5));
                                        indices.push(vertices.containsArrayIndex(a6));
                                        indices.push(vertices.containsArrayIndex(a7));
                                        if (v8 === 1) {
                                            if (!vertices.containsArray(a8)) {
                                                vertices.push(a8);
                                            }
                                            indices.push(vertices.containsArrayIndex(a7));
                                            indices.push(vertices.containsArrayIndex(a6));
                                            indices.push(vertices.containsArrayIndex(a8));
                                        }
                                    }
                                }
                            }
                            // else if (v6 === 1) {
                            //     if (!vertices.containsArray(a5)) {
                            //         vertices.push(a5);
                            //     }
                            //     indices.push(vertices.containsArrayIndex(a3));
                            //     indices.push(vertices.containsArrayIndex(a2));
                            //     indices.push(vertices.containsArrayIndex(a4));
                            //     if (v5 === 1) {
                            //         if (!vertices.containsArray(a5)) {
                            //             vertices.push(a5);
                            //         }
                            //         indices.push(vertices.containsArrayIndex(a1));
                            //         indices.push(vertices.containsArrayIndex(a3));
                            //         indices.push(vertices.containsArrayIndex(a5));
                            //         if (v6 === 1) {
                            //             if (!vertices.containsArray(a6)) {
                            //                 vertices.push(a6);
                            //             }
                            //             indices.push(vertices.containsArrayIndex(a5));
                            //             indices.push(vertices.containsArrayIndex(a6));
                            //             indices.push(vertices.containsArrayIndex(a1));
                            //             if (v7 === 1) {
                            //                 if (!vertices.containsArray(a7)) {
                            //                     vertices.push(a7);
                            //                 }
                            //                 indices.push(vertices.containsArrayIndex(a1));
                            //                 indices.push(vertices.containsArrayIndex(a5));
                            //                 indices.push(vertices.containsArrayIndex(a7));
                            //             }
                            //         }
                            //     }
                            // } else if (v7 === 1) {
                            //     if (!vertices.containsArray(a5)) {
                            //         vertices.push(a5);
                            //     }
                            //     indices.push(vertices.containsArrayIndex(a3));
                            //     indices.push(vertices.containsArrayIndex(a2));
                            //     indices.push(vertices.containsArrayIndex(a4));
                            //     if (v5 === 1) {
                            //         if (!vertices.containsArray(a5)) {
                            //             vertices.push(a5);
                            //         }
                            //         indices.push(vertices.containsArrayIndex(a1));
                            //         indices.push(vertices.containsArrayIndex(a3));
                            //         indices.push(vertices.containsArrayIndex(a5));
                            //         if (v6 === 1) {
                            //             if (!vertices.containsArray(a6)) {
                            //                 vertices.push(a6);
                            //             }
                            //             indices.push(vertices.containsArrayIndex(a5));
                            //             indices.push(vertices.containsArrayIndex(a6));
                            //             indices.push(vertices.containsArrayIndex(a1));
                            //             if (v7 === 1) {
                            //                 if (!vertices.containsArray(a7)) {
                            //                     vertices.push(a7);
                            //                 }
                            //                 indices.push(vertices.containsArrayIndex(a1));
                            //                 indices.push(vertices.containsArrayIndex(a5));
                            //                 indices.push(vertices.containsArrayIndex(a7));
                            //             }
                            //         }
                            //     }
                            // } else if (v8 === 1) {
                            //     if (!vertices.containsArray(a5)) {
                            //         vertices.push(a5);
                            //     }
                            //     indices.push(vertices.containsArrayIndex(a3));
                            //     indices.push(vertices.containsArrayIndex(a2));
                            //     indices.push(vertices.containsArrayIndex(a4));
                            //     if (v5 === 1) {
                            //         if (!vertices.containsArray(a5)) {
                            //             vertices.push(a5);
                            //         }
                            //         indices.push(vertices.containsArrayIndex(a1));
                            //         indices.push(vertices.containsArrayIndex(a3));
                            //         indices.push(vertices.containsArrayIndex(a5));
                            //         if (v6 === 1) {
                            //             if (!vertices.containsArray(a6)) {
                            //                 vertices.push(a6);
                            //             }
                            //             indices.push(vertices.containsArrayIndex(a5));
                            //             indices.push(vertices.containsArrayIndex(a6));
                            //             indices.push(vertices.containsArrayIndex(a1));
                            //             if (v7 === 1) {
                            //                 if (!vertices.containsArray(a7)) {
                            //                     vertices.push(a7);
                            //                 }
                            //                 indices.push(vertices.containsArrayIndex(a1));
                            //                 indices.push(vertices.containsArrayIndex(a5));
                            //                 indices.push(vertices.containsArrayIndex(a7));
                            //             }
                            //         }
                            //     }
                            // }
                        } else if (v4 === 1) {
                            if (!vertices.containsArray(a4)) {
                                vertices.push(a4);
                            }
                            indices.push(vertices.containsArrayIndex(a1));
                            indices.push(vertices.containsArrayIndex(a2));
                            indices.push(vertices.containsArrayIndex(a4));
                        }
                        //else if (v5 === 1) {
                        //     if (!vertices.containsArray(a1)) {
                        //         vertices.push(a1);
                        //     }
                        //     if (!vertices.containsArray(a2)) {
                        //         vertices.push(a2);
                        //     }
                        //     if (!vertices.containsArray(a3)) {
                        //         vertices.push(a3);
                        //     }
                        //     indices.push(vertices.containsArrayIndex(a1));
                        //     indices.push(vertices.containsArrayIndex(a2));
                        //     indices.push(vertices.containsArrayIndex(a3));
                        // } else if (v6 === 1) {
                        //     if (!vertices.containsArray(a1)) {
                        //         vertices.push(a1);
                        //     }
                        //     if (!vertices.containsArray(a2)) {
                        //         vertices.push(a2);
                        //     }
                        //     if (!vertices.containsArray(a3)) {
                        //         vertices.push(a3);
                        //     }
                        //     indices.push(vertices.containsArrayIndex(a1));
                        //     indices.push(vertices.containsArrayIndex(a2));
                        //     indices.push(vertices.containsArrayIndex(a3));
                        // } else if (v7 === 1) {
                        //     if (!vertices.containsArray(a1)) {
                        //         vertices.push(a1);
                        //     }
                        //     if (!vertices.containsArray(a2)) {
                        //         vertices.push(a2);
                        //     }
                        //     if (!vertices.containsArray(a3)) {
                        //         vertices.push(a3);
                        //     }
                        //     indices.push(vertices.containsArrayIndex(a1));
                        //     indices.push(vertices.containsArrayIndex(a2));
                        //     indices.push(vertices.containsArrayIndex(a3));
                        // } else if (v8 === 1) {
                        //     if (!vertices.containsArray(a1)) {
                        //         vertices.push(a1);
                        //     }
                        //     if (!vertices.containsArray(a2)) {
                        //         vertices.push(a2);
                        //     }
                        //     if (!vertices.containsArray(a3)) {
                        //         vertices.push(a3);
                        //     }
                        //     indices.push(vertices.containsArrayIndex(a1));
                        //     indices.push(vertices.containsArrayIndex(a2));
                        //     indices.push(vertices.containsArrayIndex(a3));
                        // }
                    }
                }
            }
        }
    }
    // console.log(vertices);
    return [vertices, indices];
}

function voxelToVertice3dtype2(shape) {
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

function buildVertices(shape, v1, v2, v3, v4, v5, v6, v7, v8) {
    if (v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 > 2) {
        if (v1 === 1 && v2 === 1 && v3 === 1) {

        }
    }
}

function mCube(shape, z, y, x) {
    let x0 = shape[z][y][x];
    let x1 = shape[z][y][x - 1];
    let x2 = shape[z][y][x + 1];
    let y1 = shape[z][y - 1][x];
    let y2 = shape[z][y + 1][x];
    let z1 = shape[z - 1][y][x];
    let z2 = shape[z + 2][y][x];
}