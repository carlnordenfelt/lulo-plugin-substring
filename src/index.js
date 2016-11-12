'use strict';

var pub = {};

pub.validate = function (event) {
    if (!event.ResourceProperties.String) {
        throw new Error('Missing required property String');
    }
    if (!event.ResourceProperties.Characters) {
        throw new Error('Missing required property Characters');
    }
};

pub.create = function (event, _context, callback) {
    setImmediate(function () {
        var input = event.ResourceProperties.String;
        var chars = event.ResourceProperties.Characters;
        var start = event.ResourceProperties.Start || 0;

        var data = {
            physicalResourceId: input.substr(start, chars)
        };
        callback(null, data);
    });
};

pub.delete = function (_event, _context, callback) {
    return setImmediate(callback);
};

pub.update = function (event, context, callback) {
    return pub.create(event, context, callback);
};

module.exports = pub;
