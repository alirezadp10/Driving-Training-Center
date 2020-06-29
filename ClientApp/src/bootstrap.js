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
