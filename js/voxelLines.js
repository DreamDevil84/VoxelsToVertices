function getVoxelLinesX(shape, z) {
    console.log(shape);
    let xSlate = new Array(shape.length);
    for (let i = 0; i < xSlate.length; i++) {
        let xLines = new Array(shape[i].length);
        for (let j = 0; j < xLines.length; j++) {
            xLines[j] = new BABYLON.Vector3(z, shape[i][j], j);
        }
        xSlate[i] = xLines;
    }
    return xSlate;
}