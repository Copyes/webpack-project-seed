var ejs = require('ejs'),
  utils = require('loader-utils'),
  path = require('path'),
  merge = require('merge');


module.exports = function (source) {
  this.cacheable && this.cacheable();
  var opts = merge(this.options['ejs-full-loader'] || {}, utils.parseQuery(this.query));
  opts.client = false;

  // Use filenames relative to working dir, which should be project root
  opts.filename = path.relative(process.cwd(), this.resourcePath);
  opts.root = process.cwd();
  var template = ejs.compile(source, opts);

  var content = template({});

  return 'module.exports = ' + JSON.stringify(content) + ';';
};
