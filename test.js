var Take = require('./index');
var test = require('tape');
var assert = require('assert');

test('passes through elements while less than the desired maximum', function (t) {
    var take = Take(10),
        out = [];

    take.on('data', function (d) {
        out.push(d);
    });

    take.on('end', function () {
        assert.deepEqual(out, [1, 2]);
        t.end();
    });

    take.write(1);
    take.write(2);
    take.end();
});

test('does not write more than the desired maximum', function (t) {
    var take = Take(2),
        out = [];

    take.on('data', function (d) {
        out.push(d);
    });

    take.on('end', function () {
        assert.deepEqual(out, [1, 2]);
        t.end();
    });

    take.write(1);
    take.write(2);
    take.write(3);
    take.write(4);
    take.end();
});

test('produces end immediately after last element', function (t) {
    var take = Take(2),
        out = [];

    take.on('data', function (d) {
        out.push(d);
    });

    take.on('end', function () {
        assert.deepEqual(out, [1, 2]);
        t.end();
    });

    take.write(1);
    take.write(2);
});

test('produces end immediately if n = 0', function (t) {
    var take = Take(0);
    take.on('end', t.end);
    take.resume();
});

test('produces backpressure', function (t) {
    var take = Take(1);
    assert.equal(take.write(1), true);
    take.write(1); // Should return false but we have to workaround https://github.com/joyent/node/issues/7364
    assert.equal(take.write(1), false);
    t.end();
});
