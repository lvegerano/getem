const Lab = require('lab');
const lab = exports.lab = Lab.script();

const getem = require('..');

const {
  experiment,
  expect,
  test,
} = lab;

experiment('getem', () => {

  test('should not pick up hidden files,folders, or files without the extension .json/.js with default settings', (done) => {
    const modules = getem(`${__dirname}/routes`);

    expect(modules['hidden.js']).to.be.undefined();
    expect(modules['.hideme']).to.undefined();
    done();
  });

  test('should filter directories via excludeDir function', (done) => {
    const modules = getem({
      dirname: `${__dirname}/routes`,
      excludeDir(dir) {
        return dir !== 'sub';
      },
    });

    expect(modules.sub).to.be.undefined();
    expect(modules.coolLib).to.be.a.function();
    expect(modules['main.js']).to.equal({ theMain: 'yessir' });
    expect(modules['not-it.js']).to.equal({ notIt: true });
    done();
  });

  test('should filter files via filterFile function', (done) => {
    const modules = getem({
      dirname: `${__dirname}/routes`,
      filterFile(file) {
        return file !== 'not-it.js';
      },
    });

    expect(modules.sub).to.be.exist();
    expect(modules.coolLib).to.be.a.function();
    expect(modules['main.js']).to.equal({ theMain: 'yessir' });
    expect(modules['not-it.js']).to.be.undefined();
    done();
  });


});
