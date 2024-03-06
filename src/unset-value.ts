/**
 * https://www.npmjs.com/package/unset-value
 */
import has from 'has-value';
import isObject from 'isobject';


// declare function unset(obj: Record<PropertyKey, unknown>, prop: string | string[]): boolean;

const isUnsafeKey = (key: string) => {
  return key === '__proto__' || key === 'constructor' || key === 'prototype';
};

const validateKey = (key: string) => {
  if (isUnsafeKey(key)) {
    throw new Error(`Cannot set unsafe key: "${key}"`);
  }
};

export function unsetValue(obj: Record<PropertyKey, unknown>, prop: string | string[]) {
  if (!isObject(obj)) {
    throw new TypeError('expected an object.');
  }

  if (!Array.isArray(prop) && obj.hasOwnProperty(prop)) {
    delete obj[prop];
    return true;
  }

  if (has(obj, prop)) {
    var segs = Array.isArray(prop) ? prop.slice() : prop.split('.');
    var last = segs.pop();
    while (segs.length && segs[segs.length - 1].slice(-1) === '\\') {
      last = segs.pop().slice(0, -1) + '.' + last;
    }
    while (segs.length) {
      prop = segs.shift();
      validateKey(prop);
      obj = obj[prop] as any;
    }
    return (delete obj[last]);
  }
  return true;
};