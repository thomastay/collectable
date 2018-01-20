import test from 'ava';
import { isMutable, modify } from '@collectable/core';
import { HashSetStructure, fromArray, has, size, subtract } from '../../src';

const mainValues = ['A', 'B', 'C', 'D', 'E'];
const otherValues = ['D', 'E', 'F', 'G'];
const expectedValues = ['A', 'B', 'C'];

let main: HashSetStructure<string>, result: HashSetStructure<string>;
const other = otherValues.slice();

test.before(() => {
  main = modify(fromArray(mainValues));
  result = subtract(other, main);
});

test('the input set is returned', t => {
  t.is(result, main);
});

test('the input set is still mutable', t => {
  t.true(isMutable(result));
});

test('the input array is not modified', t => {
  t.deepEqual(other, otherValues);
});

test('the input set no longer includes any items that are members of the input array', t => {
  t.true(has('A', result));
  t.true(has('B', result));
  t.true(has('C', result));
});

test('the input set retains items that are not members of the input array', t => {
  t.false(has('D', result));
  t.false(has('E', result));
});

test('the size of the input set is decreased by the number of items that were common to both inputs', t => {
  t.is(size(result), expectedValues.length);
});
