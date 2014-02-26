window.binary_string_convertion = (function () {
    "use strict";

    var me, pub;

    me = {};
    pub = {};

    /**
     *
     * @param arg
     * @return {string}
     */
    pub.getSerialised = function (arg) {
        return JSON.stringify(arg);
    };

    /**
     *
     * @param arg
     * @return {object}
     */
    pub.getDeserialised = function (arg) {
        return JSON.parse(arg);
    };

    /**
     *
     * @param str
     * @return {Array}
     */
    pub.getStrPackToBin = function (str) {
        var chr, byt, i;
        byt = [];
        for (i = 0; i < str.length; i += 1) {
            chr = str.charCodeAt(i);
            // You can combine both these calls into one,
            //    bytes.push(char >>> 8, char & 0xff);
            byt.push(chr >>> 8);
            byt.push(chr & 0xFF);
        }
        return byt;
    };

    /**
     *
     * @param byt
     * @return {string}
     */
    pub.getBinUnpackToStr = function (byt) {
        var i, str, chr;
        str = [];
        // You could make it faster by reading bytes.length once.
        for (i = 0; i < byt.length; i += 2) {
            // If you're using signed bytes, you probably need to mask here.
            chr = byt[i] << 8;
            // (undefined | 0) === 0 so you can save a test here by doing
            //     chr = (bytes[i] << 8) | (bytes[i + 1] & 0xff);
            if (byt[i + 1])
                chr |= byt[i + 1];
            // Instead of using string += you could push char onto an array
            // and take advantage of the fact that String.fromCharCode can
            // take any number of arguments to do
            //     String.fromCharCode.apply(null, chars);
            str.push(String.fromCharCode(chr));
        }
        return str.join('');
    };

}());
