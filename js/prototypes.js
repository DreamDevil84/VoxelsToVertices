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

//Extensions to Math for development

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