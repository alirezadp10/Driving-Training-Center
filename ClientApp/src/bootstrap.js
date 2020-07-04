// window.$ = window.jQuery = require('jquery');
// window.alertify = require("alertifyjs");

String.prototype.DigitsToFarsi = function () {
    var id = [
        "۰",
        "۱",
        "۲",
        "۳",
        "۴",
        "۵",
        "۶",
        "۷",
        "۸",
        "۹",
    ];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};

String.prototype.Delimiter = function () {
    return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

String.prototype.FarsiToDigits = function () {
    var id = {"۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9"};
    return this.replace(/[^0-9.]/g, function (w) {
        return id[w] || w;
    });
};
