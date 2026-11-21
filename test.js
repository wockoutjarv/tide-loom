const assert = require('node:assert/strict');
const {start,pull,target} = require('./loom');
const distances = new Map([[String(start()),0]]);
const queue = [start()];
for(const board of queue) for(let i=0;i<3;i++){
  const next=pull(board,i), key=String(next);
  if(!distances.has(key)){ distances.set(key,distances.get(String(board))+1); queue.push(next); }
}
const targets=Array.from({length:26},(_,i)=>String(target(i)));
assert.equal(new Set(targets).size,26);
assert.equal(distances.size,27);
for(const key of targets) assert.ok(distances.get(key)>0);
for(let i=0;i<3;i++){const before=start();assert.deepEqual(pull(pull(pull(before,i),i),i),before);assert.deepEqual(before,start())}
console.log('26 distinct nonzero goals reachable. All three cycles restore the board.');
