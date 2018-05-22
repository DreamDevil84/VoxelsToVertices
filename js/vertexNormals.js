function getVertexNormals(shape) {
    let normalsShape = coatShapeForNormals(shape);

    for (let z = 1; z < normalsShape.length - 1; z++) {
        for (let y = 1; y < normalsShape[z].length - 1; y++) {
            for (let x = 1; x < normalsShape[z][y].length - 1; x++) {

                let a0 = normalsShape[z][y + 1][x];
                let a1 = normalsShape[z][y - 1][x + 1];
                let a2 = normalsShape[z][y - 1][x - 1];

                let b0 = normalsShape[z][y - 1][x];
                let b1 = normalsShape[z - 1][y + 1][x];
                let b2 = normalsShape[z + 1][y + 1][x];

            }
        }
    }


    let va = [1, 0, 0];
    let vb = [0, 0, 0];
    let vc = [0, 0, 1];

    let AB = [
        va[0] - vb[0],
        va[1] - vb[1],
        va[2] - vb[2]
    ];

    let BC = [
        vb[0] - vc[0],
        vb[1] - vc[1],
        vb[2] - vc[2]
    ];

    let intensity = 0.5;

    console.log(Math.cross(AB, BC));
    console.log(Math.cross4d(va, vb, vc, intensity));

    console.log(normalsShape);
}


function coatShapeForNormals(shape) {
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