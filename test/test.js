const Lab = require('lab');
const lab = exports.lab = Lab.script();

const getem = require('..');

const {
  experiment,
  expect,
  test,
} = lab;

experiment('getem', () => {

  test('should get all files with default options', (done) => {
    const modules = getem(`${__dirname}/routes`);
    console.log('modules', modules);
    done();
  });
});
