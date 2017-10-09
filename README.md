# getem

[![Build Status](https://travis-ci.org/lvegerano/getem.svg?branch=master)](https://travis-ci.org/lvegerano/getem)

A module allows you get all the files withing a directory. Inpired by [node-require-all](https://github.com/felixge/node-require-all) .
## Installation
`npm install getem`
## Usage
```javascript
const directory = `${__dirname}/some/path`; // or an options object
const modules = require('getem')(directory);
```
## Options
Options can be a `string` of the path. Or a configuration object.
 
| key             | default                  | description                                                                                   |
| --------------- |:------------------------:| ---------------------------------------------------------------------------------------------:|
| dirname         | `null`                   | The directory where file are going to be required from                                        | 
| recursive       | `true`                   | Whether or not to recurse when encoutering a directory                                        |
| require_indexes | `true`                   | When `true` if a directory is encountered it will try to require it                           | 
| excludeDir      | `/^[^\.]/`               | `RegEx` or `Function` - it must return falsy value. By default it will exclude hidden folders |
| filterFile      | `/^([^\.].*)\.js(on)?$/` | `RegEx` or `Function` - it must return falsy value. By default it will exclude hidden files   |
| map             | `(val) => val`           | Allows you to modify the name of the key to be inserted as the module refer                   | 

### Licence
MIT

