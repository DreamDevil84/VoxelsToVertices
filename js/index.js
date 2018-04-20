// import * as BABYLON from 'babylonjs';



// Get the canvas DOM element
var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext("2d");
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

var MRIShape = [];

// CreateScene function that creates and return the scene
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
    // greenSurface.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    // greenSurface.emissiveColor = new BABYLON.Color3(1, 1, 1);
    // greenSurface.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
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
    // let meshData = buildVertices(shape, minIntensity);
    let meshData = buildVertices(shape, minIntensity, zMod);
    // let meshData = voxelToVertice(bar);

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
    var linesXscale = BABYLON.MeshBuilder.CreateLines("linesXscale", { points: xPointsScale }, scene);
    var linesY = BABYLON.MeshBuilder.CreateLines("linesY", { points: myPointsY, colors: greenColor }, scene);
    var linesYscale = BABYLON.MeshBuilder.CreateLines("linesYscale", { points: yPointsScale }, scene);
    var linesZ = BABYLON.MeshBuilder.CreateLines("linesZ", { points: myPointsZ, colors: yellowColor }, scene);
    var linesZscale = BABYLON.MeshBuilder.CreateLines("linesZscale", { points: zPointsScale }, scene);

    // var lines1 = BABYLON.MeshBuilder.CreateLines("lines1", { points: myPoints1 }, scene);
    // var lines2 = BABYLON.MeshBuilder.CreateLines("lines2", { points: myPoints2, colors: redColor }, scene);
    // var lines3 = BABYLON.MeshBuilder.CreateLines("lines3", { points: myPoints3, colors: greenColor }, scene);
    // var lines4 = BABYLON.MeshBuilder.CreateLines("lines4", { points: myPoints4, colors: yellowColor }, scene);

    // let sphereLine = makeSphereLine(r + 1);
    // var sLines = BABYLON.MeshBuilder.CreateLines("sLines", { points: sphereLine }, scene);

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
    for (let i = 0; i < vertices.length; i++) {
        positions.push(vertices[i][2] - shape.length / 2);
        positions.push(vertices[i][1] - shape.length / 2);
        positions.push(vertices[i][0] - shape.length / 2);
        // positions.push(vertices[i][2]);
        // positions.push(vertices[i][1]);
        // positions.push(vertices[i][0]);
        // indices.push(i);
    }

    // var positions = [];
    // // console.log(meshData[0]);
    // // console.log(meshData[1]);
    // let vertices = meshData[0];
    // let indices = meshData[1];
    // var normals = [];
    // for (let i = 0; i < vertices.length; i += 3) {
    //     positions.push(vertices[i + 2] - shape.length / 2);
    //     positions.push(vertices[i + 1] - shape.length / 2);
    //     positions.push(vertices[i] - shape.length / 2);
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
    // console.log(shape);


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

    console.log("done");
    return scene;

};
var scene = 0;
scene = createScene(makeShapes(20), 0.4);
engine.runRenderLoop(function () {
    scene.render();
});

// let ssss = buildVertices(makeShapes(10));
//#######################################################
//  Choose shape
//#######################################################
function makeShapes(r) {
    // let shape = makeVoxelSphereOutline();
    let shape = makeVoxelSphere(r);
    // let shape = getTestShapes(5);
    // let shape = getTestPolygonSmall();
    // let shape = getTestPolygonLarge();
    // let shape = makeBar();
    // console.log(shape);
    return shape;
}
//#######################################################
//  Choose shape
//#######################################################

function makeTestObj(r) {
    let rad = r;
    let sph = makeVoxelSphere(rad);
    let md = buildVertices(sph);
    let verts = md[0];
    let indis = md[1];
    let norms = md[2];
    writeObjFile(verts, indis, norms);
}
// makeTestObj(6);


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

