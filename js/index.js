// import * as BABYLON from 'babylonjs';



// Get the canvas DOM element
var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext("2d");
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

var MRIShape = [];
var fatBody = [];
var waterBody = [];

var fatPath = "fatBody.json";   //  Standard path for development
var waterPath = "waterBody.json";   //  Standard path for development
var fatLoaded = false;
var waterLoaded = false;

var fatProgress = document.getElementById("fatProgress");
var waterProgress = document.getElementById("waterProgress");
var btnShowFat = document.getElementById("btnShowFat");
var btnShowWater = document.getElementById("btnShowWater");
var btnShowComparison = document.getElementById("btnShowComparison");
var instructions = document.getElementById("instructions");
// Initialiser

var scene = 0;
function init() {

    //Add functionality for getting proper URLs for fatPath and waterPath here
    // getFat();
    // getWater();
    // getMRI("water", 0.9);
}
init();

// CreateScene function that creates and return the scene
var createScene = function (shapeInput, mIntens, zModifier) {

    let minIntensity = mIntens || 0;
    let zMod = zModifier || 1;
    let shape = shapeInput || 0;
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


    if (!(shape === 0)) {
        let layers = shape.length;
        let startLayer = 0;
        let meshData = buildShape(shape, minIntensity, zMod);


        //#######################################################
        //  Lines
        //#######################################################

        let startpoint = -shape.length / 2;
        //#######################################################
        //  Meshes
        //#######################################################

        var customMesh = new BABYLON.Mesh("custom", scene);
        customMesh.material = greenSurface;

        var positions = [];
        let vertices = meshData[0];
        let indices = formatIndices(meshData[1]);
        var normals = [];
        let midsection = shape.length / 2;
        for (let i = 0; i < vertices.length; i++) {
            positions.push(vertices[i][2] - midsection);
            positions.push(vertices[i][1] - midsection);
            positions.push(vertices[i][0] - midsection);
        }
        normals = meshData[2];
        normals = formatNormals(normals);

        var vertexData = new BABYLON.VertexData();

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;

        vertexData.applyToMesh(customMesh, true);
    }
    return scene;
};
var createSceneDirectly = function (shape) {

    let minIntensity = 0;
    let zMod = 1;

    let zMid = 0;
    let yMid = 0;
    let xMid = 0;

    for (let i = 0; i < shape[0].length; i++) {
        if (shape[0][i][0] > zMid) {
            zMid = shape[0][i][0];
        }
        if (shape[0][i][1] > yMid) {
            yMid = shape[0][i][1];
        }
        if (shape[0][i][2] > xMid) {
            xMid = shape[0][i][2];
        }
    }

    // zMid /= 2;
    // yMid /= 2;
    // xMid /= 2;

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas

    // Arc Camera
    // var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);

    // Free Camera
    // var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-3, 3, -(shape.length * 1.5), scene));
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(xMid, yMid, zMid, scene));
    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(canvas, true);

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    // light2.diffuse = new BABYLON.Color3(0, 1, 0);
    // light2.specular = new BABYLON.Color3(0, 0, 1);

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

    // let layers = shape.length;
    // let startLayer = 0;
    let meshData = shape;

    //#######################################################
    //  Meshes
    //#######################################################

    var customMesh = new BABYLON.Mesh("custom", scene);
    customMesh.material = greenSurface;

    var positions = [];
    let vertices = meshData[0];
    // let indices = formatIndices(meshData[1]);
    let indices = meshData[1];
    var normals = [];
    for (let i = 0; i < vertices.length; i++) {
        positions.push(vertices[i][2]);
        positions.push(vertices[i][1]);
        positions.push(vertices[i][0]);
    }

    normals = meshData[2];

    var vertexData = new BABYLON.VertexData();

    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals;

    vertexData.applyToMesh(customMesh, true);
    showInstructions();
    return scene;

};
var createSceneWithBothBodies = function (shape, shape2) {

    let minIntensity = 0;
    let zMod = 1;

    let zMid = 0;
    let yMid = 0;
    let xMid = 0;

    for (let i = 0; i < shape[0].length; i++) {
        if (shape[0][i][0] > zMid) {
            zMid = shape[0][i][0];
        }
        if (shape[0][i][1] > yMid) {
            yMid = shape[0][i][1];
        }
        if (shape[0][i][2] > xMid) {
            xMid = shape[0][i][2];
        }
    }
    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas

    // Arc Camera
    // var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);

    // Free Camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(xMid, yMid, zMid, scene));
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
    redSurface.specularColor = new BABYLON.Color3(1, 0, 0);
    // redSurface.emissiveColor = new BABYLON.Color3(1, 1, 1);
    // redSurface.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

    let meshData = shape;

    let meshData2 = shape2;

    //#######################################################
    //  Meshes
    //#######################################################

    var body1 = new BABYLON.Mesh("body1", scene);
    var body2 = new BABYLON.Mesh("body2", scene);
    body1.material = greenSurface;
    body2.material = redSurface;

    var positions1 = [];
    var positions2 = [];
    let vertices1 = meshData[0];
    let vertices2 = meshData2[0];
    let indices1 = meshData[1];
    let indices2 = meshData2[1];
    // let midsection = shape.length / 2;
    let midsection = 125;
    for (let i = 0; i < vertices1.length; i++) {
        positions1.push(vertices1[i][2]);
        positions1.push(vertices1[i][1]);
        positions1.push(vertices1[i][0]);
    }
    for (let i = 0; i < vertices2.length; i++) {
        positions2.push(vertices2[i][2]);
        positions2.push(vertices2[i][1]);
        positions2.push(vertices2[i][0]);
    }

    let normals1 = meshData[2];
    let normals2 = meshData2[2];

    var vertexData1 = new BABYLON.VertexData();

    vertexData1.positions = positions1;
    vertexData1.indices = indices1;
    vertexData1.normals = normals1;

    vertexData1.applyToMesh(body1, true);

    var vertexData2 = new BABYLON.VertexData();

    vertexData2.positions = positions2;
    vertexData2.indices = indices2;
    vertexData2.normals = normals2;


    vertexData2.applyToMesh(body2, true);
    showInstructions();
    return scene;

};
scene = createScene(makeShapes(20));
// scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});

