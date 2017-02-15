import Benchmark from 'benchmark';

import YCB from 'ycb';
import dimensions from './fixtures/dimensions.json';
import configs from './fixtures/dimensions.json';

const suite = new Benchmark.Suite;
const ycbObj = new YCB.Ycb([dimensions].concat(configs));

suite.add('YCB', () => {
  ycbObj.read();
})
suite.add('Object assign', () => {
  Object.assign({}, dimensions[0], configs[0])
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`);
})
// run async
.run({ 'async': true });;
