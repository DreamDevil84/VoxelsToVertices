//  Prototype found online, helps search an array for an array
Array.prototype.containsArray = function (val) {
    var hash = {};
    for (var i = 0; i < this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
}
Array.prototype.indexOfArray = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][0] === val[0] && this[i][1] === val[1] && this[i][2] === val[2]) {
            return i;
        }
    }
    return -1;
}
Array.prototype.fixLength = function () {
    for (var i = 0; i < this.length; i++) {
        if (typeof this[i] === "undefined") {
            this.length = i;
            break;
        }
    }
}


//Extensions to Math
Math.cross = function (a, b) {
    let result = [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
    return result;
}
Math.cross4d = function (A, B, C, D) {
    let a0 = A[0];
    let a1 = A[1];
    let a2 = A[2];
    let a3 = A[3];

    let b0 = B[0];
    let b1 = B[1];
    let b2 = B[2];
    let b3 = B[3];

    let c0 = C[0];
    let c1 = C[1];
    let c2 = C[2];
    let c3 = C[3];

    let right = [1, 0, 0, 0];
    let up = [0, 1, 0, 0];
    let back = [0, 0, 1, 0];
    let charm = [0, 0, 0, 1];

    let d = D;

    // let result = [
    //     a1 * b2 - a2 * b1,
    //     a2 * b0 - a0 * b2,
    //     a0 * b1 - a1 * b0
    // ];

    // let result = [
    //     ((a1 * b2) - (b1 * a2)) * right,
    //     ((a0 * b2) - (b0 * a2)) * (-1 * up),
    //     ((a0 * b1) - (b0 * a1)) * back
    // ];

    // let result = [
    //     ((a1 * b2) - (b1 * a2)) * c0,
    //     ((a0 * b2) - (b0 * a2)) * (-1 * c1),
    //     ((a0 * b1) - (b0 * a1)) * c2
    // ];


    let ab0 = ((a0 * b1) - (b0 * a1));
    let ab1 = ((a0 * b2) - (b0 * a2));
    let ab2 = ((a1 * b2) - (b1 * a2));

    // let result = [
    //     (ab1 * c2) - (c1 * ab2),
    //     (ab2 * c0) - (c2 * ab0),
    //     (ab0 * c1) - (c0 * ab1)
    // ]
    let result = [
        ab0, ab1, ab2
    ];



    return result;
}
Math.tangent = function (a, b) {
    return Math.sqrt((a * a) + (b * b));
}
Math.tangent3d = function (a, b, c) {
    let t = Math.tangent(a, b);
    return Math.sqrt((t * t) + (c * c));
}
Math.unitVector = function (x, y, z) {
    let xV = x / (Math.sqrt((x * x) + (y * y) + (z * z)));
    let yV = y / (Math.sqrt((x * x) + (y * y) + (z * z)));
    let zV = z / (Math.sqrt((x * x) + (y * y) + (z * z)));
    return [xV, yV, zV];
}
Math.precisionRound = function (number, decimal) {
    let factor = Math.pow(10, decimal);
    number = Math.round(number * factor) / factor;
    return number;
}