//#######################################################
//  Choose shape
//#######################################################
function makeShapes(r) {
    let shape = makeVoxelSphere(r, 0.3);
    return shape;
}
//#######################################################
//  Minor Functions
//#######################################################

function makeSphere() {
    engine.stopRenderLoop();
    let r = document.getElementById("cubeRadius").value;
    var scene = createScene(makeShapes(r));
    engine.runRenderLoop(function () {
        scene.render();
    });
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
function getMRI(type, minIntensity) {
    let request = new XMLHttpRequest();
    let path = type + ".json";
    request.open("GET", path);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            MRIShape = JSON.parse(this.responseText);
            // let btnConvert = document.getElementById("btnConvertMRI");
            // btnConvert.style.visibility = "visible";
            // console.log(MRIShape);
            convertMRI(type, minIntensity);
        }
    }
}
function getFat() {
    let request = new XMLHttpRequest();
    request.open("GET", fatPath);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            let fatJson = JSON.parse(this.responseText);
            let w;
            let md;
            if (typeof (Worker) !== "undefined") {
                // Yes! Web worker support!
                // Some code.....
                if (typeof (w) == "undefined") {
                    w = new Worker("js/JSON_Converter_Worker.js");
                    w.postMessage(fatJson);
                    fatProgress.innerHTML = "Fat: Formatting, this may take a minute or two.";
                }
            } else {
                // Sorry! No Web Worker support..
                console.log("No Worker");
            }
            w.onmessage = function (e) {
                let objVertices = e.data[0];
                let objIndices = formatIndices(e.data[1]);
                let objNormals = formatNormals(e.data[2]);
                w.terminate();
                fatBody = [objVertices, objIndices, objNormals];
                btnShowFat.disabled = false;
                fatLoaded = true;
                showComparisonBtn();
                fatProgress.innerHTML = "Fat: Done";
                console.log("Fat Done");
            }
        }
    }
}
function getWater() {
    let request = new XMLHttpRequest();
    request.open("GET", waterPath);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            let waterJson = JSON.parse(this.responseText);
            let w;
            let md;
            if (typeof (Worker) !== "undefined") {
                // Yes! Web worker support!
                // Some code.....
                if (typeof (w) == "undefined") {
                    w = new Worker("js/JSON_Converter_Worker.js");
                    w.postMessage(waterJson);
                    waterProgress.innerHTML = "Water: Formatting, this may take a minute or two.";
                }
            } else {
                // Sorry! No Web Worker support..
                console.log("No Worker");
            }
            w.onmessage = function (e) {
                let objVertices = e.data[0];
                let objIndices = formatIndices(e.data[1]);
                let objNormals = formatNormals(e.data[2]);
                w.terminate();
                waterBody = [objVertices, objIndices, objNormals];
                btnShowWater.disabled = false;
                waterLoaded = true;
                showComparisonBtn();
                waterProgress.innerHTML = "Water: Done";
                console.log("Water Done");
            }
        }
    }
}
function showComparisonBtn() {
    if (fatLoaded === true && waterLoaded === true) {
        btnShowComparison.style.visibility = "visible";
    }
}
function showFat() {
    scene = createSceneDirectly(fatBody);
    engine.stopRenderLoop();
    engine.runRenderLoop(function () {
        scene.render();
    });
}
function showWater() {
    scene = createSceneDirectly(waterBody);
    engine.stopRenderLoop();
    engine.runRenderLoop(function () {
        scene.render();
    });

}
function showComparison() {
    scene = createSceneWithBothBodies(waterBody, fatBody);
    engine.stopRenderLoop();
    engine.runRenderLoop(function () {
        scene.render();
    });
}
function showInstructions() {
    instructions.style.visibility = "visible";
    fatProgress.style.visibility = "hidden";
    waterProgress.style.visibility = "hidden";
}
function convertMRI(type, minIntensity) {
    let startLayer = 0;
    let layers = MRIShape.length;
    // let startLayer = 100;
    // let layers = 100;
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
    makeFullBody(shape, minIntensity, 2);
    // makeObj(shape, 0.4, 2);
    // let name = type + "Body";
    // makeJSON(name, shape, 0.3, 2);
    // engine.stopRenderLoop();
    // scene = createScene(shape, 0.4, 2);
    // engine.runRenderLoop(function () {
    //     scene.render();
    // });
}
function convertMRIFromJSON(type) {
    let fileName = type + "Body";

    let request = new XMLHttpRequest();
    let path = fileName + ".json";
    request.open("GET", path);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            let bodyData = JSON.parse(this.responseText);
            console.log("JSON recieved");
            let shape = makeFullBodyFromJSON(bodyData);
            console.log("JSON converted");
        }
    }
    function convertJSON(data) {
        let indexesToCheck = new Array(data[0].length);
        for (let i = 0; i < indexesToCheck.length; i++) {
            indexesToCheck[i] = [];
        }
        for (let i = 0; i < data[1].length; i++) {
            for (let j = 0; j < data[1][i].length; j++) {
                indexesToCheck[data[1][i][j]].push(i);
            }
        }
        let normals = setNormalsFromJSON(indexesToCheck, data[0], data[1]);
        function setNormalsFromJSON(normalsToCheck, vertices, indices) {
            let newNormals = [];
            for (let i = 0; i < vertices.length; i++) {
                let vertexNormalsRaw = [];
                for (let j = 0; j < normalsToCheck[i].length; j++) {
                    let v1 = vertices[indices[normalsToCheck[i][j]][0]];
                    let v2 = vertices[indices[normalsToCheck[i][j]][1]];
                    let v3 = vertices[indices[normalsToCheck[i][j]][2]];
                    let n = calculateNormals(v1, v2, v3);
                    vertexNormalsRaw.push(n);
                }

                // Remove duplicate normals
                let vertexNormalsFormated = [];
                for (let x = 0; x < vertexNormalsRaw.length; x++) {
                    if (!vertexNormalsFormated.containsArray(vertexNormalsRaw[x])) {
                        vertexNormalsFormated.push(vertexNormalsRaw[x]);
                    }
                }

                // Add normals together
                let vertexNormalSum = [0, 0, 0];
                for (let x = 0; x < vertexNormalsFormated.length; x++) {
                    vertexNormalSum[0] = vertexNormalSum[0] + vertexNormalsFormated[x][0];
                    vertexNormalSum[1] = vertexNormalSum[1] + vertexNormalsFormated[x][1];
                    vertexNormalSum[2] = vertexNormalSum[2] + vertexNormalsFormated[x][2];
                }

                if (vertexNormalSum[0] === 0 && vertexNormalSum[1] === 0 && vertexNormalSum[2] === 0) {

                    vertexNormalSum[0] = vertexNormalsFormated[0][0];
                    vertexNormalSum[1] = vertexNormalsFormated[0][1];
                    vertexNormalSum[2] = vertexNormalsFormated[0][2];
                }

                // Calculate Normal to Unit Vector
                newNormals.push(Math.unitVector(vertexNormalSum[0], vertexNormalSum[1], vertexNormalSum[2]));
            }
            return newNormals;
        }
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

            //Normal Length Adjustment
            let x = [];
            let n1 = n[0];
            let n2 = n[1];
            let n3 = n[2];
            x.push(n1);
            x.push(n2);
            x.push(n3);
            return x;
        }
        return [data[0], data[1], normals]
    }
}
function convertMRIFromJSONforBoth() {

    let request = new XMLHttpRequest();
    let fatPath = "fatBody.json";
    request.open("GET", fatPath);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            let bodyData1 = JSON.parse(this.responseText);
            let request2 = new XMLHttpRequest();
            let waterPath = "waterBody.json";
            request2.open("GET", waterPath);
            request2.send();
            request2.onreadystatechange = function () {
                if (this.readyState == 4) {
                    let bodyData2 = JSON.parse(this.responseText);
                    bodyData1 = convertJSON(bodyData1);
                    bodyData2 = convertJSON(bodyData2);
                    console.log(bodyData1);
                    console.log(bodyData2);
                    engine.stopRenderLoop();
                    scene = createSceneWithBothBodies(bodyData1, bodyData2);
                    engine.runRenderLoop(function () {
                        scene.render();
                    });
                }


            }
        }
    }
    function convertJSON(data) {
        let indexesToCheck = new Array(data[0].length);
        for (let i = 0; i < indexesToCheck.length; i++) {
            indexesToCheck[i] = [];
        }
        for (let i = 0; i < data[1].length; i++) {
            for (let j = 0; j < data[1][i].length; j++) {
                indexesToCheck[data[1][i][j]].push(i);
            }
        }
        let normals = setNormalsFromJSON(indexesToCheck, data[0], data[1]);
        function setNormalsFromJSON(normalsToCheck, vertices, indices) {
            let newNormals = [];
            for (let i = 0; i < vertices.length; i++) {
                let vertexNormalsRaw = [];
                for (let j = 0; j < normalsToCheck[i].length; j++) {
                    let v1 = vertices[indices[normalsToCheck[i][j]][0]];
                    let v2 = vertices[indices[normalsToCheck[i][j]][1]];
                    let v3 = vertices[indices[normalsToCheck[i][j]][2]];
                    let n = calculateNormals(v1, v2, v3);
                    vertexNormalsRaw.push(n);
                }

                // Remove duplicate normals
                let vertexNormalsFormated = [];
                for (let x = 0; x < vertexNormalsRaw.length; x++) {
                    if (!vertexNormalsFormated.containsArray(vertexNormalsRaw[x])) {
                        vertexNormalsFormated.push(vertexNormalsRaw[x]);
                    }
                }

                // Add normals together
                let vertexNormalSum = [0, 0, 0];
                for (let x = 0; x < vertexNormalsFormated.length; x++) {
                    vertexNormalSum[0] = vertexNormalSum[0] + vertexNormalsFormated[x][0];
                    vertexNormalSum[1] = vertexNormalSum[1] + vertexNormalsFormated[x][1];
                    vertexNormalSum[2] = vertexNormalSum[2] + vertexNormalsFormated[x][2];
                }

                if (vertexNormalSum[0] === 0 && vertexNormalSum[1] === 0 && vertexNormalSum[2] === 0) {

                    vertexNormalSum[0] = vertexNormalsFormated[0][0];
                    vertexNormalSum[1] = vertexNormalsFormated[0][1];
                    vertexNormalSum[2] = vertexNormalsFormated[0][2];
                }

                // Calculate Normal to Unit Vector
                newNormals.push(Math.unitVector(vertexNormalSum[0], vertexNormalSum[1], vertexNormalSum[2]));
            }
            return newNormals;
        }
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

            //Normal Length Adjustment
            let x = [];
            let n1 = n[0];
            let n2 = n[1];
            let n3 = n[2];
            x.push(n1);
            x.push(n2);
            x.push(n3);
            return x;
        }
        return [data[0], data[1], normals]
    }
}
function makeObj(shape, intensity, zMod) {
    let w;
    let md;
    if (typeof (Worker) !== "undefined") {
        // Yes! Web worker support!
        // Some code.....
        if (typeof (w) == "undefined") {
            w = new Worker("js/buildPolygons_Worker.js");
            w.postMessage([shape, intensity, zMod]);
        }
    } else {
        // Sorry! No Web Worker support..
        console.log("No Worker");
    }
    w.onmessage = function (e) {
        console.log(e.data);
        let objVertices = e.data[0];
        let objIndices = e.data[1];
        let objNormals = e.data[2];
        writeObjFile(objVertices, objIndices, objNormals);
        w.terminate();
    }
}
function makeFullBody(shape, intensity, zMod) {
    let w;
    let md;
    if (typeof (Worker) !== "undefined") {
        // Yes! Web worker support!
        // Some code.....
        if (typeof (w) == "undefined") {
            w = new Worker("js/verticeConverter.js");
            w.postMessage([shape, intensity, zMod]);
        }
    } else {
        // Sorry! No Web Worker support..
        console.log("No Worker");
    }
    w.onmessage = function (e) {
        console.log(e.data);
        let objVertices = e.data[0];
        let objIndices = formatIndices(e.data[1]);
        let objNormals = formatNormals(e.data[2]);
        w.terminate();
        let body = [objVertices, objIndices, objNormals];
        engine.stopRenderLoop();
        scene = createSceneDirectly(body);
        engine.runRenderLoop(function () {
            scene.render();
        });
    }
}
function makeFullBodyFromJSON(shape) {
    let w;
    let md;
    if (typeof (Worker) !== "undefined") {
        // Yes! Web worker support!
        // Some code.....
        if (typeof (w) == "undefined") {
            w = new Worker("js/JSON_Converter_Worker.js");
            w.postMessage(shape);
        }
    } else {
        // Sorry! No Web Worker support..
        console.log("No Worker");
    }
    w.onmessage = function (e) {
        let objVertices = e.data[0];
        let objIndices = e.data[1];
        let objNormals = e.data[2];
        w.terminate();
        let body = [objVertices, objIndices, objNormals];
        console.log("Making Scene");
        engine.stopRenderLoop();
        scene = createSceneDirectly(body);
        rotation = 0;
        engine.runRenderLoop(function () {
            scene.render();
        });
    }
}
function makeComparativeBodyFromJson(shape) {
    let w;
    let md;
    if (typeof (Worker) !== "undefined") {
        // Yes! Web worker support!
        // Some code.....
        if (typeof (w) == "undefined") {
            w = new Worker("js/JSON_Converter_Worker.js");
            w.postMessage(shape);
        }
    } else {
        // Sorry! No Web Worker support..
        console.log("No Worker");
    }
    w.onmessage = function (e) {
        console.log(e);
        w.terminate();
        return e.data;
    }
}
function makeJSON(name, shape, intensity, zMod) {
    let w;
    let md;
    if (typeof (Worker) !== "undefined") {
        // Yes! Web worker support!
        // Some code.....
        if (typeof (w) == "undefined") {
            w = new Worker("js/buildPolygons_Worker.js");
            w.postMessage([shape, intensity, zMod]);
        }
    } else {
        // Sorry! No Web Worker support..
        console.log("No Worker");
    }
    w.onmessage = function (e) {
        console.log(e.data);
        let objVertices = e.data[0];
        let objIndices = e.data[1];
        w.terminate();
        writeJSON(objVertices, objIndices, name);
    }
}
function niclasNormals(r) {
    getVertexNormals(getTestPolygonSmall());
}
// niclasNormals(10);

