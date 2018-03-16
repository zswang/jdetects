jdetects(^^)
======

[![Build Status](https://img.shields.io/travis/zswang/jdetects/master.svg)](https://travis-ci.org/zswang/jdetects)
[![NPM version](https://img.shields.io/npm/v/jdetects.svg)](http://badge.fury.io/js/jdetects)

## 概述

Detect if DevTools is open

@see [Find out whether Chrome console is open
](https://stackoverflow.com/a/30638226/1068602)

@see https://github.com/sindresorhus/devtools-detect

## examples

```js
jdetects.create(function(status) {
  document.querySelector('#devtool-status').innerHTML = status;
});
```

## Once Change of Examples

```js
jdetects.create({
	once: true,
	label: 'zswang',
	onchange: function (status) {
		document.querySelector('#devtool-status').innerHTML = status;
	}
});
```