import Benchmark from 'benchmark';

import YCB from 'ycb';
import dimensions from './fixtures/dimensions.json';
import configs from './fixtures/sample.json';
import configsMultiple from './fixtures/sample-multiple.json';

const suite = new Benchmark.Suite;
const ycbObj = new YCB.Ycb(dimensions.concat(configs));
const ycbMultiple = new YCB.Ycb(dimensions.concat(configsMultiple));

suite.add('YCB', () => {
  ycbObj.read({});
})
suite.add('YCB Multiple', () => {
  ycbMultiple.read({ lang: 'fr' });
})
suite.add('Object assign', () => {
  Object.assign({}, dimensions[0], configs[0])
})
suite.add('Object assign multiple', () => {
  Object.assign({}, dimensions[0], configs[0], configsMultiple[0], configsMultiple[1], configsMultiple[2]);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`);
})
// run async
.run({ 'async': true });;