// if (typeof(Worker) !== "undefined") {
//     // Yes! Web worker support!
//     // Some code.....
//     console.log("Got worker");
// } else {
//     // Sorry! No Web Worker support..
// }
// if (typeof(w) == "undefined") {
//     // w = new Worker("js/demo_workers.js");
// }

// w.onmessage = function(event){
//     document.getElementById("result").innerHTML = event.data;
// };


// let testNr = 1 + 1 / 3;
// console.log(testNr);

// testNr = testNr.toFixed(2);
// console.log(testNr);


function compareFatVSWater() {
    let water = "fat.json";
    let fat = "fat.json";
    let waterArray = [];
    let fatArray = [];
    let request = new XMLHttpRequest();
    request.open("GET", water);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            waterArray = JSON.parse(this.responseText);

            let request2 = new XMLHttpRequest();
            request2.open("GET", fat);
            request2.send();
            request2.onreadystatechange = function () {
                if (this.readyState == 4) {
                    fatArray = JSON.parse(this.responseText);
                    let mismatch = 0;
                    for (let z = 0; z < waterArray.length; z++) {
                        for (let y = 0; y < waterArray[z].length; y++) {
                            for (let x = 0; x < waterArray[z][y].length; x++) {
                                if (!(waterArray[z][y][x] === fatArray[z][y][x])) {
                                    mismatch++;
                                }
                            }
                        }
                    }
                    console.log(mismatch + " mismatches.");
                }
            }
        }
    }
}
// compareFatVSWater();
// 5183718
// 5183718

window.addEventListener('resize', function () {
    engine.resize();
});
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


function funCode() {
    let numbers = [];
    let max = 9999;
    let string = "0";
    for (let i = 1; i < max; i++) {
        // numbers.push(i);
        string += "\n" + i;
    }
    let garbage = document.getElementById("garbage");
    garbage.innerHTML = string;
}

// funCode();