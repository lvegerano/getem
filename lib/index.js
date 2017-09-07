const _ = require('lodash');
const FS = require('fs');

function excludeDir() {}

function filterFile() {}

module.export = function getEm(opts) {
  const defaults = {
    dirname: '',
    default_file_filter: '/^([^\.].*)\.js(on)?$/',
    default_folder_filter: '/^\./',
    recursive: true,
    require_indexes: true,
    excludeDir(dirname) {
      return dirname;
    },
    filterFile(fileName) {
      return fileName;
    },
    map(val) {
      return val;
    }
  };

  if (typeof opts === 'string') {
    opts = {
      dirname: opts
    };
  }

  const options = _.cloneDeep({}, defaults, opts);

  const modules = {};

  const files = FS.readdirSync((options.dirname));

  files.forEach(file => {

    const filePath = `${options.dirname}/${file}`;
    const fileStats = FS.statsSync(filePath);
    const isDirectory = fileStats.isDirectory();

    if (isDirectory) {
      
      if (options.excludeDir(file)) {
        return;
      }

      if (options.require_indexes) {
        
        try {

          const module = require(filePath);
          modules[map(file, filePath)] = module;
        } catch (error) {

          modules[map(file, filePath)] = getEm({
            dirname: filePath,
            filterFile: options.filterFile,
            excludeDir: options.excludeDir,
            map: options.map,
          });
        }
      }

      modules[map(file, filePath)] = getEm({
        dirname: filePath,
        filterFile: options.filterFile,
        excludeDir: options.excludeDir,
        map: options.map,
      });
      
    } else {

      const name = options.filterFile(file)
      
      if (!name) {
        return;
      }

      modules[map(name, filePath)] = require(filePath);

    }

  });

  return modules;
};