//  Prototype found online, helps search an array for an array
Array.prototype.containsArray = function (val) {
    var hash = {};
    for (var i = 0; i < this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
}
Array.prototype.containsArrayIndex = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][0] === val[0] && this[i][1] === val[1] && this[i][2] === val[2]) {
            return i;
        }
    }
    return -1;
}