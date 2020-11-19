const morgan = require('morgan');
const chalk = require('chalk');

module.exports = morgan(function (tokens, req, res) {
  const method = req.body.method ? req.body.method.toUpperCase() : tokens.method(req, res);

  let methodColor = chalk.hex('#34ace0'); 
  if (req.body.method && req.body.method.toLowerCase() === 'get'){
    methodColor = chalk.hex('#f22a6f');
  }

  return [
    methodColor.bold(method + '-status('+ tokens.status(req, res) + ')'),
    chalk.hex('#ff5252').bold(tokens.url(req, res)),
    chalk.hex('#ffffff').bold(' -> '),
    chalk.hex('#ff5252').bold(req.body.module ? req.body.module.toUpperCase() : ''),
    chalk.hex('#ff5000').bold(req.body.command ? req.body.command : ''),
    chalk.hex('#ffffff').bold(' -> '),
    chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms')
  ].join(' ');
});