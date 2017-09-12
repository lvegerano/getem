const Lab = require('lab');
const lab = exports.lab = Lab.script();

const getem = require('..');
const requireAll = require('require-all');

const {
  experiment,
  expect,
  test,
} = lab;

experiment('getem', () => {

  test('should get all files with default options', (done) => {
    // const modules = requireAll('./routes');
    const modules = getem(`${__dirname}/routes`);
    console.log('modules', modules);
    done();
  });
});
