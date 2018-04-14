// import * as BABYLON from 'babylonjs';



// Get the canvas DOM element
var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext("2d");
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

// CreateScene function that creates and return the scene
var createScene = function (r) {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas

    // Arc Camera
    // var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);

    // Free Camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-3, 3, -4), scene);
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

    // let sphere = makeVoxelSphereOutline();
    let sphere = makeVoxelSphere(r);
    // let sphere = getTestShapes(4);
    // let sphere = getTestPolygon();
    let bar = makeBar();
    // console.log(sphere);
    // console.log(bar);
    let layers = sphere.length;
    let startLayer = 0;
    let meshData = buildVertices(sphere);
    // let meshData = voxelToVertice(bar);

    //#######################################################
    //  Lines
    //#######################################################

    let startpoint = -sphere.length / 2;

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
    var linesX = BABYLON.MeshBuilder.CreateLines("linesX", { points: myPointsX, colors: redColor }, scene);
    var linesY = BABYLON.MeshBuilder.CreateLines("linesY", { points: myPointsY, colors: greenColor }, scene);
    var linesZ = BABYLON.MeshBuilder.CreateLines("linesZ", { points: myPointsZ, colors: yellowColor }, scene);

    // var lines1 = BABYLON.MeshBuilder.CreateLines("lines1", { points: myPoints1 }, scene);
    // var lines2 = BABYLON.MeshBuilder.CreateLines("lines2", { points: myPoints2, colors: redColor }, scene);
    // var lines3 = BABYLON.MeshBuilder.CreateLines("lines3", { points: myPoints3, colors: greenColor }, scene);
    // var lines4 = BABYLON.MeshBuilder.CreateLines("lines4", { points: myPoints4, colors: yellowColor }, scene);


    //#######################################################
    //  Custom mesh
    //#######################################################

    var customMesh = new BABYLON.Mesh("custom", scene);
    customMesh.material = greenSurface;

    var positions = [];
    // vertices = [
    //     [-1, -1, -1],
    //     [1, -1, -1],
    //     [-1, 1, -1],
    //     [1, 1, -1],
    //     [-1, -1, 1],
    //     [1, -1, 1],
    //     [-1, 1, 1],
    //     [1, 1, 1]
    // ];
    // var indices = [1, 4, 2];

    // var wireMesh = new BABYLON.Mesh("wire", scene);
    // wireMesh.material = wireframeMat;
    // var wireIndices = [
    //     0, 1, 2,
    //     2, 1, 3,
    //     0, 2, 6,
    //     0, 6, 4,
    //     4, 5, 6,
    //     6, 5, 7,
    //     1, 3, 5,
    //     3, 5, 7
    // ];
    // var wireNormals = [];
    // BABYLON.VertexData.ComputeNormals(positions, wireIndices, wireNormals);
    // var vertexWire = new BABYLON.VertexData();

    // vertexWire.positions = positions;
    // vertexWire.indices = wireIndices;
    // vertexWire.normals = wireNormals;
    // vertexWire.applyToMesh(wireMesh, true);


    let vertices = meshData[0];
    // console.log(meshData[1]);
    var indices = formatIndices(meshData[1]);
    var normals = [];
    for (let i = 0; i < vertices.length; i++) {
        positions.push(vertices[i][2] - sphere.length / 2);
        positions.push(vertices[i][1] - sphere.length / 2);
        positions.push(vertices[i][0] - sphere.length / 2);
        // positions.push(vertices[i][2]);
        // positions.push(vertices[i][1]);
        // positions.push(vertices[i][0]);
        // indices.push(i);
    }
    // console.log(vertices);
    // console.log(indices);

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

    // writeObjFile(meshData[0], meshData[1]);

    // showNormals(customMesh);


    //#######################################################
    //  Standard box format
    //#######################################################
    // for (let z = startLayer; z < (startLayer + layers); z++) {
    //     for (let y = 0; y < sphere[z].length; y++) {
    //         for (let x = 0; x < sphere[z][y].length; x++) {
    //             if (sphere[z][y][x] > 0) {
    //                 let box = BABYLON.MeshBuilder.CreateBox("box", { height: 0.1, width: 0.1, depth: 0.1 }, scene);
    //                 box.position.z = (z - sphere.length / 2) / 1;
    //                 box.position.y = (y - sphere.length / 2) / 1;
    //                 box.position.x = (x - sphere.length / 2) / 1;
    //                 if (z > layers / 2) {
    //                     box.material = greenSurface;
    //                 } else {
    //                     box.material = redSurface;
    //                 }
    //             }
    //         }
    //     }
    // }

    console.log("done");
    return scene;

};
var scene = createScene(10);

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
    var r = document.getElementById("cubeRadius").value;
    var scene = createScene(r);
    engine.runRenderLoop(function () {
        scene.render();
    });
}
engine.runRenderLoop(function () {
    scene.render();
});

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
    return sphere;
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

// engine.runRenderLoop(function () {
//     scene.render();
// });


window.addEventListener('resize', function () {
    engine.resize();
});

function writeObjFile(vertices, indices) {
    console.log(vertices);
    console.log(indices);
    let objString = "";
    for (let i = 0; i < vertices.length; i++) {
        objString += "v " + vertices[i][0] + " " + vertices[i][1] + " " + vertices[i][2] + "\n";
    }
    objString += "\n ";
    for (let j = 0; j < indices.length; j++) {
        objString += "\n" + "f " + (indices[j][0] + 1) + " " + (indices[j][1] + 1) + " " + (indices[j][2] + 1);
    }
    download(objString, 'test.obj', 'text');
}

// var testArray = [
//     [1, 1, 1],
//     [2, 2, 2],
//     [3, 3, 3],
//     [4, 4, 4]
// ];
// var test = [2, 2, 2];

// console.log(testArray.containsArray(test));
// console.log(testArray.containsArrayIndex(test));

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


function getTestPolygon() {
    let polygon =
        [
            [
                [
                    0, 0, 0, 0, 0, 0, 0, 0

                ],
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ]
            ],
            [
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 1, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 1, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ]
            ],
            [
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 1, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 1, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ]
            ],
            [
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 0, 0
                ]
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