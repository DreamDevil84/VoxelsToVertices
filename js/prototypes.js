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
    let reduceCount = 0;
    for (var i = 0; i < this.length; i++) {
        if (typeof this[i] === "undefined") {
            reduceCount++;
        }
    }
    this.length -= reduceCount;
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