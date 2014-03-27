var Transform = require('stream').Transform;

module.exports = function (n) {
    var count = 0,
        stream = Transform({
            objectMode: true,
            highWaterMark: 2 // Should be 1 or 0 but https://github.com/joyent/node/issues/7364
        });

    if (n === 0) {
        stream.push(null);
    }

    stream._transform = function (chunk, encoding, callback) {
        if (++count <= n) {
            stream.push(chunk);
            callback();
        }

        if (count === n) {
            stream.push(null);
        }
    };

    return stream;
};