function makeSphere() {
    engine.stopRenderLoop();
    let r = document.getElementById("cubeRadius").value;
    var scene = createScene(makeShapes(r));
    engine.runRenderLoop(function () {
        scene.render();
    });
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

function makeVoxelSphere(r) {
    let radius = r;
    // let radius = document.getElementById("cubeRadius").value;
    if (radius < 2) {
        radius = 2;
    }
    // console.log(radius);
    let sphere = [];
    let diameter = radius * 2;
    for (let z = 0; z <= diameter; z++) {
        let vert = [];
        for (let y = 0; y <= diameter; y++) {
            let hor = [];
            for (let x = 0; x <= diameter; x++) {
                let a = Math.abs(radius - y);
                let b = Math.sqrt(Math.pow(Math.abs(radius - x), 2) + Math.pow(Math.abs(radius - z), 2));
                let c = Math.sqrt((a * a) + (b * b));
                let intensity = c - radius;
                if (intensity < 0) {
                    intensity = Math.abs(intensity) / radius;
                } else {
                    intensity = 0 / radius;
                }
                hor.push(intensity);
            }
            vert.push(hor);
        }
        sphere.push(vert);
    }
    // console.log(sphere);
    return sphere;
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

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    console.log("Download finished");
}

window.addEventListener('resize', function () {
    engine.resize();
});


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

function formatIndices(indices) {
    let formatedIndices = [];
    for (let i = 0; i < indices.length; i++) {
        formatedIndices.push(indices[i][0]);
        formatedIndices.push(indices[i][1]);
        formatedIndices.push(indices[i][2]);
    }
    return formatedIndices;
}
function formatNormals(normals) {
    let formatedNormals = [];
    for (let i = 0; i < normals.length; i++) {
        formatedNormals.push(normals[i][0]);
        formatedNormals.push(normals[i][1]);
        formatedNormals.push(normals[i][2]);
    }
    return formatedNormals;
}

function getTestPolygonSmall() {
    let polygon =
        [
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 1, 0],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [0, 1, 1, 0]
            ],
            [
                [0, 1, 1, 0],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [0, 1, 1, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
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

function getTestPoints(array) {
    let pArray = [];
    for (let i = 0; i < array.length; i++) {
        pArray.push(new BABYLON.Vector3(array[i][0], array[i][1], array[i][2]))
    }
    return pArray;
}

function getMRI() {
    let request = new XMLHttpRequest();
    let path = "water.json";
    request.open("GET", path);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            MRIShape = JSON.parse(this.responseText);
            let btnConvert = document.getElementById("btnConvertMRI");
            btnConvert.style.visibility = "visible";
            // console.log(MRIShape);
        }
    }
}

function convertMRI() {
    let startLayer = 40;
    // let startLayer = 55;
    // let layers = MRIShape.length;
    let layers = 50;
    let shape = [];
    for (let i = startLayer; i < (startLayer + layers); i++) {
        let hors = [];
        for (let j = 0; j < MRIShape[i].length; j++) {
            let vert = [];
            for (let k = 0; k < MRIShape[i][j].length; k++) {
                vert.push(MRIShape[i][j][k]);
            }
            hors.push(vert);
        }
        shape.push(hors);
    }
    // console.log(shape);
    // shape = getTestShapes(4);
    // makeObj(shape, 0.5, 2);
    // makeObj(MRIShape);
    engine.stopRenderLoop();
    scene = createScene(shape, 0.5, 1);
    engine.runRenderLoop(function () {
        scene.render();
    });
}

function makeObj(shape, intensity, zMod) {
    let md = buildVertices(shape, intensity, zMod);
    let objVertices = md[0];
    let objIndices = md[1];
    let objNormals = md[2];
    writeObjFile(objVertices, objIndices);
}

function makeObjOLD(shape, intensity) {
    let md = buildVertices(shape, intensity);
    let objVertices = md[0];
    let objIndices = md[1];
    let objNormals = md[2];
    writeObjFile(objVertices, objIndices, objNormals);
}