# jdetects(^^)

[![Build Status](https://img.shields.io/travis/zswang/jdetects/master.svg)](https://travis-ci.org/zswang/jdetects)
[![NPM version](https://img.shields.io/npm/v/jdetects.svg)](http://badge.fury.io/js/jdetects)

Detect if DevTools is open

[Find out whether Chrome console is open](https://stackoverflow.com/a/30638226/1068602)

## Examples

### Base

http://jsbin.com/cecuzeb/5/edit?output

```js
jdetects.create(function(status) {
	document.querySelector("#devtool-status").innerHTML = status;
});
```

### Once onChange

https://jsbin.com/hemipip/edit?js,output

```js
jdetects.create({
	once: true,
	label: "zswang",
	onchange: function(status) {
		document.querySelector("#devtool-status").innerHTML = status;
	}
});
```
