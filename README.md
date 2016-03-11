# Hafiz

[![Code Climate][2]][3]
[![Test Coverage][4]][5]
[![Circle CI][6]][7]

Hafiz is a configuration aggregator that allows much easier management of config
data for large scale Node.js applications.

Hafiz loads config data from the following sources:

 - Config files with environment variable interpolation
 - Command line arguments


## Getting Started

```sh
$ npm install --save hafiz
```

Then, put `.json` config files into `./config` directory in the project root.

Finally, in any of your application source files:
```js
const hafiz = require('hafiz');

console.log(hafiz('config.key'));
```

## Documentation

### `CONFIG_PATH`
Hafiz loads configuration files in directories specified by `CONFIG_PATH` environment
variable, which is a list of file system paths similar to the OS `PATH` variable.

An example `CONFIG_PATH` value on UNIX would be:
```
/user/test/common-config:/user/test/.myprojrc
```

If a path is a directory, hafiz will recursively load all config files in that
directory. If path is a file, hafiz will only load that file.

If a path is relative, it is resolved relative to the project root. Hafiz uses
[app-root-path][1] module to obtain the project root path.

In case of conflicts, config options loaded from paths appearing later in the
config paths would overwrite all previously existing values. Hard-coded config
paths (`./config` and `./config/$${NODE_ENV}` by default) overwrite everything
else.

### Command Line
Any config option can be overwritten using command line arguments. For example,
and option with path `db.collection.name` can be overwritten in the following way:
```sh
$ ./my-app.js --db.collection.name="some-value"
```
```js
const hafiz = require('hafiz');

console.log(hafiz('db.collection.name')); // 'some-value'
```

### Environment Variables

#### Substitution
All strings in Hafiz are automatically checked for envar substitutions. For example:

```js
const hafiz = require('hafiz');
hafiz.set('env', '$NODE_ENV');

console.log(hafiz('env')); // 'development' (or something else)
```

#### Optional Envars
If Hafiz encounters a envar substitution, and the requested envar does not exist,
an error is thrown. You can mark an envar optional in the following way:

```js
const hafiz = require('hafiz');
hafiz.set('testing', '$?NO_SUCH_VAR');

console.log(hafiz('test')); // ''
```

#### Escaping
When you need to include the `$` symbol in a string, you can escape it by including an
additional `$`. For example, `$$NOT_AN_ENVAR` evaluates to `$NOT_AN_ENVAR`.


#### Default Values
Currently, support for default values is in the works.


### hafiz(path, def)
Gets the config option with the specified `path`. If the value is not found,
it will return `def` if one is provided; otherwise, it will throw an error.

`path` is determined by the location of the config file relative to one of the
config roots. For example, a file `/user/test/my-proj/config/a/b/data.json`
in the config root of `/user/test/my-proj/config` would have a path of
`a.b.data`. Properties inside `data.json` are also accessible by further adding
to the path.

### hafiz.set(path, value)
Sets the specified config option to the value, overwriting any existing values.

It is worth noting that it works in a way similar to `_.set()` rather than `_.merge()`.
It is therefore important that you use deep paths when neccessary.

### hafiz.init(options)
Clears current config data and reinitializes the hafiz module. You would only need
to manually initialize in the following circumstances:

 - You need to specify additional hard-coded/dynamic config root paths other than
   `./config` and `./config/$${NODE_ENV}`
 - You want to search for config files using a glob pattern other than `**/*.json`
 - You want to use custom property path separators other than `.`, `:` and `/`.
 - You want to immediately reload the config data.

#### options.append
Appends these paths to the config root paths specified by `CONFIG_PATH` environment
variable. Supports both relative and absolute paths. Default value: ```[
  './config',
  `./config/$${process.env.NODE_ENV}`
]```

#### options.separator
Specifies a RegExp for path separators. Default value: `/[\.\:\/\\]/`

#### options.glob
Glob pattern to use when searching for config files. Default value: `**/*.json`

## License

MIT

[1]: https://www.npmjs.com/package/app-root-path
[2]: https://codeclimate.com/github/jluchiji/node-hafiz/badges/gpa.svg
[3]: https://codeclimate.com/github/jluchiji/node-hafiz
[4]: https://codeclimate.com/github/jluchiji/node-hafiz/badges/coverage.svg
[5]: https://codeclimate.com/github/jluchiji/node-hafiz/coverage
[6]: https://circleci.com/gh/jluchiji/node-hafiz.svg?style=shield
[7]: https://circleci.com/gh/jluchiji/node-hafiz
