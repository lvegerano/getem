const FS = require('fs');

function excludeDir(optionsExcludeDirs, dirname) {

  if (typeof optionsExcludeDirs === 'function') {
    return optionsExcludeDirs(dirname)
  }

  return !!dirname.match(optionsExcludeDirs);
}

function filterFile(optionsFilter, file) {

  if (typeof optionsFilter === 'function') {
    return optionsFilter(file)
  }

  const match = file.match(optionsFilter);

  if (!match) {
    return;
  }

  return match[1] || match[0];
}

module.exports = function getEm(opts) {

  const defaults = {
    dirname: '',
    recursive: true,
    require_indexes: true,
    excludeDir: /^./,
    filterFile: /^([^.].*).js(on)?$/,
    map(val) {
      return val;
    }
  };

  if (typeof opts === 'string') {

    opts = {
      dirname: opts
    };
  }

  const options = Object.assign({}, defaults, opts);

  const modules = {};

  const files = FS.readdirSync((options.dirname));

  files.forEach(file => {

    const filePath = `${options.dirname}/${file}`;
    const fileStats = FS.statSync(filePath);
    const isDirectory = fileStats.isDirectory();

    if (isDirectory) {

      if (!excludeDir(options.excludeDir, file)) {
        return;
      }

      if (options.require_indexes) {

        try {
          if (!filterFile(options.filterFile, file)) {
            return;
          }

          modules[options.map(file, filePath)] = require(filePath);
          return;
        } catch (error) {

          if (error.code !== 'MODULE_NOT_FOUND') {
            throw error;
          }
        }
      }

      if (options.recursive) {

        modules[options.map(file, filePath)] = getEm({
          dirname: filePath,
          filterFile: options.filterFile,
          excludeDir: options.excludeDir,
          map: options.map,
        });
      }
      
    } else {

      const name = filterFile(options.filterFile, file);
      
      if (!name) {
        return;
      }

      modules[options.map(name, filePath)] = require(filePath);
    }
  });

  return modules;
};
