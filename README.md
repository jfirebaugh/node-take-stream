A transform stream that passes through the first n elements and discards the rest

## Example

Outputs `[1, 2, 3, 4, 5]`:

```js
var Take = require('take-stream'),
    five = Take(5),
    out = [];

five.on('data', function(d) {
    out.push(d);
});

five.on('end', function() {
    console.log(out);
});

five.write(1);
five.write(2);
five.write(3);
five.write(4);
five.write(5);
five.write(6);
five.write(7); // Returns false, signalling backpressure
```

## Limitations

* Currently supports only objectMode, no strings or Buffers
* Doesn't produce backpressure immediately due to a [node bug](https://github.com/joyent/node/issues/7364)
